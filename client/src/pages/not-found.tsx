import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-charcoal/90">
      <Card className="w-full max-w-md mx-4 border-secondary">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-secondary font-medieval">404 Pagina Non Trovata</h1>
          </div>

          <p className="mt-4 text-sm text-foreground/70 mb-6">
            La pagina che stai cercando non esiste o è stata spostata.
          </p>
          
          <Link 
            href="/" 
            className="inline-block px-6 py-2 bg-primary text-foreground border border-secondary hover:bg-primary/80 transition-all duration-300 font-medieval"
          >
            Torna alla Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
