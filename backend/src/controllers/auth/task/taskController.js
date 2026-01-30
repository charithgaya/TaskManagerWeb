import asyncHandler from "express-async-handler";
import taskModel  from "../../../models/auth/tasks/taskModel.js";

export const createTask = asyncHandler(async (req, res) => {
  try {
    const {title, description, dueDate, priority, status} = req.body;
   
    if(!title || title.trim() === ""){
        res.status(400).json({ message: "Title is required!" });    
    }

    if(!description || description.trim() === ""){
        res.status(400).json({ message: "Description is required!" });    
    }

    const task = new taskModel({
        title,
        description,
        dueDate,
        priority,
        status,
        user: req.user._id,
    });

    await task.save();
    // Logic to create a new task
    res.status(201).json(task);
    
  } catch (error) {
      console.log("Error creating task: ", error);
      res.status(500).json({ message: error.message });
    }
});

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if(!userId){
        res.status(400).json({ message: "User not found!" });    
    }
    const tasks = await taskModel.find({ user: userId });
    res.status(200).json(tasks);

  } catch (error) {
    console.log("Error fetching tasks: ", error);
    res.status(500).json({ message: error.message });
  }
});

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    if(!id){
        res.status(400).json({ message: "Please provide task id!" });    
    }
    const task = await taskModel.findById(id);
    if(!task){
        res.status(404).json({ message: "Task not found!" });    
    }

    if(task.user.equals(userId)){
        res.status(401).json({ message: "Not authorized to access this task!" });
    }
    res.status(200).json(task);
} catch (error) {
        console.log("Error getting task: ", error);
        res.status(500).json({ message: error.message });
    }
});

export const updateTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params; 
        const { title, description, dueDate, priority, status, completed } = req.body;
        const task = await taskModel.findById(id);
        
        if(!id){
            res.status(400).json({ message: "Please provide task id!" });    
        }
        if(!task){
            res.status(404).json({ message: "Task not found!" });    
        }

        // Check if the task belongs to the user
        if(!task.user.equals(userId)){
            res.status(401).json({ message: "Not authorized to update this task!" });
        }

        // Update task fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.completed = completed !== undefined ? completed : task.completed;
        
        await task.save();
        res.status(200).json(task);

    } catch (error) {
        console.log("Error updating task: ", error);
        res.status(500).json({ message: error.message });
    }
});

export const deleteTask = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const task = await taskModel.findById(id);

        if(!id){
            res.status(400).json({ message: "Please provide task id!" });    
        }

        if(!task){
            res.status(404).json({ message: "Task not found!" });    
        }

        // Check if the task belongs to the user
        if(!task.user.equals(userId)){
            res.status(401).json({ message: "Not authorized to delete this task!" });
        }

        await taskModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully!" });

    } catch (error) {
        console.log("Error deleting task: ", error);
        res.status(500).json({ message: error.message });
    }
});