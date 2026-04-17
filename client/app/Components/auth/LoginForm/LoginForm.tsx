"use client";
import Button from "@/components/ui/Button";
import { useUserContext } from "@/context/userContext";
import React from "react";
import { eyeIcon, eyeSlashIcon } from "@/app/utils/icons";

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <form className="relative w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-card shadow-md">
      <div className="relative z-10 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-semibold text-foreground">
              Login to Your Account
          </h1>
          <p className="text-sm text-muted-foreground">
              Login Now. Don't have an account?{" "}
          <a
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register here
          </a>
          </p>
        </div>
        
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => handlerUserInput(e, "email")}
            name="email"
            className="px-4 py-2 border rounded-md text-foreground bg-background outline-none focus:ring-2 focus:ring-primary"
            placeholder="johnDoe@gmail.com"
            required
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-muted-foreground">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => handlerUserInput(e, "password")}
            name="password"
            className="px-4 py-2 border rounded-md text-foreground bg-background outline-none focus:ring-2 focus:ring-primary"
            placeholder="***************"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-sm text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? eyeSlashIcon : eyeIcon}
          </button>
        </div>
        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>
       
          <Button
            type="submit"
            disabled={!email || !password}
            onClick={loginUser}
            className="w-full py-2.5 font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition disabled:opacity-50"
          >
            Login
          </Button>
      </div>
    </form>
  );
}

export default LoginForm;
