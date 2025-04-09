import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ContactSubmission } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, LogOut, Mail, Phone, Calendar } from "lucide-react";
import { format } from 'date-fns';

const Admin = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin');
    }
  }, [isAuthenticated, setLocation]);

  // Fetch contact submissions
  const { data: submissions, isLoading, isError } = useQuery({
    queryKey: ['/api/admin/contact-submissions'],
    enabled: isAuthenticated,
  });

  // Mark as reviewed mutation
  const markAsReviewedMutation = useMutation({
    mutationFn: ({ id, isReviewed }: { id: number; isReviewed: boolean }) => {
      return apiRequest("PUT", `/api/admin/contact-submissions/${id}/review`, { isReviewed });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-submissions'] });
      toast({
        title: "Atjaunots",
        description: "Kontakta statuss ir veiksmīgi atjaunināts.",
      });
    },
    onError: () => {
      toast({
        title: "Kļūda!",
        description: "Neizdevās atjaunināt kontakta statusu.",
        variant: "destructive",
      });
    },
  });

  // Delete submission mutation
  const deleteSubmissionMutation = useMutation({
    mutationFn: (id: number) => {
      return apiRequest("DELETE", `/api/admin/contact-submissions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-submissions'] });
      setSelectedSubmission(null);
      toast({
        title: "Dzēsts",
        description: "Kontakta pieprasījums ir veiksmīgi dzēsts.",
      });
    },
    onError: () => {
      toast({
        title: "Kļūda!",
        description: "Neizdevās dzēst kontakta pieprasījumu.",
        variant: "destructive",
      });
    },
  });

  // Handle review toggle
  const handleReviewToggle = (submission: ContactSubmission) => {
    markAsReviewedMutation.mutate({
      id: submission.id,
      isReviewed: !submission.isReviewed,
    });
  };

  // Handle delete
  const handleDelete = () => {
    if (selectedSubmission) {
      deleteSubmissionMutation.mutate(selectedSubmission.id);
    }
  };

  // Format product name function
  const formatProductName = (productId: string | null) => {
    if (!productId) return "Nav norādīts";
    
    const products: Record<string, string> = {
      "eko-mini": "EKO Mini",
      "eko-standard": "EKO Standard",
      "eko-office": "EKO Office",
      "eko-lux": "EKO Lux",
      "custom": "Pielāgots risinājums"
    };
    
    return products[productId] || productId;
  };

  // Handle logout
  const handleLogout = async () => {
    await logout();
    setLocation('/admin');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-600">Pierakstījies kā: {user?.username}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Iziet
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Kontakta pieprasījumi</CardTitle>
            <CardDescription>
              Pārvaldiet klientu iesūtītos kontakta pieprasījumus
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Ielādē...</div>
            ) : isError ? (
              <div className="text-center py-8 text-red-500">
                Kļūda ielādējot datus. Lūdzu, mēģiniet vēlreiz.
              </div>
            ) : submissions?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nav atrasti kontakta pieprasījumi.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Vārds</TableHead>
                      <TableHead>Kontakti</TableHead>
                      <TableHead>Produkts</TableHead>
                      <TableHead>Datums</TableHead>
                      <TableHead className="text-right">Darbības</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions?.map((submission: ContactSubmission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={submission.isReviewed}
                              onCheckedChange={() => handleReviewToggle(submission)}
                            />
                            <Badge variant={submission.isReviewed ? "outline" : "default"}>
                              {submission.isReviewed ? "Pārskatīts" : "Jauns"}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1 text-gray-500" /> 
                              <a href={`mailto:${submission.email}`} className="hover:underline">{submission.email}</a>
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1 text-gray-500" /> 
                              <a href={`tel:${submission.phone}`} className="hover:underline">{submission.phone}</a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{formatProductName(submission.product || null)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                            {format(new Date(submission.submittedAt), 'dd.MM.yyyy HH:mm')}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedSubmission(submission)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {selectedSubmission && (
          <AlertDialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Vai tiešām vēlaties dzēst šo ierakstu?</AlertDialogTitle>
                <AlertDialogDescription>
                  Šī darbība ir neatgriezeniska. Ieraksts tiks neatgriezeniski dzēsts no sistēmas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Atcelt</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Dzēst
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default Admin;
