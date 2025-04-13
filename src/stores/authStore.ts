"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { authApis } from "../config/apiRoutes/authApi";

interface User {
  _id: string;
  username: string;
  email: string;
  role: {
    _id: string;
    name: string;
  };
  permissions: string[];
  firstname?: string;
  lastname?: string;
}

class AuthStore {
  loading = false;
  user: User | null = null;
  token: string | null = null;
  isAuthenticated = false;
  isAdmin = false;
  isInitialized = false;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
      this.isAuthenticated = !!this.token;
      if (this.token) {
        void this.getCurrentUser(); 
      } else {
        this.isInitialized = true;
      }
    }
  }

  setUser = (user: User) => (this.user = user);
  setLoading = (load: boolean) => (this.loading = load);

  setToken(token: string | null) {
    this.token = token;
    this.isAuthenticated = !!token;
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }
  }

  login = async (username: string, password: string) => {
    try {
      this.setLoading(true);
      const response = await authApis.postLogin({ email: username, password });

      runInAction(() => {
        this.user = response.data.user;
        this.isAdmin = response.data.user?.role?.name === "Admin";
        this.setToken(response.data.token);
        this.isInitialized = true;
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  };

  getCurrentUser = async () => {
    try {
      this.setLoading(true);
      const localtoken = localStorage.getItem("token");
      if (!localtoken) {
        runInAction(() => {
          this.setLoading(false);
          this.isInitialized = true; // ✅ Even if no token, mark init done
        });
        return;
      }

      const response = await authApis.getCurrentUser();
      runInAction(() => {
        this.user = response.data;
        this.isAdmin = response.data?.role?.name === "Admin";
        this.isAuthenticated = true;
      });
    } catch (error) {
      console.error("Failed to get current user:", error);
    } finally {
      runInAction(() => {
        this.setLoading(false);
        this.isInitialized = true; // ✅ Always mark it done
      });
    }
  };

  logout = () => {
    runInAction(() => {
      this.user = null;
      this.isAdmin = false;
      this.isAuthenticated = false;
      this.setToken(null);
    });

    // Navigate to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login"; // 🔁 Replace with your login route if different
    }
  };
}

export const authStore = new AuthStore();
