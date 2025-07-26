import { useFonts } from "expo-font";
// import * as Updates from "expo-updates";
import { sStore } from "@/src/stores";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { GenCtx } from "../hooks";
import { eventBus } from "../utils";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import Toast from "react-native-toast-message";
export const MyApp = GenCtx({
  useLogic() {
    const ss = sStore();

    const [loaded] = useFonts({
      "Inter-Regular": require("../../../assets/fonts/Inter-Regular.otf"),
      "Inter-SemiBold": require("../../../assets/fonts/Inter-SemiBold.otf"),
      "Inter-Italic": require("../../../assets/fonts/Inter-Italic.otf"),
      "Inter-Bold": require("../../../assets/fonts/Inter-Bold.otf"),
    });

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const listener = () => {
        ss.resetAuth();
        Toast.show({
          type: "error",
          text1: "Session expired",
          text2: "Please log in again.",
        });
        router.push("/auth")      };
      eventBus.on("logout", listener);

      return () => {
        eventBus.off("logout");
      };
    }, []);

    return { loaded, progress, isLoading, setProgress, setIsLoading };
  },
});
