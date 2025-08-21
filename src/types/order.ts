export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  categoryName: string;
}

export interface OrderInfo {
  tableNumber: string;
  customerName: string;
  items: CartItem[];
  total: number;
  timestamp: Date;
}

export interface AppState {
  tableNumber: string;
  customerName: string;
  cart: CartItem[];
  currentScreen: 'table-selection' | 'name-entry' | 'menu';
}