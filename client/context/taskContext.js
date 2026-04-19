"use client";
import React, { createContext, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "./userContext";
import toast from "react-hot-toast";

const TasksContext = createContext();

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

export const TasksProvider = ({ children }) => {

    const { user } = useUserContext() || {};
    const userId = user?._id;
    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState({});
    const [priority, setPriority] = React.useState("all");

    const [activeTask, setActiveTask] = React.useState(null);
    const [modalMode, setModalMode] = React.useState(""); // "add" or "edit"

    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);

    //Profile modal handlers
    const openProfileModal = () => {
        setIsProfileModalOpen(true);
    };

    const closeProfileModal = () => {
        setIsProfileModalOpen(false);
    };
    
    const getConfig = () => {
        const token = localStorage.getItem("token");

        return {
            headers: {
                Authorization: token ?`Bearer ${token}` : "",
            }
        }
    }
    
    //Task modal handlers
    const openModalAdd = () => {
        setIsTaskModalOpen(true);
        setModalMode("add");
        setTask({});
    }

    const openModalEdit = (task) => {
        setIsTaskModalOpen(true);
        setModalMode("edit");
        setActiveTask(task);
    }

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        setActiveTask(null);
        setModalMode("");
        setTask({});
    };

    //get tasks
    const getTasks = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            // console.log("No token found, skipping request");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/api/tasks`, getConfig());
            setTasks(response.data);
        } catch (error){
            console.log(error);
        };
        setLoading(false);
    };

    //get task
    const getTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${serverUrl}/api/tasks/${taskId}`, getConfig());
            setTask(response.data);
        } catch (error){
            console.log(error);
        }
    };

    const createTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.post(`${serverUrl}/api/tasks`, task, getConfig());
            setTasks([...tasks, res.data]);
            toast.success("Task created successfully");
            
        } catch (error) {
            console.log("Error creating task", error);
            toast.error("Error creating task");
        }
        setLoading(false);
    };

    const updateTask = async (task) => {
        setLoading(true);
        try {
            const res = await axios.patch(`${serverUrl}/api/tasks/${task._id}`, task, getConfig());
            //setTasks(tasks.map(t => t._id === task._id ? res.data : t));
            const newTasks = tasks.map(t => {
                return t._id === res.data._id ? res.data : t;
            });
            toast.success("Task updated successfully");
            setTasks(newTasks);

        } catch (error) {
            console.log("Error updating task", error);
            toast.error("Error updating task");
        }
    };

    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            await axios.delete(`${serverUrl}/api/tasks/${taskId}`, getConfig());
            setTasks(tasks.filter(t => t._id !== taskId));
            toast.success("Task deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("Error deleting task");
        }
    }

    const handleInput = (name) => e => {
        if(name === "setTask"){
            setTask(e);
        } else {
            setTask({ ...task, [name]: e.target.value });
        }
    }

    //get completed tasks
    const completedTasks = tasks.filter(t => t.completed);

    //get pending tasks
    const activeTasks = tasks.filter(t => !t.completed);

    //clear all tasks
//     const deleteAllTasks = () => {
//        const confirmDelete = window.confirm(
//        "Are you sure you want to delete all tasks?"
//     );

//     if (confirmDelete) {
//       setTasks([]);
//       localStorage.removeItem("tasks");
//        toast.success("All tasks deleted successfully");
//     }
//    };
    useEffect(() => {
        if (user) {
            getTasks();
        }
    }, [user]);

    return (
        <TasksContext.Provider value={{ 
            tasks, 
            loading,
            task,
            getTasks,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority,
            handleInput,
            isTaskModalOpen,
            setIsTaskModalOpen,
            openModalAdd,
            openModalEdit,
            activeTask,
            closeProfileModal,
            modalMode,
            openProfileModal,
            isProfileModalOpen,
            completedTasks,
            activeTasks,
            closeTaskModal,
            // deleteAllTasks
        }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {
    return React.useContext(TasksContext);
};

