import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface NameEntryProps {
  tableNumber: string;
  onNameEntered: (name: string) => void;
  onBack: () => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ tableNumber, onNameEntered, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerName.trim()) {
      setError('Por favor, digite seu nome');
      return;
    }
    
    setError('');
    onNameEntered(customerName.trim());
  };

  return (
    <div className="min-h-screen bg-gradient-kiichi flex items-center justify-center p-4 wave-pattern">
      <Card className="w-full max-w-md shadow-floating animate-slide-up">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-kiichi-gray hover:text-kiichi-red transition-kiichi"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar
            </Button>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Mesa</p>
              <p className="text-lg font-semibold text-kiichi-red">{tableNumber}</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-kiichi-red mb-2">Kiichi</h1>
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">Identificação</h2>
            <p className="text-muted-foreground">Digite seu nome para personalizar o atendimento</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Seu nome"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="text-center text-lg h-12 transition-kiichi"
                autoFocus
                maxLength={50}
              />
              {error && (
                <p className="text-destructive text-sm mt-2 animate-fade-in">{error}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-kiichi-red hover:bg-kiichi-red-dark transition-kiichi hover-glow"
            >
              Continuar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Suas informações são utilizadas apenas para este pedido
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NameEntry;