"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { eyeIcon, eyeSlashIcon } from "@/app/utils/icons";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";

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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card p-6 sm:p-8 rounded-2xl shadow-sm space-y-6"
      >
        {/* Title */}
        <div className="text-center space-y-1">

          <h1 className="text-xl font-semibold text-foreground">
            Set New Password
          </h1>
        </div>

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />
        
         <Button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-[36px] text-muted-foreground hover:text-foreground"
          >
            {showPassword ? eyeSlashIcon : eyeIcon}
          </Button>
        
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
          <Button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-[36px] text-muted-foreground hover:text-foreground"
          >
            {showPassword ? eyeSlashIcon : eyeIcon}
          </Button>
      
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
           Reset Password
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
