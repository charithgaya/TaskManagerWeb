"use client";

import {
  githubIcon,
  moonIcon,
  plusIcon,
  profileIcon,
  sunIcon,
} from '@/app/utils/icons';

import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import Button from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";

function Header() {
  const { user } = useUserContext();
  const { activeTasks, openModalAdd, openProfileModal, isTaskModalOpen } = useTasks();
  const router = useRouter();

  const { name, _id: userId } = user || {};

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header>
      <div className="w-full flex sm:flex-col md:flex-row items-center justify-between px-6 py-4">
        
        {/* LEFT */}
        <div className="flex flex-col m-2">
          <h1 className="text-2xl font-semibold text-foreground">
            👋 {userId ? `Hello, ${name}!` : 'Welcome to TaskMaster!'}
          </h1>

          <p className="text-sm text-center text-muted-foreground">
            {userId ? (
              <>
                🤗 You have{" "}
                <span className="font-medium text-primary">
                  {activeTasks.length}{" "}
                  {activeTasks.length === 1 ? "task" : "tasks"}
                </span>
                . Keep going 🚀
              </>
            ) : (
              "Please login or register to view your tasks‼️"
            )}
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex xs:mt-3 items-center gap-3">

          {/* Add / Login Button */}
          {/* <button
            type="button"
            className="flex items-center gap-2 cursor-pointer hover:shadow-md"
            onClick={() => {
                console.log("Clicked Add Task");
                console.log("Modal Open: ", isTaskModalOpen);
                openModalAdd();
            }}
          >
            {user._id ? (
              <>
                <span className="pr-1">{plusIcon}</span> Add Task
              </>
            ) : (
              "Login"
            )}
          </button> */}

          {userId ? (
            <Button variant="primary" onClick={openModalAdd} className="flex items-center gap-2">
              <span className="pr-1">{plusIcon}</span> Add Task
            </Button>
          ) : (
            <Button variant="primary" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}

          <Separator orientation="vertical" className="h-6" />

          {/* Icons */}
          <div className="flex items-center gap-2 text-muted-foreground">

            <Link href="https://github.com" target="_blank">
              <span className="text-muted-foreground text-xl hover:text-foreground transition">
                {githubIcon}
              </span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground text-xl hover:text-foreground transition"
              onClick={toggleDarkMode}
            >
              {theme === "dark" ? sunIcon : moonIcon}
            </Button>
            
            <Button variant="ghost" size="icon" className={`text-muted-foreground text-xl hover:text-foreground transition ${user._id ? "" : "hidden"}`} onClick={openProfileModal}>
              {profileIcon}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;