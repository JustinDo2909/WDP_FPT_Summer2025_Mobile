declare global {
    
    type IOrder = {
        id: string;
        user_id: string;
        address_id: string;
        status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
        total_amount: number;
        checkout_session_id: string;
        payment_intent_id: string;
        payment_method: "card" | "paypal" | "bank_transfer" | "cash_on_delivery";
        createdAt: string;
        updatedAt: string;
        orderItems: IOrderItem[];
        address: IAddress;
        user: IUser;
    }

    interface IUser {
        email: string;
        name: string;
    }

    interface IOrderItem {
        id: string;
        order_id: string;
        product_id: string;
        title: string;
        price: number;
        image_url: string;
        quantity: number;
    }
}







export type {

};