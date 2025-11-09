// src/context/AuthContext.jsx
// @refresh reset
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // For checking localStorage on app load
  const [authLoading, setAuthLoading] = useState(false); // For login/logout requests
  const navigate = useNavigate();

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Failed to parse user:", err);
        localStorage.removeItem("user");
      }
    }``
    setLoading(false);
  }, []);

// Login function
const login = async (email, password) => {
  setAuthLoading(true);
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // Save token
    localStorage.setItem("token", data.token);

    // Save user info from backend
    const userData = data.user; // backend now sends { user: {...}, token: '...' }

    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("✅ Token saved:", data.token);
    console.log("✅ User saved:", userData);

    // Redirect based on role
    if (userData.role === "admin") {
      navigate("/admin/dashboard");
    } else if (userData.role === "teacher") {
      navigate("/teacher/dashboard");
    } else if (userData.role === "student") {
      navigate("/student/dashboard");
    }

    return userData; // optional if you need it elsewhere
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  } finally {
    setAuthLoading(false);
  }
};

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        authLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};