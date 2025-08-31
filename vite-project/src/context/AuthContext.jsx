// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Wait for localStorage check
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
        console.error("Failed to parse user from localStorage");
        localStorage.removeItem("user");
      }
    }
    setLoading(false); // Stop loading
  }, []);

  // Login function — call API to validate with MySQL
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save user from DB (matches your `users` table)
      const userData = {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        role: data.role,
        profile_pic: data.profile_pic,
      };

      setUser(userData);
      setIsLoggedIn(true);

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else if (data.role === "lecturer") {
        navigate("/lecturer/dashboard");
      } else if (data.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};