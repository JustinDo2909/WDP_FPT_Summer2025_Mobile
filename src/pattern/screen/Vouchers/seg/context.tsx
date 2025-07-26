import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const [vouchers, setVouchers] = useState<IVoucher[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { navigate} = useCustomRouter()

    const meds = {
      async onGetVouchers() {
        setIsLoading(true);
        try {
          const { data }: AxiosResponse<IResponse<IVoucher[], 'vouchers'>> = await onCRUD({ Name: "vouchers" }).Get({});
          if (data?.vouchers) {
            setVouchers(data.vouchers);
          }
        } catch (error) {
          onError({ error });
          Toast.show({ type: "error", text1: "Error", text2: "Could not load vouchers." });
        } finally {
          setIsLoading(false);
        }
      },
      onUseVoucher(voucher: IVoucher) {
        navigate({pathSegments: ['Home']})
      },
    };

    useEffect(() => {
      meds.onGetVouchers();
      ss.setPickData({ NavHeading: "Vouchers" });
    }, []);

    return { vouchers, isLoading, meds };
  },
});
