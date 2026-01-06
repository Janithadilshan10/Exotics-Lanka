import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "buyer" | "seller" | "dealer";
  avatar?: string;
  verified: boolean;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");
    
    if (storedUser && storedAuth === "true") {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (!email || !password) {
      throw new Error("Please fill in all fields");
    }

    if (password.length < 6) {
      throw new Error("Invalid credentials");
    }

    // Check if user exists in localStorage (from registration)
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: any) => u.email === email);

    let mockUser: User;

    if (existingUser) {
      // User found - check password
      if (existingUser.password !== password) {
        throw new Error("Invalid credentials");
      }
      mockUser = existingUser;
    } else {
      // Demo user for testing
      mockUser = {
        id: Date.now().toString(),
        name: email.split("@")[0],
        email,
        role: "seller",
        verified: true,
        createdAt: new Date().toISOString(),
      };
    }

    // Remove password before storing
    const { password: _, ...userWithoutPassword } = mockUser as any;

    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    localStorage.setItem("isAuthenticated", "true");

    toast.success("Welcome back!");
    navigate("/");
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock validation
    if (!name || !email || !password || !role) {
      throw new Error("Please fill in all fields");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((u: any) => u.email === email);

    if (emailExists) {
      throw new Error("Email already registered");
    }

    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      name,
      email,
      password, // Store password for mock auth
      role: role as "buyer" | "seller" | "dealer",
      verified: false,
      createdAt: new Date().toISOString(),
    };

    // Save to users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Remove password before setting user state
    const { password: _, ...userWithoutPassword } = newUser;

    setUser(userWithoutPassword);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    localStorage.setItem("isAuthenticated", "true");

    toast.success("Account created successfully!");
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile updated");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


