'use client';

import { Task } from '@/app/utils/types';
import { formatTime } from '@/app/utils/utilities';
import { editIcon, starIcon, trashIcon } from '../utils/icons';
import { useTasks } from '@/context/taskContext';
import { motion } from 'framer-motion';
import { item } from '../utils/animations';

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { getTask, openModalEdit, deleteTask } = useTasks();

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-700 dark:bg-green-500 dark:text-black";
      case "medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-400 dark:text-black";
      case "high":
        return "bg-red-100 text-red-700 dark:bg-red-500 dark:text-black";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBorderColor = (priority: string) => {
    switch (priority) {
      case "low": return "border-green-500";
      case "medium": return "border-yellow-400";
      case "high": return "border-red-500";
      default: return "border-border";
    }
  };

  return (
    <motion.div variants={item}>
      <Card
        className={`h-full flex flex-col border-l-4 ${getBorderColor(task.priority)} 
        hover:shadow-md transition hover:-translate-y-1`}
      >

        {/* Content */}
        <CardContent className="space-y-3 flex-1">

          <h4 className="text-lg font-semibold text-card-foreground line-clamp-3">
            {task.title}
          </h4>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {task.description}
          </p>

          {/* Date + Priority */}
          <div className="flex items-center justify-between pt-2 text-sm">
            <span className="text-muted-foreground">
              {formatTime(new Date(task.createdAt).toISOString())}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityVariant(task.priority)}`}
            >
              {task.priority}
            </span>
          </div>

        </CardContent>

        {/* Actions */}
        <CardFooter className="flex justify-end gap-3 mt-auto pt-1">

          <button
            type='button'
            className={`transition hover:scale-110 
              ${task.completed ? "text-yellow-500" : "text-muted-foreground"}`}
          >
            {starIcon}
          </button>

          <button
            type='button'

            className="text-primary hover:scale-110 transition"
            onClick={() => {
              getTask(task._id);
              openModalEdit(task);
            }}
          >
            {editIcon}
          </button>

          <button
            type='button'
            onClick={() => deleteTask(task._id)}
            className="text-destructive hover:scale-110 transition"
          >
            {trashIcon}
          </button>

        </CardFooter>

      </Card>
    </motion.div>
  );
}

export default TaskItem;