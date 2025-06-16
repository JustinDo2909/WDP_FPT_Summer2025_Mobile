import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

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

    const meds = {
      //#region getProduct
      async onGetProducts() {
        try {
          const { data }: AxiosResponse<IPaginatedResponse<IProduct, 'products'>> = await onCRUD({
            Name: "products",
          }).Get({
            payload: {},
          });

          if (data?.products) {
            ss.setJointData({ Products: data?.products });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      //#region getCart
      async onGetCart() {
        try {
          const { data }: AxiosResponse<IResponse<ICart, 'cart'>> = await onCRUD({
            Name: "cart/get-cart",
          }).Get({
            payload: {},
          });

          if (data?.cart) {
            ss.setJointData({ Cart: data?.cart });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      //#region AddCart
      async onAddToCart(productId: string, quantity: number) {
        try {
          await onCRUD({
            Name: "cart/add-to-cart",
          }).Post({
            payload: {productId: productId, quantity: quantity},
          });

          Toast.show({
            type: "success",
            text1: "Added to cart!",
          });

          await this.onGetCart();
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion
    };

    

    //#region LifeCycle



    useEffect(() => {
      ss.resetPick()
      meds.onGetProducts();
    }, []);

    //#endregion

    return { meds, methods, ss };
  },
});
