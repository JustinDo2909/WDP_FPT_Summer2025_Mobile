import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const [reviews, setReviews] = useState<IReview[]>()
    const methods = useForm({
      mode: "all",
      defaultValues: {
        fields: {},
        filters: {},
      },
    });

    const meds = {
      //#region getProduct
      async getProductById(productId: string) {
        try {
          const { data }: AxiosResponse<IResponse<IProduct, "product">> =
            await onCRUD({
              Name: `products/${productId}`,
            }).Get({
            });

          if (data?.product) {
            ss.setJointData({ Product: data?.product });
            methods.reset({
              fields: data?.product,
              filters: {},
            });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

       //#region getReviews
      async getReviews(productId: string) {
        try {
          const { data }: AxiosResponse<IResponse<IReview[], "reviews">> =
            await onCRUD({
              Name: `reviews/${productId}`,
            }).Get({
            });

          if (data?.reviews) {
            setReviews(data.reviews)
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      //#region addToCart
      async addToCart(productId: string, quantity?: number) {
        try {
          await onCRUD({
          Name: "cart/add-to-cart",
          }).Post({
            payload: {
              productId: productId,
              quantity: quantity ?? 1,
            },
          });

          Toast.show({
            type: "success",
            text1: "Added to cart!",
          });
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

      //#region onPutCart
      async onPutCart({productId, quantity}:{productId: string, quantity: number}) {
        try {
          await onCRUD({
            Name: "cart/update-cart",
          }).Get({
            payload: {productId: productId, quantity: quantity ?? 1},
          });
          
          await this.onGetCart();

        } catch (error) {
          onError({ error });
        }
      },
      //#endregion
    };

    //#region LifeCycle
    const params = useLocalSearchParams<any>();
    const { productId } = params;

    useEffect(() => {
      ss.setJointData({ Product: undefined });
      if (productId) {
        meds.getProductById(productId);
        meds.getReviews(productId)
      }
    }, []);

    // useEffect(() => {}, []);

    // useEffect(() => {
    //   ss.resetJoint();
    //   ss.resetPick();
    //   //   ss.setPickData({ Department: {} });
    // }, []);

    //#endregion

    return { reviews, meds, methods, ss };
  },
});
