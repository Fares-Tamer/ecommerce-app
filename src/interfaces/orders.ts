export interface OrderResponse {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  cartItems: CartItem[];
  shippingAddress: {
    city: string;
    details: string;
    phone: string;
  };
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  id: number;
  __v: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  price?: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
}