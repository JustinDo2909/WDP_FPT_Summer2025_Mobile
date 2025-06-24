import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const methods = useForm({
      mode: "all",
      defaultValues: {
        fields: {},
        filters: {},
      },
    });

    const [isLoading, setIsLoading] = useState(false);

    const cart = ss.Joint?.Cart;
    const { navigate } = useCustomRouter();

    // Remove selection logic, all items are checkoutable by default

    const meds = {
      //#region Cart APIs
      async onGetCart() {
        try {
          const { data }: AxiosResponse<IResponse<ICart, 'cart'>> = await onCRUD({
            Name: "cart/get-cart",
          }).Get({ payload: {} });

          if (data?.cart) {
            if (ss.setJointData) {
              ss.setJointData({ Cart: data.cart });
            }
          }
        } catch (error) {
          onError({ error });
        }
      },

      async onPutCart({ productId, quantity }: { productId: string; quantity: number }) {
        try {
          await onCRUD({
            Name: "cart/update-cart",
          }).Put({ payload: { productId, quantity } });

          await meds.onGetCart();
        } catch (error) {
          onError({ error });
        }
      },

      async onDeleteCart(productId: string) {
        try {
          await onCRUD({
            Name: `cart/remove-from-cart/${productId}`,
          }).Delete({ payload: {} });

          await meds.onGetCart();
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      //#region Cart logic
      handleQuantityChange: (id: number, newQty: number) => {
        const item = cart?.cartItems?.find(i => i.id === id);
        if (!item) return;
        const inStock = item.product.total_stock ?? 0;
        if (newQty < 1 || newQty > inStock) return;
        meds.onPutCart({ productId: item.product_id, quantity: newQty });
      },

      handleRemove: (id: number) => {
        const item = cart?.cartItems?.find(i => i.id === id);
        if (!item) return;
        meds.onDeleteCart(item.product_id);
      },

      calculateTotal() {
        if (!cart?.cartItems) return 0;
        return cart.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },

      formatCurrency(amount: number) {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount);
      },

      handleVoucherPress() {
        Alert.alert("Vouchers", "Voucher selection feature coming soon!");
      },

      async handleBuyPress() {
        if (!cart?.cartItems?.length) {
          Alert.alert("No items in cart", "Please add items to purchase.");
          return;
        }
        ss.setJointData({ CheckoutCartItems: cart.cartItems });
        ss.setPickData({ NavHeading: "Checkout" });
        navigate({ pathSegments: ["Checkout"] });
      },
      //#endregion
    };

    //#region Lifecycle
    useEffect(() => {
      ss.setPickData({ NavHeading: "Shopping Cart" });
      meds.onGetCart();
    }, []);
    //#endregion

    return {
      meds,
      methods,
      ss,
      cart,
      isLoading,
    };
  },
});
