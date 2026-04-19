"use client";

import React, { useEffect } from "react";
import { useTasks } from "@/context/taskContext";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Button  from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

function Modal() {
  const context = useTasks();
  if (!context) return null;

  const {
    task,
    handleInput,
    createTask,
    closeTaskModal,
    modalMode,
    activeTask,
    updateTask,
    isTaskModalOpen,
  } = context;

  useEffect(() => {
    if (modalMode === "edit" && activeTask) {
      handleInput("setTask")(activeTask);
    }
  }, [modalMode, activeTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modalMode === "add") {
      createTask(task);
    } else {
      updateTask(task);
    }

    closeTaskModal();
  };

  return (
    <Dialog open={isTaskModalOpen} onOpenChange={closeTaskModal}>
      <DialogContent className="sm:max-w-[500px]">

        <DialogHeader>
          <DialogTitle>
            {modalMode === "add" ? "Add Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={task.title || ""}
              onChange={(e) => handleInput("title")(e)}
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={4}
              value={task.description || ""}
              onChange={(e) => handleInput("description")(e)}
              placeholder="Enter task description"
              required
            />
          </div>

          {/* Priority */}
          <div className="space-y-1 pb-4">
            <Label>Priority</Label>
            <Select
              value={task.priority || "low"}
              onValueChange={(value) =>
                handleInput("priority")({ target: { value } })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              value={task.dueDate || ""}
              onChange={(e) => handleInput("dueDate")(e)}
              required
            />
          </div>

          {/* Completed */}
          <div className="space-y-1 pb-4">
            <Label>Status</Label>
            <Select
              value={task.completed ? "true" : "false"}
              onValueChange={(value) =>
                handleInput("completed")({
                  target: { value },
                })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Task status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">Not Completed</SelectItem>
                <SelectItem value="true">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            variant={modalMode === "add" ? "primary" : "danger"}
          >
            {modalMode === "add" ? "Add Task" : "Update Task"}
          </Button>

        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;