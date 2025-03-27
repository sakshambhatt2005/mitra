
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  verifyPhone: (phone: string) => Promise<boolean>;
  confirmOTP: (otp: string) => Promise<boolean>;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tempPhone, setTempPhone] = useState<string>('');
  const [tempUserData, setTempUserData] = useState<RegisterData | null>(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('mitraUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you would make an API call to verify credentials
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data (in a real app, this would come from your backend)
      const user: User = {
        id: 'user-' + Date.now(),
        email,
        firstName: 'Mitra',
        lastName: 'User',
        isPhoneVerified: true,
        isEmailVerified: true
      };
      
      setCurrentUser(user);
      setIsAuthenticated(true);
      
      // Store user in localStorage
      localStorage.setItem('mitraUser', JSON.stringify(user));
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  // Mock register function
  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store user data temporarily until phone verification
      setTempUserData(userData);
      
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    }
  };

  // Mock phone verification function
  const verifyPhone = async (phone: string): Promise<boolean> => {
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store phone number temporarily
      setTempPhone(phone);
      
      return true;
    } catch (error) {
      console.error('Phone verification failed:', error);
      toast.error('Failed to send OTP. Please try again.');
      return false;
    }
  };

  // Mock OTP confirmation
  const confirmOTP = async (otp: string): Promise<boolean> => {
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user if both phone and registration data are available
      if (tempUserData && tempPhone) {
        const user: User = {
          id: 'user-' + Date.now(),
          email: tempUserData.email,
          firstName: tempUserData.firstName,
          lastName: tempUserData.lastName,
          phone: tempPhone,
          isPhoneVerified: true,
          isEmailVerified: true // In a real app, you would have a separate email verification flow
        };
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        // Store user in localStorage
        localStorage.setItem('mitraUser', JSON.stringify(user));
        
        // Clear temporary data
        setTempUserData(null);
        setTempPhone('');
      }
      
      return true;
    } catch (error) {
      console.error('OTP confirmation failed:', error);
      toast.error('OTP verification failed. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('mitraUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    currentUser,
    login,
    register,
    logout,
    verifyPhone,
    confirmOTP
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
