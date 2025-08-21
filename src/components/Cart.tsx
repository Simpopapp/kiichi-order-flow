import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CartProps {
  tableNumber: string;
  customerName: string;
  onOrderSent?: () => void;
}

const Cart: React.FC<CartProps> = ({ tableNumber, customerName, onOrderSent }) => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const generateOrderMessage = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    let message = `=== NOVO PEDIDO ===\n`;
    message += `Mesa: ${tableNumber}\n`;
    message += `Cliente: ${customerName}\n`;
    message += `Data/Hora: ${dateStr} ${timeStr}\n\n`;
    message += `ITENS DO PEDIDO:\n`;
    
    items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      message += `${item.quantity}x ${item.name}`;
      if (item.notes) {
        message += ` (${item.notes})`;
      }
      if (item.price > 0) {
        message += ` - ${formatPrice(itemTotal)}`;
      }
      message += `\n`;
    });
    
    message += `\nTOTAL: ${formatPrice(getTotalPrice())}\n\n`;
    message += `-- Pedido gerado pelo Cardápio Digital --`;
    
    return message;
  };

  const handleSendOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione itens ao carrinho antes de enviar o pedido",
        variant: "destructive"
      });
      return;
    }

    const message = generateOrderMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "+5511999999999"; // Placeholder number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp",
    });

    if (onOrderSent) {
      onOrderSent();
    }
  };

  const FloatingCart = () => (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(true)}
        className="h-14 w-14 rounded-full shadow-floating bg-kiichi-red hover:bg-kiichi-red-dark transition-kiichi hover-scale animate-bounce-in"
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          {items.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-kiichi-gold text-kiichi-black text-xs">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          )}
        </div>
      </Button>
    </div>
  );

  const CartModal = () => (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/50 animate-fade-in" onClick={() => setIsOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-elegant animate-slide-right">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b bg-kiichi-gray text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Seu Pedido</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="text-sm opacity-90">
              Mesa {tableNumber} • {customerName}
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Adicione itens do cardápio para fazer seu pedido
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover-lift transition-kiichi">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        {item.price > 0 && (
                          <p className="font-semibold text-kiichi-red">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">{item.categoryName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-kiichi-red">{formatPrice(getTotalPrice())}</span>
              </div>
              
              <Button
                onClick={handleSendOrder}
                className="w-full h-12 text-lg font-semibold bg-kiichi-red hover:bg-kiichi-red-dark transition-kiichi hover-glow"
              >
                Enviar Pedido via WhatsApp
              </Button>
              
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full"
              >
                Limpar Carrinho
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );

  return (
    <>
      <FloatingCart />
      <CartModal />
    </>
  );
};

export default Cart;