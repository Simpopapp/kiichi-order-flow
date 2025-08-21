import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-kiichi flex items-center justify-center p-4 wave-pattern">
      <Card className="w-full max-w-md shadow-floating animate-slide-up">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold text-kiichi-red mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Página não encontrada</h2>
            <p className="text-muted-foreground mb-6">
              Oops! A página que você está procurando não existe.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-kiichi-red hover:bg-kiichi-red-dark transition-kiichi hover-glow"
            >
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Cardápio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
