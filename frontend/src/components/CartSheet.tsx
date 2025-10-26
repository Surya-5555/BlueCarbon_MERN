import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const CartSheet = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some credits to your cart first",
        variant: "destructive",
      });
      return;
    }
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems} {totalItems === 1 ? 'credit' : 'credits'} in your cart
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.projectId} className="flex gap-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{item.projectName}</h4>
                  <p className="text-sm text-muted-foreground">${item.pricePerCredit} per credit</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.projectId, Math.max(1, item.credits - 10))}
                    >
                      -
                    </Button>
                    <span className="text-sm font-medium">{item.credits} credits</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.projectId, item.credits + 10)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.projectId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <p className="font-bold">${item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <Separator className="my-4" />

        <SheetFooter className="flex flex-col gap-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Button onClick={handleCheckout} className="w-full" size="lg">
            Proceed to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
