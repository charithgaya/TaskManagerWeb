"use client";
import React, { useEffect, useState } from 'react';
import { useTasks } from '@/context/taskContext';
import { useUserContext } from '@/context/userContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast/headless';
import { eyeIcon, eyeSlashIcon } from '@/app/utils/icons';

//export const dynamic = "force-dynamic";

function ProfileUserModal() {
  
  const { isProfileModalOpen, closeProfileModal } = useTasks();
  const { user, updateUser, userState, handlerUserInput, changePassword } = useUserContext();
  const { name, email } = user || {};
  
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  
    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);
    
    if (!mounted) {
      return null;  //prevent hydration mismatch by rendering nothing on the server
    }

    //console.log("EMAIL:", email);
    //console.log("Submitting : ", oldPassword, newPassword);

  return (
    <Dialog open={isProfileModalOpen} onOpenChange={closeProfileModal}>
      <DialogContent className="sm:max-w-[500px]">

        {/* Header */}
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information and change your password.
          </DialogDescription>
        </DialogHeader>

        {/* Profile Image */}
        <div className="flex items-center gap-4 mt-4">
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
          onSubmit={async (e) => {
            e.preventDefault();

            //Validation
            if (oldPassword || newPassword) {
              if (!oldPassword || !newPassword) {
                return toast.error("Both password fields are required");
            }

              if (newPassword.length < 6) {
                return toast.error("New password must be at least 6 characters long");
              }

              await changePassword(oldPassword, newPassword);

              setOldPassword('');
              setNewPassword('');
            }

            //Profile update
            await updateUser(e, {
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
              value={userState.name || name || ""}
              onChange={(e) => handlerUserInput(e, "name")}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">
              Email
            </label>
            <Input
              value={userState.email || email || ""}
              onChange={(e) => handlerUserInput(e, "email")}
            />
          </div>

          {/* Password Section */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1 relative">
              <label className="text-sm text-muted-foreground">
                Old Password
              </label>

              <Input
                className='pr-10'
                type={showOldPassword ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowOldPassword(prev => !prev)}
                className='absolute right-3 top-9 text-sm text-gray-500'
              >
                {showOldPassword ? eyeSlashIcon : eyeIcon}
              </button>
            </div>

            <div className="space-y-1 relative">
              <label className="text-sm text-muted-foreground">
                New Password
              </label>

              <Input
                className='pr-10'
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(prev => !prev)}
                className='absolute right-3 top-9 text-sm text-gray-500'
              >
                {showNewPassword ? eyeSlashIcon : eyeIcon}
              </button>
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

            <Button 
              type="submit"
              disabled={!userState.name && !userState.email && (!oldPassword || !newPassword)}
            >
              Save Changes
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  )
}

export default ProfileUserModal;
