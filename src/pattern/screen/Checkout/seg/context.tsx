import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
    const [showAddressPicker, setShowAddressPicker] = useState(false);
    const [showVoucherPicker, setShowVoucherPicker] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [vouchers, setVouchers] = useState<any[]>([]);
    const [shippingFee, setShippingFee] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const cart = ss.Joint?.Cart;
    const cartItems = cart?.cartItems || [];

    // Fetch addresses
    const fetchAddresses = async () => {
      try {
        const { data }: any = await onCRUD({ Name: "addresses/get" }).Get({});
        if (data?.addresses) setAddresses(data.addresses);
      } catch (error) { onError({ error }); }
    };

    // Fetch vouchers
    const fetchVouchers = async () => {
      try {
        const { data }: any = await onCRUD({ Name: "vouchers" }).Get({});
        if (data?.vouchers) setVouchers(data.vouchers);
      } catch (error) { onError({ error }); }
    };

    // Calculate order summary
    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.sale_price ?? item.product.price) * item.quantity, 0);
    const discount = selectedVoucher ? selectedVoucher.amount ?? 0 : 0;
    const total = subtotal - discount + (shippingFee ?? 0);

    // Shipping fee logic (mock)
    useEffect(() => {
      if (selectedAddress) setShippingFee(30000); // 30k VND
      else setShippingFee(null);
    }, [selectedAddress]);

    useEffect(() => {
      fetchAddresses();
      fetchVouchers();
    }, []);

    const handleBuyNow = async () => {
      if (!selectedAddress) {
        Alert.alert("Select address", "Please select a shipping address.");
        return;
      }
      setIsLoading(true);
      try {
        await onCRUD({ Name: "order/checkout" }).Post({
          payload: {
            addressId: selectedAddress.id,
            voucherId: selectedVoucher?.id,
            cartItems: cartItems.map(i => ({ id: i.id, quantity: i.quantity })),
          },
        });
        Alert.alert("Order placed!", "Thank you for your purchase.");
      } catch (error) {
        onError({ error });
      }
      setIsLoading(false);
    };

    return {
      ss,
      cart,
      cartItems,
      addresses,
      selectedAddress,
      setSelectedAddress,
      showAddressPicker,
      setShowAddressPicker,
      showAddAddress,
      setShowAddAddress,
      vouchers,
      selectedVoucher,
      setSelectedVoucher,
      showVoucherPicker,
      setShowVoucherPicker,
      subtotal,
      discount,
      shippingFee,
      total,
      isLoading,
      handleBuyNow,
      fetchAddresses,
      fetchVouchers,
    };
  },
});
