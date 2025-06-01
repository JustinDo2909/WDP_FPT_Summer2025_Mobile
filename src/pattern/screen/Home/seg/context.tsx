import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
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
      //#region
      //#endregion
    };

    //#region LifeCycle

    useEffect(() => {}, []);

    useEffect(() => {
      ss.resetJoint();
      ss.resetPick();
      //   ss.setPickData({ Department: {} });
    }, []);

    //#endregion

    return { meds, methods, ss };
  },
});
