export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  categoryName: string;
  type: 'regular' | 'rodizio-system';
}

export interface RodizioItem {
  name: string;
  categoryName: string;
  notes?: string;
}

export interface RodizioSystem {
  id: string;
  type: 'jantar' | 'almoco';
  price: number;
  quantity: number;
  selectedItems: RodizioItem[];
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
  rodizioSystems: RodizioSystem[];
  currentScreen: 'table-selection' | 'name-entry' | 'menu';
}