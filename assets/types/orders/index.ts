declare global {
  type IOrder = {
    id: string;
    user_id: string;
    address_id: string;
    status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    total_amount: number;
    subtotal: number;
    checkout_session_id: string;
    payment_intent_id: string;
    payment_method: "card" | "paypal" | "bank_transfer" | "cash_on_delivery";
    createdAt: string;
    updatedAt: string;
    shipping_fee: number;
    payment_status: string;
    receipt_url: string;
    discount_amount: number;
    orderItems: IOrderItem[];
    address: IAddress;
    user: IUser;
    reason: string;
  };

  interface IUser {
    id:string;
    email: string;
    name: string;
  }

  interface IOrderItem {
    id: string;
    order_id: string;
    product_id: string;
    title: string;
    price: number; //dep
    image_url: string;
    quantity: number;
    unit_price: number;
    discount_per_item: number;
    total_price: number;
    final_price: number;
  }
}

export type {};
