import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin"; 
import Admin from "@/pages/Admin";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  // Don't show header/footer on admin pages
  const isAdminPage = location.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}
      
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard" component={Admin} />
        <Route component={NotFound} />
      </Switch>
      
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
