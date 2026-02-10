---
title: Printify API Automation - Implementation Guide
date: 2026-01-31
status: in-progress
tags: [printify, automation, api, implementation, code]
---

# Printify API Automation - Implementation Guide

## Quick Start

### Prerequisites
1. Printify Premium account ($29.99/mo)
2. API Access token from Printify dashboard
3. Make.com account (or use direct API)

### Get Your API Token
1. Go to https://printify.com/backend/api/
2. Click "Generate API Token"
3. Save token securely

---

## Option 1: Make.com No-Code Setup

### Step 1: Create Connection
```
Make.com → Connections → Add Connection
- Provider: Printify
- API Token: [your token]
- Name: Printify Production
```

### Step 2: Create Scenario
```
Trigger: Webhook receives design file
  ↓
Action: Printify Upload Image
  - Title: [Design name]
  - Image: [File from webhook]
  ↓
Action: Printify Create Product
  - Blueprint: [Select product type]
  - Print Area: Front
  - Image: [Uploaded image ID]
  ↓
Action: Printify Publish to Shop
  - Product ID: [Created product]
  - Shop: [Your store]
```

### Step 3: Webhook for Etsy Integration
```
Webhook URL → Etsy Integration App
- Auto-sync new Printify products to Etsy
- Set pricing using markup formula
- Handle variants (sizes, colors)
```

---

## Option 2: Direct API (Node.js)

### Setup
```bash
npm install @printify/printify-api axios
```

### Basic Client
```javascript
// printify-client.js
const axios = require('axios');

class PrintifyClient {
  constructor(accessToken) {
    this.client = axios.create({
      baseURL: 'https://api.printify.com/v1',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async uploadImage(title, imageUrl) {
    const response = await this.client.post('/uploads.json', {
      title,
      url: imageUrl
    });
    return response.data;
  }

  async createProduct(blueprintId, variantId, imageId) {
    const response = await this.client.post('/products.json', {
      title: 'My Product',
      blueprint_id: blueprintId,
      variant_id: variantId,
      print_area: imageId
    });
    return response.data;
  }

  async publishToShop(productId, shopId) {
    const response = await this.client.post(`/shops/${shopId}/products.json`, {
      product_id: productId
    });
    return response.data;
  }
}

module.exports = PrintifyClient;
```

### Bulk Publish Script
```javascript
// bulk-publish.js
const PrintifyClient = require('./printify-client');

const client = new PrintifyClient(process.env.PRINTIFY_TOKEN);

// Your product catalog
const PRODUCTS = [
  { name: 'Happy Math Owl', blueprint: 1, variants: [1, 2, 3] },
  { name: 'Counting Feelings', blueprint: 2, variants: [1, 2] },
  // Add more...
];

async function publishDesign(designImageUrl, products) {
  // 1. Upload image
  const image = await client.uploadImage(
    `Design - ${Date.now()}`,
    designImageUrl
  );

  // 2. Create products
  for (const product of products) {
    for (const variantId of product.variants) {
      await client.createProduct(
        product.blueprint,
        variantId,
        image.id
      );
    }
  }

  console.log(`Published to ${products.length} products`);
}

// Usage
publishDesign(
  'https://your-storage.com/design.png',
  PRODUCTS
);
```

---

## Product Blueprint IDs

### Common Products
| Product | Blueprint ID |
|---------|-------------|
| Unisex T-Shirt | 1 |
| Premium T-Shirt | 2 |
| Hoodie | 3 |
| Tank Top | 4 |
| Tote Bag | 5 |
| Canvas Print | 6 |
| Poster | 7 |
| Phone Case (iPhone) | 8 |
| Phone Case (Samsung) | 9 |
| Kids T-Shirt | 10 |
| Kids Hoodie | 11 |

### Apollo Products (Kids)
| Product | Blueprint ID | Notes |
|---------|-------------|-------|
| Kids T-Shirt | 10 | Best seller |
| Kids Hoodie | 11 | Seasonal |
| Canvas Print | 6 | Character art |
| Tote Bag | 5 | Parent market |
| Mug | 12 | Parent market |

---

## Pricing Formula

### Markup Calculator
```javascript
function calculatePrice(baseCost, markup = 2.5) {
  const price = Math.ceil(baseCost * markup);
  // Round to .99
  return Math.floor(price) + 0.99;
}

// Examples
console.log(calculatePrice(8.50));  // $22.99
console.log(calculatePrice(18.00)); // $45.99
console.log(calculatePrice(4.50));  // $12.99
console.log(calculatePrice(5.00));  // $13.99
```

### Price Table (2.5x markup)
| Base Cost | Selling Price |
|-----------|---------------|
| $4.50 | $12.99 |
| $5.00 | $13.99 |
| $6.00 | $15.99 |
| $8.50 | $22.99 |
| $12.00 | $30.99 |
| $18.00 | $45.99 |

---

## Automation Workflow

### Design → Publish Pipeline
```
┌─────────────────────────────────────────────────────────┐
│                    DESIGN PHASE                         │
│  1. Design created in Canva/AI                          │
│  2. Export as PNG (transparent background)              │
│  3. Upload to cloud storage (S3, Cloudinary)            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   UPLOAD PHASE                          │
│  1. Call Printify Upload API                           │
│  2. Get returned image_id                              │
│  3. Store image_id for products                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  PRODUCT PHASE                          │
│  For each product type:                                 │
│  1. Create product with image_id                       │
│  2. Generate all size variants                         │
│  3. Set pricing using markup formula                   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                  PUBLISH PHASE                          │
│  1. Push to Etsy/Shopify                               │
│  2. Add tags and categories                            │
│  3. Set inventory levels                               │
└─────────────────────────────────────────────────────────┘
```

---

## Etsy Integration

### Required Fields
| Field | Value |
|-------|-------|
| Title | Design name + product type |
| Description | Template (see below) |
| Tags | 13 max, use all |
| Price | Calculated markup |
| Images | Mockup + flat |

### Description Template
```
[Design Name]

[Short tagline]

Specifications:
- [Product type]
- [Material details]
- [Size info]

Care Instructions:
[Machine wash cold, etc.]

This design is part of Apollo's Learning Corner - educational products that make learning fun!

#learning #education #kids #printable #homeschool
```

### Tags List (Apollo)
```
learning activities
printable worksheet
math for kids
preschool education
homeschool curriculum
montessori materials
teacher resources
kids art print
educational poster
coloring page
```

---

## Error Handling

```javascript
async function safePublish(design, products) {
  try {
    const result = await publishDesign(design, products);
    return { success: true, data: result };
  } catch (error) {
    if (error.response?.status === 429) {
      // Rate limited - wait and retry
      await sleep(60000);
      return safePublish(design, products);
    }
    return { success: false, error: error.message };
  }
}
```

---

## Cron Job for Nightly Sync

```bash
# Run every night at 11pm
0 23 * * * cd /path/to/project && node bulk-publish.js >> /var/log/printify.log 2>&1
```

---

## Metrics to Track

| Metric | Target |
|--------|--------|
| Upload success rate | >95% |
| Products published/day | 10-20 |
| Price accuracy | 100% |
| Sync errors | <5/day |

---

## Files Created
- `printify-client.js` - API client library
- `bulk-publish.js` - Bulk publishing script
- `pricing-calculator.js` - Price calculation
- `cron-schedule.sh` - Nightly sync script

---

*Implementation in progress. Ready for testing.*
