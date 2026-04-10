"use client";
import React from 'react';
import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';

function ProfileUserModal() {

    const { isProfileModalOpen, closeProfileModal } = useTasks();
    const { user, updateUser, userState, handlerUserInput } = useUserContext();
    const { name, email, photo } = user || {};

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');

    const handlePassword = (type: string) => (e: any) => {
        const value = e.target.value;
        type === 'old' ? setOldPassword(value) : setNewPassword(value);
    };



  return (
    <Dialog open={isProfileModalOpen} onOpenChange={closeProfileModal}>
      <DialogContent className="sm:max-w-[500px]">

        {/* Header */}
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>

        {/* Profile Image */}
        <div className="flex items-center gap-4">
          <img
            src="/ProfilePic.jpg"
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h2 className="font-medium text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(e, {
              name: userState.name,
              email: userState.email,
            });
          }}
        >
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">
              Full Name
            </label>
            <Input
              defaultValue={name}
              onChange={(e) => handlerUserInput(e, "name")}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">
              Email
            </label>
            <Input
              defaultValue={email}
              onChange={(e) => handlerUserInput(e, "email")}
            />
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                Old Password
              </label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={closeProfileModal}
            >
              Cancel
            </Button>

            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default ProfileUserModal;
