import { Loading } from "@/src/libs/by/Loading";
import { MyApp } from "@/src/process/context";
import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ToastConf } from "./ToastConf";

export function AppProvider({
  children,
}: PropsWithChildren<{
  env?: any;
  color?: any;
}>) {
  return (
    <MyApp.Provider>
          <MyApp.Consumer>
            {({ loaded }) => {
              return (
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  {!loaded ? <Loading /> : children}
                </KeyboardAvoidingView>
              );
            }}
          </MyApp.Consumer>
          <ToastConf />
          <Loading />
    </MyApp.Provider>
  );
}
