"use client";
import { useTasks } from "@/context/taskContext";
import useRedirect from "@/hooks/useUserRedirect";
import Filters from "../Components/Filters/Filters";
import TaskItem from "../TaskItem/TaskItem";
import { Task } from "@/app/utils/types";
import { filteredTasks } from "@/app/utils/utilities";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { container, item } from "../utils/animations";
import Button from "@/components/ui/Button";
import { plusIcon } from "../utils/icons";

export default function Home() {
  useRedirect("/login");

  const { openModalAdd, priority, completedTasks, setPriority } = useTasks();
  
  const filtered = filteredTasks(completedTasks, priority);

  useEffect(() => {{
      setPriority("all");
  }}, [])
  return (
    <main className="m-6 h-full transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-0">
        <h1 className="text-lg md:text-2xl font-semibold text-foreground mb-2">Completed Tasks</h1>
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
        <motion.div
          variants={item}
        >
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

//import { useUserContext } from "@/context/userContext";
//import { useState } from "react";
//import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";
    // const {
  //   logoutUser,
  //   user,
  //   handlerUserInput,
  //   userState,
  //   updateUser,
  //   emailVerification,
  //   allUsers,
  //   deleteUser,
  // } = useUserContext();
  // const { name, photo, isVerified, bio } = user;

  // // state
  // const [isOpen, setIsOpen] = useState(false);

  // // function
  // const myToggle = () => {
  //   setIsOpen(!isOpen);
  // };
      /* <header className="flex justify-between">
        <h1 className="text-[2rem] font-bold">
          Welcome <span className="text-red-600">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          {!isVerified && (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={emailVerification}
            >
              Verify Account
            </button>
          )}

          <button
            onClick={logoutUser}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>

        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-[#2ECC71] text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>

        {isOpen && (
          <form className="mt-4 px-8 py-4 max-w-[520px] w-full rounded-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#999]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
                onChange={(e) => handlerUserInput("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-4 py-2  bg-blue-500 text-white rounded-md"
            >
              Update Bio
            </button>
          </form>
        )}
      </section>
      <div className="mt-4 flex gap-8">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {user.role === "admin" && (
            <ul>
              {allUsers.map(
                (user: any, i: number) =>
                  user.role !== "admin" && (
                    <li
                      key={i}
                      className="mb-2 px-2 py-3 border grid grid-cols-4 items-center gap-8 rounded-md"
                    >
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-[40px]  h-[40px] rounded-full"
                      />
                      <p>{user.name}</p>
                      <p>{user.bio}</p>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md"
                        onClick={() => {
                          deleteUser(user._id);
                        }}
                      >
                        Delete User
                      </button>
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div> */
  );
}

