import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { LoginCredentials, User } from "@shared/schema";

export function useAuth() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<Partial<User> | null>(null);

  // Check session status
  const sessionQuery = useQuery({
    queryKey: ['/api/auth/session'],
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
    },
    onError: () => {
      setIsAuthenticated(false);
      setUser(null);
    }
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      return response.json();
    },
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/session'] });
    },
    onError: (error) => {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    }
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      setIsAuthenticated(false);
      setUser(null);
      queryClient.invalidateQueries({ queryKey: ['/api/auth/session'] });
      queryClient.clear();
    }
  });

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const isLoading = loginMutation.isPending || sessionQuery.isLoading;

  return {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading
  };
}
