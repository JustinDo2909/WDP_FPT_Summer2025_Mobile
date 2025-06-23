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

    const [selected, setSelected] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const cart = ss.Joint?.Cart;

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
          }).Get({ payload: { productId, quantity } });

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
      handleSelect(id: number) {
        setSelected((prev) =>
          prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
      },

      handleSelectAll() {
        const allItemIds = cart?.cartItems?.map((item) => item.id) ?? [];
        const allSelected = selected.length === allItemIds.length && allItemIds.length > 0;
        setSelected(allSelected ? [] : allItemIds);
      },

      calculateTotal() {
        if (!cart?.cartItems) return 0;
        return cart.cartItems
          .filter((item) => selected.includes(item.id))
          .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
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
        if (selected.length === 0) {
          Alert.alert("No items selected", "Please select items to purchase.");
          return;
        }

        setIsLoading(true);
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          Alert.alert("Success", "Items purchased successfully!");
          setSelected([]);
        } catch (error) {
          Alert.alert("Error", "Failed to process purchase. Please try again.");
        } finally {
          setIsLoading(false);
        }
      },
      //#endregion
    };

    //#region Lifecycle
    useEffect(() => {
      ss.setPickData({ NavHeading: "Shopping Cart" });
      meds.onGetCart();
    }, []);
    //#endregion

    // Derived values for UI
    const allItemIds = cart?.cartItems?.map((item) => item.id) ?? [];
    const isAllSelected = selected.length === allItemIds.length && allItemIds.length > 0;
    const hasSelectedItems = selected.length > 0;
    const totalCost = meds.calculateTotal();

    return {
      meds,
      methods,
      ss,
      cart,
      selected,
      isAllSelected,
      hasSelectedItems,
      totalCost,
      isLoading,
    };
  },
});
