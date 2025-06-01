import { eventEmitter } from "@/src/process/utils";
import { delay } from "lodash";
import { useEffect, useState } from "react";
import { Box, Core, RText } from "../Clone";

const root = "Loading";

export function Loading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleModalEvent = (data: boolean) => {
      setLoading(data);
    };

    eventEmitter.addListener(root, handleModalEvent);

    return () => {
      eventEmitter.removeAllListeners(root);
    };
  }, []);

  useEffect(() => {
    if (loading) {
      delay(function () {
        setLoading(false);
      }, 5000);
    }
  }, [loading]);

  if (!loading) return null;

  return (
    <Core
      id="Loading"
      style={{
        flex: 1,
        position: "absolute",
        backgroundColor: "white",
        top: 0,
        width: "100%",
        height: "100%",
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}>
      <Box>
        <RText>Tiến trình đang hoạt động...</RText>
      </Box>
    </Core>
  );
}
