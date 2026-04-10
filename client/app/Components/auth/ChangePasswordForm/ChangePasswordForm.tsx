"use client";
import Button from "@/components/ui/Button";
import { Input }  from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserContext } from "@/context/userContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

function ChangePasswordForm() {
  const { changePassword } = useUserContext();

  // state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentPasswordChange = (e: any) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordChange = (e: any) => {
    setNewPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    changePassword(currentPassword, newPassword);

    // clear input
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Your Password!</DialogTitle>
        </DialogHeader>

        <form className="relative w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-card border shadow-sm" onSubmit={handleSubmit}>
          
          {/* Current Password */}
          <div className="relative flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">
              Current Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={currentPasswordChange}
              placeholder="*********"
              className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
            />

            <Button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[36px] text-muted-foreground hover:text-foreground"
            >
              {showPassword ? "🙈" : "👁️"}
            </Button>
          </div>

          {/* New Password */}
          <div className="relative flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">
              New Password
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={newPasswordChange}
              placeholder="*********"
              className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
            />

            <Button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[36px] text-muted-foreground hover:text-foreground"
            >
              {showPassword ? "🙈" : "👁️"}
            </Button>
          </div>

          {/* Submit */}
          <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Reset Password
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordForm;


//     <form className="relative w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-card border shadow-sm">
//   <div className="space-y-6">

//     {/* Header */}
//     <h1 className="text-center text-xl font-semibold text-foreground">
//       Reset Your Password!
//     </h1>

//     {/* Current Password */}
//     <div className="relative flex flex-col gap-1">
//       <Label className="text-sm text-muted-foreground">
//         Current Password
//       </Label>
//       <Input
//         type={showPassword ? "text" : "password"}
//         value={currentPassword}
//         onChange={currentPasswordChange}
//         placeholder="*********"
//         className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
//       />
//       <Button
//         type="button"
//         onClick={togglePassword}
//         className="absolute right-3 top-[36px] text-muted-foreground hover:text-foreground"
//       >
//         {showPassword ? "🙈" : "👁️"}
//       </Button>
//     </div>

//     {/* New Password */}
//     <div className="relative flex flex-col gap-1">
//       <Label className="text-sm text-muted-foreground">
//         New Password
//       </Label>
//       <Input
//         type={showPassword ? "text" : "password"}
//         value={newPassword}
//         onChange={newPasswordChange}
//         placeholder="*********"
//         className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
//       />
//       <Button
//         type="button"
//         onClick={togglePassword}
//         className="absolute right-3 top-[36px] text-muted-foreground hover:text-foreground"
//       >
//         {showPassword ? "🙈" : "👁️"}
//       </Button>
//     </div>

//     {/* Submit */}
//     <Button
//       type="submit"
//       onClick={handleSubmit}
//       className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
//     >
//       Reset Password
//     </Button>

//   </div>
// </form>

