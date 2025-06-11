import React from "react";
import { ProductGallery } from "./seg/ProductGallery";
import { ProductInfo } from "./seg/ProductInfo";
import { ProductReview } from "./seg/ProductReview";
import { BottomActionBar } from "./seg/BottomActionBar";
import { Container } from "@/src/libs/by";
import { ScrollView, StyleSheet } from "react-native";

// --- ProductGallery ---


// --- ProductInfo ---


// --- ProductReview ---


// --- BottomActionBar ---

export function ProductDetails() {
  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ProductGallery />
        <ProductInfo />
        <ProductReview />
      </ScrollView>
      <BottomActionBar />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 0,
    paddingVertical: 0,
    },
    scrollContent: {
    paddingBottom: 100, // Space for bottom bar
  },
});

