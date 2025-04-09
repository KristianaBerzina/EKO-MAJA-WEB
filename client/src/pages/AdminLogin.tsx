import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginCredentials } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const AdminLogin = () => {
  const { isAuthenticated, login, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/admin/dashboard');
    }
  }, [isAuthenticated, setLocation]);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await login(data);
    } catch (error) {
      toast({
        title: "Autentifikācijas kļūda",
        description: "Nepareizs lietotājvārds vai parole.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">EKO-MĀJA Admin</CardTitle>
          <CardDescription className="text-center">
            Lūdzu pierakstieties, lai piekļūtu administrācijas panelim
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lietotājvārds</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parole</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Pierakstās...
                  </>
                ) : (
                  "Pierakstīties"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-xs text-center text-gray-500 mt-4">
            Pēc noklusējuma: lietotājvārds - admin, parole - admin123
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
