"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";

function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params?.resetToken as string;

  console.log("TOKEN:", token);
  console.log("PARAMS: ", params);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!token) {
    return toast.error("Invalid reset link!");
  }

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
      console.log(error);
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

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            New Password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">
            Confirm Password
          </label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
          />
        </div>

        {/* Button */}
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


// "use client";


// import { useUserContext } from "@/context/userContext";
// import { useState } from "react";
// import toast from "react-hot-toast";

// interface Props {
//   params: {
//     resetToken: string;
//   };
// }

// function page({ params: { resetToken } }: Props) {
//   const { resetPassword } = useUserContext();

//   const [showPassword, setShowPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handlePasswordChange = (e: any) => {
//     setPassword(e.target.value);
//   };

//   const handleConfirmPasswordChange = (e: any) => {
//     setConfirmPassword(e.target.value);
//   };

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   // handle submit
//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     resetPassword(resetToken, password);
//   };

//   return (
//     <main className="auth-page w-full h-full flex justify-center items-center">
//       <form className="m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full">
//         <div className="relative z-10">
//           <h1 className="mb-2 text-center text-[1.35rem] font-medium">
//             Reset Your Password!
//           </h1>
//           <div className="relative mt-[1rem] flex flex-col">
//             <label htmlFor="email" className="mb-1 text-[#999]">
//               New Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={handlePasswordChange}
//               id="password"
//               name="password"
//               placeholder="*********"
//               className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
//             />
//             <button
//               className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
//               onClick={togglePassword}
//               type="button"
//             >
//               {showPassword ? (
//                 <i className="fas fa-eye-slash"></i>
//               ) : (
//                 <i className="fas fa-eye"></i>
//               )}
//             </button>
//           </div>
//           <div className="relative mt-[1rem] flex flex-col">
//             <label htmlFor="email" className="mb-1 text-[#999]">
//               Confirm Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               value={confirmPassword}
//               onChange={handleConfirmPasswordChange}
//               id="password"
//               name="password"
//               placeholder="*********"
//               className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
//             />
//             <button
//               className="absolute p-1 right-4 top-[43%] text-[22px] text-[#999] opacity-45"
//               onClick={togglePassword}
//               type="button"
//             >
//               {showPassword ? (
//                 <i className="fas fa-eye-slash"></i>
//               ) : (
//                 <i className="fas fa-eye"></i>
//               )}
//             </button>
//           </div>
//           <div className="flex">
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors"
//             >
//               Reset Password
//             </button>
//           </div>
//         </div>
//         <img src="/flurry.png" alt="" />
//       </form>
//     </main>
//   );
// }

// export default page;
