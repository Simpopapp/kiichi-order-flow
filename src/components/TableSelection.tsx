import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface TableSelectionProps {
  onTableSelected: (tableNumber: string) => void;
}

const TableSelection: React.FC<TableSelectionProps> = ({ onTableSelected }) => {
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const number = parseInt(tableNumber);
    if (!tableNumber || isNaN(number) || number <= 0) {
      setError('Por favor, insira um número de mesa válido');
      return;
    }
    
    setError('');
    onTableSelected(tableNumber);
  };

  const handleQuickSelect = (number: number) => {
    setTableNumber(number.toString());
    onTableSelected(number.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-kiichi flex items-center justify-center p-4 wave-pattern">
      <Card className="w-full max-w-md shadow-floating animate-slide-up">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-kiichi-red mb-2">Kiichi</h1>
              <p className="text-kiichi-gray text-sm">Culinária Japonesa Autêntica</p>
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">Bem-vindo!</h2>
            <p className="text-muted-foreground">Selecione o número da sua mesa ou comanda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="number"
                placeholder="Número da mesa"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="text-center text-lg h-12 transition-kiichi"
                min="1"
                autoFocus
              />
              {error && (
                <p className="text-destructive text-sm mt-2 animate-fade-in">{error}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-kiichi-red hover:bg-kiichi-red-dark transition-kiichi hover-glow"
            >
              Avançar
            </Button>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Acesso rápido às mesas:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSelect(num)}
                  className="hover-scale transition-kiichi"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TableSelection;