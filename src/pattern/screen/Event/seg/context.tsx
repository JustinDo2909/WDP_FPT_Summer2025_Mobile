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
      //#region getEvents
      async onGetEvents() {
        try {
          const { data }: AxiosResponse<IEventsResponse<IEvent, "events">> =
            await onCRUD({
              Name: "events/get",
            }).Get({
              payload: {},
            });

          if (data?.events) {
            ss.setJointData({ Events: data?.events });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion
    };

    //#region LifeCycle

    useEffect(() => {
      ss.resetPick();
      ss.setPickData({ActiveTab: "Event"})
      meds.onGetEvents();
    }, []);

    //#endregion

    return { meds, methods, ss };
  },
});
