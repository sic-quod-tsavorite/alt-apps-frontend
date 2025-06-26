import type { User } from "@/types/interfaces";
import { state } from "../globalStates/state";

export const useUsers = () => {
  const config = useRuntimeConfig();
  const API_URL = config.public.BE_API_URL;
  const token = ref<string | null>(null);
  const error = ref<string | null>(null);
  const user = ref<User | null>(null);
  const name = ref<string>("");
  const email = ref<string>("");
  const password = ref<string>("");

  const fetchToken = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("lsToken") || "",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse.error || "Error");
        throw new Error("No data available");
      }

      const authResponse = await response.json();
      token.value = authResponse.data.token;
      user.value = authResponse.data.user;
      state.isLoggedIn = true;

      localStorage.setItem("lsToken", authResponse.data.token);
      localStorage.setItem("userIDToken", authResponse.data.userId);
      console.log("user is logged in: ", authResponse);
      console.log("token: ", token.value);
    } catch (err) {
      error.value = (err as Error).message || "An error occurred";
      state.isLoggedIn = false;
    }
  };

  //register
  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await fetch(API_URL + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error("No data available");
      }

      const authResponse = await response.json();
      token.value = authResponse.data.token;
      user.value = authResponse.data.user;

      localStorage.setItem("lsToken", authResponse.data.token);
      console.log("user is registered: ", authResponse);
    } catch (err) {
      error.value = (err as Error).message || "An error occurred";
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    state.isLoggedIn = false;
    if (import.meta.client) {
      localStorage.removeItem("lsToken");
      localStorage.removeItem("userIDToken");
    }
    console.log("User is logged out");
    // Redirect to the auth page after logout
    return navigateTo("/auth");
  };

  return {
    token,
    isLoggedIn: state.isLoggedIn,
    error,
    user,
    name,
    email,
    password,
    fetchToken,
    registerUser,
    logout,
  };
};
