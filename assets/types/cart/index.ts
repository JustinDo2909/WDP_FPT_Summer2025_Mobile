declare global {
  type ICart = {
    id: string;
    user_id: string;
    cartItems: ICartLineItem[]
  };

  type ICartLineItem = {
    id: number;
    cart_id: number;
    product: IProduct;
    product_id: string;
    quantity: number;
  };
  type IAddress = {
    id?: string;
    user_id: string;
    address: string;
    city: string;
    pincode: string;
    phone: string;
    notes?: string;
    //add them
    to_city_id: string;
    to_ward_code: string
    to_district_id: string;
    fullname: string;
    district: string;
    ward: string;
  }


   type IVoucherProduct = {
    product: IProduct;
  };

  type IVoucher = {
    id: string;
    user_id: string;
    voucher_template_id: string;
    event_reward_id: string;
    stripe_coupon_id: string;
    discount_value: number;
    type: "PERCENT" | "AMOUNT";
    redeemed: boolean;
    redeemed_at: string | null;
    expired_at: string;
    updated_at: string;
    created_at: string;
    voucherProducts?: IVoucherProduct[];
    voucherTemplate: IVoucherTemplate;
  };
  
  type IVoucherTemplate = {
    id: string;
    discount_value: number;
    event_id: string;
    min_order_amount: number
    type: "PERCENT" | "AMOUNT";
    user_limit: string;
    user_count: string;
    is_active: string;
    leaderboard_reward_id: string;
    updated_at: string;
    created_at: string;
    voucherProducts: IVoucherProduct[];
  };


}

export type {
  ICart,
  ICartLineItem,
  IAddress,
  IVoucher
};