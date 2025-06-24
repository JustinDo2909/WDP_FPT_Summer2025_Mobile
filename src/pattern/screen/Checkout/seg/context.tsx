import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { Alert, Linking } from "react-native";
import Toast from "react-native-toast-message"; // Assuming Toast is used

// Assuming IVoucher, IAddress, ICartItem, etc., are globally declared

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
    const [showAddressPicker, setShowAddressPicker] = useState(false);
    const [showVoucherPicker, setShowVoucherPicker] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<IVoucher | undefined>();
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);
    const [shippingFee, setShippingFee] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const cart = ss.Joint?.Cart;
    const cartItems = cart?.cartItems || [];

    // --- Order Calculation Logic (Memoized for performance) ---
    const subtotal = useMemo(() => {
      return cartItems.reduce((sum, item) => {
        const price = item.product.sale_price ?? item.product.price;
        return sum + (price * item.quantity);
      }, 0);
    }, [cartItems]);

    const discount = useMemo(() => {
      if (!selectedVoucher) return 0;

      const { type, discount_value } = selectedVoucher;

      if (type === "PERCENT") {
        return (subtotal * discount_value) / 100;
      } else if (type === "AMOUNT") {
        return discount_value;
      }
      return 0;
    }, [selectedVoucher, subtotal]);

    const total = useMemo(() => {
      const discountedSubtotal = Math.max(0, subtotal - discount);
      return discountedSubtotal + (shippingFee ?? 0);
    }, [subtotal, discount, shippingFee]);

    // --- Meds Object for Actions ---
    const meds = {
      //#region Addresses
      async onGetAddresses() {
        try {
          const { data }: AxiosResponse<{ addresses: IAddress[] }> = await onCRUD({ Name: "addresses/get" }).Get({});
          if (data?.addresses) {
            setAddresses(data.addresses);
          }
        } catch (error) {
          onError({ error });
          Toast.show({ type: "error", text1: "Lỗi", text2: "Không thể tải danh sách địa chỉ." });
        }
      },
      //#endregion

      //#region GHNAPI


      //#endregion

      //#region Vouchers
      async onGetVouchers() {
        try {
          const { data }: AxiosResponse<{ vouchers: IVoucher[] }> = await onCRUD({ Name: "vouchers" }).Get({});
          if (data?.vouchers) {
            setVouchers(data.vouchers);
          }
        } catch (error) {
          onError({ error });
          Toast.show({ type: "error", text1: "Lỗi", text2: "Không thể tải danh sách voucher." });
        }
      },
      //#endregion

      //#region Order Actions
      async onBuyNow() {
        if (!selectedAddress) {
          Alert.alert("Lỗi", "Vui lòng chọn địa chỉ giao hàng.");
          return;
        }
        if (cartItems.length === 0) {
          Alert.alert("Lỗi", "Giỏ hàng của bạn đang trống.");
          return;
        }

        setIsLoading(true);
        try {
          const { data }: AxiosResponse<{ url: string }> = await onCRUD({ Name: "orders/create-checkout-session" }).Post({
            payload: {
              addressId: selectedAddress.id,
              voucherId: selectedVoucher?.stripe_coupon_id,
              shippingCost: shippingFee,
            },
          });
          if (data?.url) {
            // Open Stripe checkout URL in browser
            Linking.openURL(data.url)
              .then(() => {
                // Optionally, listen for deep link/callback here for real-world apps
                // For now, show a message and navigate to success
                Alert.alert("Chuyển hướng thanh toán", "Bạn đang được chuyển đến trang thanh toán Stripe.");
                // Clear cart after successful order
                ss.setJointData({ Cart: undefined });
                // Navigate to success page (replace with your navigation logic)
                // Example: navigation.navigate('CheckoutSuccess');
              })
              .catch(() => {
                Toast.show({ type: "error", text1: "Lỗi chuyển hướng", text2: "Không thể mở trang thanh toán." });
                // Navigate to error page (replace with your navigation logic)
                // Example: navigation.navigate('CheckoutError');
              });
          } else {
            Toast.show({ type: "error", text1: "Lỗi đặt hàng", text2: "Không nhận được URL thanh toán." });
            // Optionally navigate to error page
          }
        } catch (error) {
          onError({ error });
          Toast.show({ type: "error", text1: "Lỗi đặt hàng", text2: "Đã xảy ra lỗi khi đặt đơn hàng." });
          // Optionally navigate to error page
        } finally {
          setIsLoading(false);
        }
      },
      //#endregion

      //#region UI State Management
      onSelectAddress(address: IAddress) {
        setSelectedAddress(address);
        setShowAddressPicker(false);
      },
      onSelectVoucher(voucher: IVoucher) {
        setSelectedVoucher(voucher);
        setShowVoucherPicker(false);
      },
      // You can add more UI related handlers here if they are complex enough
      // e.g., onToggleAddressPicker, onToggleVoucherPicker
      //#endregion
    };

    // --- LifeCycle ---
    useEffect(() => {
      // ss.resetPick(); // Ensure this is needed globally or specific to this logic
      meds.onGetAddresses();
      meds.onGetVouchers();
    }, []); // Empty dependency array as meds functions are stable due to being defined within useLogic

    // Shipping fee logic
    useEffect(() => {
      if (selectedAddress) {
        setShippingFee(30000); // 30k VND
      } else {
        setShippingFee(null);
      }
    }, [selectedAddress]);

    return {
      // states
      selectedAddress,
      showAddressPicker,
      showVoucherPicker,
      showAddAddress,
      selectedVoucher,
      addresses,
      vouchers,
      shippingFee,
      isLoading,
      ss, // ss (sStore) is also a state/context manager

      // derived values (from useMemo)
      subtotal,
      discount,
      total,
      cart,
      cartItems,

      // actions (from meds)
      meds,

      // individual setters/toggles if needed externally and not handled by meds
      setSelectedAddress,
      setShowAddressPicker,
      setShowAddAddress,
      setSelectedVoucher,
      setShowVoucherPicker,
      setIsLoading, // If you need to manually control loading from outside
    };
  },
});