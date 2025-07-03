import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Linking } from "react-native";
import Toast from "react-native-toast-message"; // Assuming Toast is used
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";

const { GHN_API_TOKEN, GHN_CLIENT_ID, GHN_SHOP_ID } =
  Constants.expoConfig?.extra ?? {};

// Assuming IVoucher, IAddress, ICartItem, etc., are globally declared

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
        user_id: "";
        address: "";
        city: "";
        to_city_id: "";
        to_district_id: "";
        to_ward_code: "";
        pincode: "";
        phone: "";
        notes: "";
        fullname: "";
        district: "";
        ward: "";
      };
    };

    const methods = useForm<IForm>({
      mode: "onChange",
      reValidateMode: "onSubmit",
      defaultValues: {
        fields: {},
      },
    });

    const ss = sStore();
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(
      null
    );
    const [showAddressPicker, setShowAddressPicker] = useState(false);
    const [showVoucherPicker, setShowVoucherPicker] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<
      IVoucher | undefined
    >();
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);
    const [shippingFee, setShippingFee] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const [shippingInfo, setShippingInfo] = useState<Partial<IAddress>>({
      user_id: "",
      address: "",
      city: "",
      to_city_id: "",
      to_district_id: "",
      to_ward_code: "",
      pincode: "",
      phone: "",
      notes: "",
      fullname: "",
      district: "",
      ward: "",
    });

    const cart = ss.Joint?.Cart;
    const cartItems = cart?.cartItems || [];

    // --- Order Calculation Logic (Memoized for performance) ---
    const subtotal = useMemo(() => {
      return cartItems.reduce((sum, item) => {
        const price = item.product.sale_price ?? item.product.price;
        return sum + price * item.quantity;
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
          const { data }: AxiosResponse<{ addresses: IAddress[] }> =
            await onCRUD({ Name: "addresses/get" }).Get({});
          if (data?.addresses) {
            setAddresses(data.addresses);
          }
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể tải danh sách địa chỉ.",
          });
        }
      },
      //#endregion

      //#region AddAddresses
      async onAddAddress({ fields }: IForm) {
        try {
          setIsLoading(true);

          await onCRUD({ Name: "addresses/add" }).Post({
            payload: {
              address: fields.address,
              city: shippingInfo.city,
              to_city_id: shippingInfo.to_city_id,
              to_district_id: shippingInfo.to_district_id,
              to_ward_code: shippingInfo.to_ward_code,
              pincode: fields.pincode,
              phone: fields.phone,
              notes: fields.notes,
              // district: shippingInfo.district,
              // ward: shippingInfo.ward,
            },
          });

          await meds.onGetAddresses();

          setShowAddAddress(false);
          setShowAddressPicker(true);
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể thêm địa chỉ mới.",
          });
        } finally {
          setIsLoading(false);
        }
      },

      //#endregion

      //#region GHNAPI
      async onGetProvinces() {
        try {
          const { data }: AxiosResponse<any> = await onCRUD({
            Name: "master-data/province",
            BaseURL: "https://online-gateway.ghn.vn/shiip/public-api",
          }).Get({
            config: {
              headers: {
                Token: GHN_API_TOKEN,
                ShopId: GHN_SHOP_ID,
              },
            },
          });
          if (data?.data) {
            return data.data.map((item: any) => ({
              name: item.ProvinceName,
              codeId: item.ProvinceID.toString(),
            }));
          }
          return [];
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể tải danh sách tỉnh/thành.",
          });
          return [];
        }
      },

      async onGetDistricts(provinceId: number) {
        try {
          const { data }: AxiosResponse<any> = await onCRUD({
            Name: `master-data/district?province_id=${provinceId}`,
            BaseURL: "https://online-gateway.ghn.vn/shiip/public-api",
          }).Get({
            config: {
              headers: {
                Token: GHN_API_TOKEN,
                ShopId: GHN_SHOP_ID,
              },
            },
          });
          if (data?.data) {
            return data.data.map((item: any) => ({
              name: item.DistrictName,
              codeId: item.DistrictID.toString(),
            }));
          }
          return [];
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể tải danh sách quận/huyện.",
          });
          return [];
        }
      },

      async onGetWards(districtId: number) {
        try {
          const { data }: AxiosResponse<any> = await onCRUD({
            Name: `master-data/ward?district_id=${districtId}`,
            BaseURL: "https://online-gateway.ghn.vn/shiip/public-api",
          }).Get({
            config: {
              headers: {
                Token: GHN_API_TOKEN,
                ShopId: GHN_SHOP_ID,
              },
            },
          });
          if (data?.data) {
            return data.data.map((item: any) => ({
              name: item.WardName,
              codeId: item.WardCode.toString(),
            }));
          }
          return [];
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể tải danh sách phường/xã.",
          });
          return [];
        }
      },

      async onGetShippingFee(
        to_district_id: number,
        to_ward_code: string
      ): Promise<number | null> {
        try {
          const payload = {
            service_id: 53320,
            service_type_id: null,
            to_district_id: Number(to_district_id),
            to_ward_code: to_ward_code,
            weight: 100,
            items: ss.Joint.Cart?.cartItems.map((item) => ({
              name: item.product.title,
              quantity: item.quantity,
            })),
          };

          const { data }: AxiosResponse<any> = await onCRUD({
            Name: "v2/shipping-order/fee",
            BaseURL: "https://online-gateway.ghn.vn/shiip/public-api",
          }).Post({
            payload,
            config: {
              headers: {
                Token: GHN_API_TOKEN,
                ShopId: GHN_SHOP_ID,
              },
            },
          });

          setShippingFee(data.data.total)
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể tính phí vận chuyển.",
          });
          return null;
        }
      },
      //#endregion

      //#region Vouchers
      async onGetVouchers() {
        try {
          const { data }: AxiosResponse<{ vouchers: IVoucher[] }> =
            await onCRUD({ Name: "vouchers" }).Get({});
          if (data?.vouchers) {
            setVouchers(data.vouchers);
          }
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không thể tải danh sách voucher.",
          });
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
          const { data }: AxiosResponse<{ url: string }> = await onCRUD({
            Name: "orders/create-checkout-session",
          }).Post({
            payload: {
              addressId: selectedAddress.id,
              couponId: selectedVoucher?.stripe_coupon_id,
              shippingCost: shippingFee,
              // isMobile: true,
            },
          });
          if (data?.url) {
            WebBrowser.openBrowserAsync(data.url)
              .then(() => {
                Alert.alert(
                  "Chuyển hướng thanh toán",
                  "Bạn đang được chuyển đến trang thanh toán Stripe."
                );
                // Clear cart after successful order
                // Navigate to success page (replace with your navigation logic)
                // Example: navigation.navigate('CheckoutSuccess');
              })
              .catch(() => {
                Toast.show({
                  type: "error",
                  text1: "Lỗi chuyển hướng",
                  text2: "Không thể mở trang thanh toán.",
                });
                // Navigate to error page (replace with your navigation logic)
                // Example: navigation.navigate('CheckoutError');
              });
          }
        } catch (error) {
          onError({ error });
          Toast.show({
            type: "error",
            text1: "Lỗi đặt hàng",
            text2: "Đã xảy ra lỗi khi đặt đơn hàng.",
          });
          // Optionally navigate to error page
        } finally {
          setIsLoading(false);
        }
      },
      //#endregion

      validateVietnamesePhoneNumber(phone: string): boolean {
        // Remove spaces, dashes, and dots
        const cleaned = phone.replace(/[\s.-]/g, "");

        // Vietnamese phone number pattern
        const regex =
          /^(?:\+84|0)(3[2-9]|5[2689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/;

        return regex.test(cleaned);
      },

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
        meds.onGetShippingFee(Number(selectedAddress.to_district_id), String(selectedAddress.to_ward_code))
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
      methods,

      // individual setters/toggles if needed externally and not handled by meds
      setSelectedAddress,
      setShowAddressPicker,
      setShowAddAddress,
      setSelectedVoucher,
      setShowVoucherPicker,
      setShippingInfo,
      setIsLoading, // If you need to manually control loading from outside
      shippingInfo,
    };
  },
});
