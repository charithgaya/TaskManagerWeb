"use client";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // const openUserProfileModal = () => {
  //   setIsProfileModalOpen(true);
  // };
  // const closeUserProfileModal = () => {
  //   setIsProfileModalOpen(false);
  // };

  const getErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Something went wrong";

  const getConfig = () => {
        const token = localStorage.getItem("token");
        // console.log("Token from localStorage:", token); // Debugging line

        if (!token) {
            // console.log("No token found");
            return {};
        }

        return {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    }

  // register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/users/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(getErrorMessage(error));
    }
  };

  // login the user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/users/login`,
        {
          email: userState.email,
          password: userState.password,
        }, getConfig()
      );

      // SAVE TOKEN HERE
      localStorage.setItem("token", res.data.token);
      toast.success("User logged in successfully");

      // clear the form
      setUserState({
        email: "",
        password: "",
      });

      // refresh the user details
      await getUser(); // fetch before redirecting

      // push user to the dashboard page
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(getErrorMessage(error));
    }
  };

  // get user Looged in Status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/users/login-status`, getConfig());

      // coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      return loggedIn;

    } catch (error) {
      return false;
    }

  };

  // logout user
  const logoutUser = async () => {
    try {
      // const res = await axios.get(`${serverUrl}/api/users/logout`, getConfig());

      // console.log("User logged out successfully", res.data);

      // remove token
      setUser({});
      localStorage.removeItem("token");
      toast.success("User logged out successfully");

      // redirect to login page
      router.replace("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(getErrorMessage(error));
    }
  };

  // get user details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/users/user`, getConfig());

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  // update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.patch(`${serverUrl}/api/users/user`, data, getConfig());

      // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  // email verification
  const emailVerification = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/users/verify-email`,
          {}, getConfig()
      );

      toast.success("Email verification sent successfully");
      setLoading(false);
    } catch (error) {
      console.log("Error sending email verification", error);
      setLoading(false);
      toast.error(getErrorMessage(error));
    }
  };

  // verify user/email
  const verifyUser = async (token) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/users/verify-user/${token}`,
        {},
        getConfig()
      );

      toast.success("User verified successfully");

      // refresh the user details
      getUser();

      setLoading(false);
      // redirect to home page
      router.push("/");
    } catch (error) {
      console.log("Error verifying user", error);
      toast.error(getErrorMessage(error));
      setLoading(false);
    }
  };

  // forgot password email
  const forgotPasswordEmail = async (email) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/users/forgot-password`,
        {
          email,
        }
      );

      toast.success("If the email exists, a reset link has been sent");
      
      if(res.data?.resetLink){
        console.log("Reset Link: ", res.data.resetLink);
      }

      if(res.data?.token){
        console.log("Reset Token: ", res.data.token);
      }
    
      return res.data; // return the reset link and token for testing purposes

    } catch (error) {
      console.log("Error Sending forgot passsword email", error);
      toast.error(getErrorMessage(error));
      
    } finally {
      setLoading(false);
    }

    const data = await forgotPasswordEmail( email);
    console.log("Forgot Password Link: ", data.resetLink);
    router.push(data.resetLink);
  };


  // reset password
  const resetPassword = async (token, password) => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${serverUrl}/api/users/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success("Password reset successfully");
      setLoading(false);
      // redirect to login page
      // router.push("/login");
    } catch (error) {
      console.log("Error resetting password", error);
      toast.error(getErrorMessage(error));
      setLoading(false);
    }
  };

  // change password
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login again!");
      return;
    }
    try {
        await axios.patch(
        `${serverUrl}/api/users/change-password`,
        { currentPassword, newPassword }, getConfig()
      );

      toast.success("Password changed successfully");
      setLoading(false);
      
    } catch (error) {
      console.log("Error changing password", error);
      toast.error(getErrorMessage(error));
      setLoading(false);
      
    }
  };

  // admin routes
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${serverUrl}/api/users/admin/users`,
        {}
      );

      setAllUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error getting all users", error);
      toast.error(getErrorMessage(error));
      setLoading(false);
    }
  };

  // dynamic form handler
  const handlerUserInput = (e, field) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // delete user
  const deleteUser = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${serverUrl}/api/users/admin/users/${id}`,
        {}
      );

      toast.success("User deleted successfully");
      setLoading(false);
      // refresh the users list
      getAllUsers();
    } catch (error) {
      console.log("Error deleting user", error);
      toast.error(getErrorMessage(error));
      setLoading(false);
    }
  };

  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicRoutes = ["/login", "/register", "/forgot-password"];

    const isPublic = publicRoutes.includes(pathname) || pathname.startsWith("/reset-password");

    if (!token && !isPublic) {
      router.replace("/login");
    }

    setCheckingAuth(false);
  }, [pathname]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token) return;

    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();

      if (isLoggedIn) {
        await getUser();
      }
    };

    loginStatusGetUser();
  }, []);

  
  useEffect(() => {
    if (user.role === "admin") {
      getAllUsers();
    }
  }, [user.role]);

  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus,
        user,
        updateUser,
        emailVerification,
        verifyUser,
        forgotPasswordEmail,
        resetPassword,
        changePassword,
        allUsers,
        deleteUser,
        // isProfileModalOpen,
        // openUserProfileModal,
        // closeUserProfileModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
