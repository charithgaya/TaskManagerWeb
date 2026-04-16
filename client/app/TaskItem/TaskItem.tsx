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
        return "bg-green-500/10 text-green-400";
      case "medium":
        return "bg-yellow-500/10 text-yellow-400";
      case "high":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getBorderColor = (priority: string) => {
    switch (priority) {
      case "low": return "border-green-500";
      case "medium": return "border-yellow-500";
      case "high": return "border-red-500";
      default: return "border-border";
    }
  };

  return (
    <motion.div variants={item}>
      <Card
        className={`h-full flex flex-col border-l-4 pl-2 ${getBorderColor(task.priority)} 
        hover:shadow-md transition hover:-translate-y-1`}
      >

        {/* Content */}
        <CardContent className="space-y-3 flex-1">

          {/* <h3 className="text-lg font-semibold text-card-foreground line-clamp-3"> */}
          <h3 className="text-base sm:text-lg font-semibold text-foreground">
            {task.title}
          </h3>

          {/* <p className="text-sm text-muted-foreground line-clamp-3"> */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {task.description}
          </p>

          {/* Date + Priority */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
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
        <CardFooter className="flex items-center justify-center gap-3 pt-2">

          <button
            type='button'
            className={`p-1 rounded-md hover:bg-muted transition 
              ${task.completed ? "text-yellow-500" : "text-muted-foreground"}`}
          >
            <span className='text-lg'>
              {starIcon}
            </span>
          </button>

          <button
            type='button'

            className="text-primary p-1 rounded-md hover:bg-muted transition"
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
            className="text-destructive p-1 rounded-md hover:bg-muted transition"
          >
            {trashIcon}
          </button>

        </CardFooter>

      </Card>
    </motion.div>
  );
}

export default TaskItem;