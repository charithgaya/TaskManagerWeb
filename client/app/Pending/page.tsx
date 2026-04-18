"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "@/app/Components/Filters/Filters";
import TaskItem from "@/app/TaskItem/TaskItem";
import { Task } from "@/app/utils/types";
import { filteredTasks } from "@/app/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "@/app/utils/animations";
import Button from "@/components/ui/Button";
import { plusIcon } from "../utils/icons";

export default function Home() {
  useRedirect("/login");

  const { tasks, openModalAdd, priority, setPriority } = useTasks();
  const pendingTasks = tasks.filter((task: Task) => !task.completed);
  const filtered = filteredTasks(pendingTasks, priority);

  useEffect(() => {{
      setPriority("all");
  }}, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <main className="m-6 h-full transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-0">
          <h1 className="text-lg md:text-2xl font-semibold text-foreground mb-2">Pending Tasks</h1>
          <div className="w-full md:max-w-[400px] mt-2 md:mt-1">
            <Filters />
          </div>
      </div>

      <motion.div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {filtered?.map((task: Task, i: number) => (
          <TaskItem key={i} task={task} />
        ))}
        <motion.div>
          <Button
            variant="outline"
            onClick={openModalAdd}
            className="w-full h-full min-h-[200px] min-w-[200px] border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/40 hover:scale-105 transition cursor-pointer"
          >
            <span className="text-xl mb-2">{plusIcon}</span>
            <p className="text-sm font-medium">Add New Task</p>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}



