"use client";

import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';

import { Card, CardContent } from "@/components/ui/card";

function Profile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal } = useTasks();

  const openTasks =
    tasks.length - activeTasks.length - completedTasks.length;

  return (
    <div className="space-y-6">

      {/* Profile Card */}
      <Card
        onClick={openProfileModal}
        className="cursor-pointer hover:shadow-md"
      >
        <CardContent className="flex items-center gap-4 p-2">

          <img
            src="/ProfilePic.jpg"
            alt="avatar"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />

          <div>
            <p className="text-sm text-muted-foreground">Hello,</p>
            <h3 className="text-lg font-semibold text-card-foreground">
              {user?.name}
            </h3>
          </div>

        </CardContent>
      </Card>

      {/* Stats */}
      <Card className='hover:shadow-md'>
        <CardContent className="grid grid-cols-2 gap-4">

          {/* Total */}
          <div className='flex flex-col items-center justify-center'>
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-semibold text-foreground">
              {tasks.length}
            </p>
          </div>

          {/* Open */}
          <div className='flex flex-col items-center justify-center'>
            <p className="text-sm text-muted-foreground">Open Tasks</p>
            <p className="text-2xl font-semibold text-foreground">
              {openTasks}
            </p>
          </div>

          {/* In Progress */}
          <div className='flex flex-col items-center justify-center'>
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-semibold text-foreground">
              {activeTasks.length}
            </p>
          </div>

          {/* Completed */}
          <div className='flex flex-col items-center justify-center'>
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-semibold text-foreground">
              {completedTasks.length}
            </p>
          </div>

        </CardContent>
      </Card>

    </div>
  );
}

export default Profile;