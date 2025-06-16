import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

      async onPutCart({productId, quantity}:{productId: string, quantity: number}) {
        try {
          await onCRUD({
            Name: "cart/update-cart",
          }).Get({
            payload: {productId: productId, quantity: quantity},
          });
          
          await this.onGetCart();

        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      async onDeleteCart(productId: string) {
        try {
          await onCRUD({
            Name: `cart/remove-from-cart/${productId}`,
          }).Delete({
            payload: {},
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
      ss.setPickData({NavHeading: "Shopping Cart"})
      meds.onGetCart();
    }, []);

    //#endregion

    return { meds, methods, ss };
  },
});
