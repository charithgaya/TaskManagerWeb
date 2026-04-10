"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "@/app/Components/Filters/Filters";
import TaskItem from "@/app/TaskItem/TaskItem";
import { Task } from "@/app/utils/types";
import { filteredTasks, overdueTasks } from "@/app/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/app/utils/animations";
import Button from "@/components/ui/Button";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalAdd, priority, setPriority } = useTasks();
  const overdue = overdueTasks(tasks);
  const filtered = filteredTasks(overdue, priority);

  useEffect(() => {{
      setPriority("all");
  }}, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <main className="m-6 h-full transition-colors duration-300">
      <div className="flex sm:flex-col md:flex-row items-center justify-between">
        <h1 className="text-xl sm:text-md sm:text-center font-semibold text-foreground">Overdue Tasks</h1>
        <Filters />
      </div>

      <motion.div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered?.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.div
          variants={item}
        >
          <Button
            variant="outline"
            onClick={openModalAdd}
            className="w-full min-h-[200px] min-w-[200px] border-2 border-dashed border-gray-500 h-full flex items-center justify-center text-foreground"
          >
            + Add New Task
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}



