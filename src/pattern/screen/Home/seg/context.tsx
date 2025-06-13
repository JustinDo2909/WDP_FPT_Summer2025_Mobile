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
