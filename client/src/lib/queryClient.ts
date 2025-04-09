import { QueryClient } from "@tanstack/react-query";

// Simplified mock API request for static site
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  // This is a dummy implementation that just returns success
  console.log(`Static site API request: ${method} ${url}`, data);
  return { ok: true };
}

// Create a simple QueryClient with minimal configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
