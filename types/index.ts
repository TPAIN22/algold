export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  categories?: Category | null;
}

export interface ProductWithCategory extends Product {
  categories: Category | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: number;
  product_id: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  total_price: number;
  status: "new" | "contacted" | "confirmed" | "shipped" | "delivered" | "cancelled";
  notes: string | null;
  created_at: string;
  products?: { name: string; image_url: string | null } | null;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  availableProducts: number;
  totalOrders: number;
  newOrders: number;
}
