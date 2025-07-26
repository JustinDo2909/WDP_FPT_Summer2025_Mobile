import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const methods = useForm({
      mode: "all",
      defaultValues: {
        fields: {
          searchQuery: "",
        },
        filters: {},
      },
    });

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);

    const meds = {
      //#region getOrders
      async onGetOrders() {
        try {
          setLoading(true);
          const { data }: AxiosResponse<IPaginatedResponse<IOrder, "orders">> =
            await onCRUD({
              Name: "orders",
            }).Get({
              payload: {},
            });

          if (data?.orders) {
            setOrders(data.orders);
          }
        } catch (error) {
          onError({ error });
        } finally {
          setLoading(false);
        }
      },
      //#endregion

      //#region search and filter
      getFilteredOrders() {
        const searchQuery =
          methods.watch("fields.searchQuery")?.toLowerCase() || "";
        if (!searchQuery) return orders;

        return orders.filter((order) =>
          order.orderItems.some((item) =>
            item.title.toLowerCase().includes(searchQuery)
          )
        );
      },

      formatDate(dateString: string) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      },
      //#endregion
    };

    //#region LifeCycle
    useEffect(() => {
      ss.setPickData({ NavHeading: "History Purchase" });
      meds.onGetOrders();
    }, []);
    //#endregion

    return { meds, methods, ss, orders, loading };
  },
});
