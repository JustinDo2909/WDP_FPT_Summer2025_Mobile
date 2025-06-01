import { Cover, RText } from "@/src/libs/by/Clone";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export function ToastConf() {

  return (
    <Toast
      config={{
        success: (props) => (
          <BaseToast
            {...props}
            style={{
              width: "100%",
              borderLeftWidth: 0,
              backgroundColor: "#DDF8E7",
              paddingVertical: 12,
              paddingHorizontal: 16,
              gap: 12,
            }}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            text1Style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#1A8054",
            }}
            renderLeadingIcon={() => (
              <Cover style={{ margin: "auto" }}>
                <RText>Success</RText>
              </Cover>
            )}
          />
        ),
        warning: (props) => (
          <ErrorToast
            {...props}
            style={{
              width: "100%",
              borderLeftWidth: 0,
              backgroundColor: "#FCF5E3",
              paddingVertical: 12,
              paddingHorizontal: 16,
              gap: 12,
            }}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            text1Style={{
              fontSize: 14,
              color: "#BB8711",
              fontWeight: "400",
            }}
            renderLeadingIcon={() => (
              <Cover style={{ margin: "auto" }}>
                <RText>Waring</RText>
              </Cover>
            )}
          />
        ),
        error: (props) => (
          <ErrorToast
            {...props}
            style={{
              width: "100%",
              borderLeftWidth: 0,
              backgroundColor: "#FBE4EB",
              paddingVertical: 12,
              paddingHorizontal: 16,
              gap: 12,
            }}
            contentContainerStyle={{ paddingHorizontal: 0 }}
            text1Style={{
              fontSize: 14,
              color: "#E51743",
              fontWeight: "400",
            }}
            renderLeadingIcon={() => (
              <Cover style={{ margin: "auto" }}>
                <RText>Error</RText>
              </Cover>
            )}
          />
        ),
      }}
    />
  );
}
