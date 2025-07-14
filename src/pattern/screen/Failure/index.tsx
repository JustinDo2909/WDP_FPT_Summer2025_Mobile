import { Button, RText } from "@/src/libs/by";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export function Failure() {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <RText style={styles.title}>Checkout Failed</RText>
      <RText style={styles.subtitle}>There was an error processing your order. Please try again or contact support.</RText>
      <Button
        _type="Fill"
        _set={{
          onPress: () => router?.back(),
          style: styles.button,
        }}
      >
        <RText style={styles.buttonText}>Try Again</RText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F23059",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    height: 40,
    paddingHorizontal: 32,
    backgroundColor: "#F23059",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
