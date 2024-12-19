import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
  onTasksChanged: () => void;
}

export function TaskList({ tasks, onTasksChanged }: TaskListProps) {
  const toggleStatus = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;
      onTasksChanged();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      onTasksChanged();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow-sm flex items-start justify-between"
        >
          <div className="flex items-start space-x-4">
            <button
              onClick={() => toggleStatus(task.id, task.status)}
              className="mt-1 text-gray-400 hover:text-indigo-600"
            >
              {task.status === 'completed' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <div>
              <h3
                className={`text-lg font-medium ${
                  task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                }`}
              >
                {task.title}
              </h3>
              <p className="text-gray-500 mt-1">{task.description}</p>
            </div>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      ))}
      {tasks.length === 0 && (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      )}
    </div>
  );
}