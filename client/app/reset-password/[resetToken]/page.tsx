"use client";

import { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.resetToken as string;

  // console.log("TOKEN:", token);
  // console.log("PARAMS: ", params);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link!");
      router.push("/login");
    }
  }, [token]);
  
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

      const res = await axios.post(
        `${serverUrl}/api/users/reset-password/${token}`,
        { password }
      );

      toast.success("Password reset successful 🎉");

      localStorage.setItem("token", res.data.token);
      router.push("/login");

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

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
          <p className="text-sm text-muted-foreground">
            Enter your new password below
          </p>
        </div>

        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />
        
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
      
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Updating..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
