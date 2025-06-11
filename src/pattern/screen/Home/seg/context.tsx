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
      async onGetProduct() {
        try {
          const { data: data }: AxiosResponse<any, AxiosResponse<string>> = await onCRUD({
            Name: "products/1",
          }).Get({
            payload: {},
          });

          if (data?.Data) {
            ss.setJointData({ Product: data?.Data });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion
    };

    //#region LifeCycle



    useEffect(() => {
      meds.onGetProduct();
    }, []);

    //#endregion

    return { meds, methods, ss };
  },
});
