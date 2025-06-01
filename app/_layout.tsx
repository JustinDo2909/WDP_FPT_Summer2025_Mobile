import { AppProvider, ErrorBoundary } from "@/src/pattern/core";
import "expo-dev-client";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <AppProvider>
              <Slot />
            </AppProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
