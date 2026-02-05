# Telegram Bot (Clawdbot) — Stable Ops + PM Baseline

## Goal
Keep Clawdbot stable, predictable, and productive while running the PM loop + cron cadence.

## Core Ops Checklist (Daily/Weekly)
### Daily (5–10 min)
- [ ] Confirm gateway status (service running + recent heartbeat)
- [ ] Verify cron jobs ran in last 24h (pm loop, reminders)
- [ ] Check error logs for new failures (auth, rate limits, tool errors)
- [ ] Review PM outputs folder for new deliverables
- [ ] Quick smoke check: send test message (if safe) or verify last inbound received

### Weekly (20–30 min)
- [ ] Prune old logs (archive / compress)
- [ ] Validate token/credentials expiry dates
- [ ] Rotate any secrets that are time-limited
- [ ] Review PM seed for stale items (blocked vs done vs todo)
- [ ] Update MEMORY.md with notable changes

## PM System Baseline
### Inputs
- **Source of truth:** `pm-app/src/seed.json`
- **Outputs folder:** `pm/outputs/`
- **Commit rule:** after each run, update seed + commit + push

### PM Loop Steps (Hourly)
1. Read `seed.json` and filter: `assignee=clawd`, `status=todo`.
2. Pick 1–3 highest-impact items.
3. Execute directly → create output in `pm/outputs/`.
4. Update `seed.json` with:
   - `status: done`
   - `notes`: completion date + output path
5. `git add . && git commit -m "Update outputs" && git push`.

## Failure Modes + Recovery
- **Gateway down:** restart (`clawdbot gateway restart`).
- **Tool errors:** check config + permissions; retry after 5 min.
- **Git push failed:** pull/rebase; retry commit.
- **Cron fails:** verify cron service, then run job manually.

## Minimal Alerts (when to notify Matt)
- Repeated failures (>2 in a row)
- Token/credential expiration within 7 days
- PM loop unable to complete due to missing access

## Notes
Baseline ready for use. Extend with environment-specific paths and alerts as needed.
