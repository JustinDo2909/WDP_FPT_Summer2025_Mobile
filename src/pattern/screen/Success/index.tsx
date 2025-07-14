import React from "react";
import { View, StyleSheet } from "react-native";
import { RText, Button } from "@/src/libs/by";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";

export function Success() {
  const {navigate} = useCustomRouter()

  return (
    <View style={styles.container}>
      <RText style={styles.title}>Order placed successfully!</RText>
      <RText style={styles.subtitle}>Thank you for your purchase. Your order is being processed.</RText>
      <Button
        _type="Fill"
        _set={{
          onPress: () => navigate({pathSegments: ["Home"]}),
          style: styles.button,
        }}
      >
        <RText style={styles.buttonText}>Back to Home</RText>
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
    color: "#27ae60",
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
    backgroundColor: "#27ae60",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
