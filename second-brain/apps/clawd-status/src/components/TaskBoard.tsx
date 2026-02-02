// Task Board Component
// Shows Clawd's self-assigned tasks organized by status

interface Task {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'upcoming';
  date?: string;
}

interface TaskBoardProps {
  tasks: Task[];
}

export function TaskBoard({ tasks }: TaskBoardProps) {
  const activeTasks = tasks.filter(t => t.status === 'active');
  const completedTasks = tasks.filter(t => t.status === 'completed');
  const upcomingTasks = tasks.filter(t => t.status === 'upcoming');

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Active Tasks */}
      <div className="bg-[#1a1a3e] rounded-xl p-4 border border-[#7c3aed]/30">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Active
        </h3>
        <div className="space-y-2">
          {activeTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No active tasks</p>
          ) : (
            activeTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      <div className="bg-[#1a1a3e] rounded-xl p-4 border border-[#7c3aed]/30">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Completed Today
        </h3>
        <div className="space-y-2">
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No completed tasks yet</p>
          ) : (
            completedTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-[#1a1a3e] rounded-xl p-4 border border-[#7c3aed]/30">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          Upcoming
        </h3>
        <div className="space-y-2">
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500 text-sm">No upcoming tasks</p>
          ) : (
            upcomingTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  const statusColors = {
    active: 'border-l-green-500',
    completed: 'border-l-blue-500',
    upcoming: 'border-l-yellow-500',
  };

  return (
    <div className={`bg-[#0f0f23] rounded-lg p-3 border-l-2 ${statusColors[task.status]} hover:bg-[#2a2a4e] transition-colors cursor-pointer`}>
      <p className="text-sm font-medium">{task.title}</p>
      {task.date && (
        <p className="text-xs text-gray-500 mt-1">{task.date}</p>
      )}
    </div>
  );
}

export default TaskBoard;
