import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { delay } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default GenCtx({
  useLogic() {
    
    const ss = sStore();
    type IForm = {
      fields: {
        reviewMessage: string;
      };
    };

    const router = useRouter()
    const {navigate} = useCustomRouter()
    const [product, setProduct] = useState<IProduct>()
    const [reviewValue, setReviewValue] = useState(5)
    const [reviewMessage, setReviewMessage] = useState("")
    const [alreadyReviewed, setAlreadyReviewed] = useState(false)

    const [loading, setLoading] = useState(true);
    const methods = useForm<IForm>({
       mode: "onChange",
      reValidateMode: "onSubmit",
      defaultValues: {
        fields: {},
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
            setProduct(data.product)
            setLoading(false)

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
            const user = ss.Auth.User
            if (data.reviews.some((r) => r.user_id === user?.id)) {
              ss.setPickData({ NavHeading: "History Purchase" });
              router.back()
              Toast.show({
                text1: "Product is already reviewd",
              });
              setLoading(false)
            } else {
              ss.setPickData({ NavHeading: "Review a Product" });
              meds.getProductById(productId);
            }

          }
        } catch (error) {
          onError({ error });
        } 
      },
      //#endregion
     
      async addReview({ fields }: IForm) {
        try {
          setLoading(true);
          await onCRUD({ Name: "reviews/add" }).Post({
            payload: {
              productId,
              reviewValue,
              reviewMessage: fields.reviewMessage,
            },
          });
          Toast.show({ type: "success", text1: "Review submitted!" });
          router.back()
        } catch (error) {
          onError({ error });
          Toast.show({ type: "error", text1: "Error", text2: "Could not submit review." });
        } finally {
          setLoading(false);
        }
      },
      //#endregion
    };

     //#region LifeCycle
        const params = useLocalSearchParams<any>();
        const { productId } = params;
    
        useEffect(() => {
          setLoading(true)
          if (productId) {
            meds.getReviews(productId)
          }
        }, []);
    //#endRegion  

    return {
      meds,
      methods,
      loading,
      alreadyReviewed,
      product,
      reviewMessage,
      reviewValue,
      setReviewMessage,
      setReviewValue
    };
  },
});
