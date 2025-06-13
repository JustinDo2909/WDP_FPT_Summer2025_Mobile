import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
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
    };

    //#region LifeCycle
    const params = useLocalSearchParams<any>();
    const { productId } = params;

    useEffect(() => {
      ss.setJointData({ Product: undefined });
      if (productId) {
        meds.getProductById(productId);
      }
    }, []);

    // useEffect(() => {}, []);

    // useEffect(() => {
    //   ss.resetJoint();
    //   ss.resetPick();
    //   //   ss.setPickData({ Department: {} });
    // }, []);

    //#endregion

    return { meds, methods, ss };
  },
});
