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


}

export type {
  ICart,
  ICartLineItem,
  IAddress
};