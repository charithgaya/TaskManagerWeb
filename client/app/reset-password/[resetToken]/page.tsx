"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { eyeIcon, eyeSlashIcon } from "@/app/utils/icons";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.resetToken as string;

  // console.log("TOKEN:", token);
  // console.log("PARAMS: ", params);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link!");
    }
  }, [token]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    if (!password || password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(
        `${serverUrl}/api/users/reset-password/${token}`,
        { password }
      );

      setSuccess(true);

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message || "Something went wrong"
        
      );
    } finally {
      setLoading(false);
    }
  };

  if(success) {
    return (
      <Card className="items-center justify-center min-h-screen">
        <h2 className="text-center">Password reset successful 🎉</h2>
          <Button 
            className="w-full py-2.5 font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition disabled:opacity-50"
            onClick={() => router.push("/login")}
          >
           Go to Login
          </Button>
      </Card>
    );
  }

  return (

  <form 
    className="relative w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-md" 
    onSubmit={handleSubmit}
  >
    <div className="relative z-10 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
          Set new Password
        </h1>
      </div>
      {/* New Password */}
      <div className="relative flex flex-col gap-1">
        <Label className="text-sm text-muted-foreground">
          New Password
        </Label>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*********"
          className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-9 text-sm text-gray-500"
        >
          {showPassword ? eyeSlashIcon : eyeIcon}
        </button>
      </div>
      {/* Confirm New Password */}
      <div className="relative flex flex-col gap-1">
        <Label className="text-sm text-muted-foreground">
          Confirm New Password
        </Label>
        <Input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="*********"
          className="px-4 py-2 rounded-md border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-9 text-sm text-gray-500"
        >
          {showPassword ? eyeSlashIcon : eyeIcon}
        </button>
      </div>
      {/* Submit */}
      <Button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2.5 font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition disabled:opacity-50"
        disabled={loading}
      >
        Reset
      </Button>
    </div>
  </form>
      
  );
}

export default ResetPasswordPage;
