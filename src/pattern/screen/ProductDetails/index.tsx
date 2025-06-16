import React from "react";
import { ProductGallery } from "./seg/ProductGallery";
import { ProductInfo } from "./seg/ProductInfo";
import { ProductReview } from "./seg/ProductReview";
import { BottomActionBar } from "./seg/BottomActionBar";
import { Container } from "@/src/libs/by";
import { ScrollView, StyleSheet } from "react-native";
import Context from "./seg/context";

// --- ProductGallery ---

// --- ProductInfo ---

// --- ProductReview ---

// --- BottomActionBar ---

export function ProductDetails() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const product = ss.Joint.Product;
          return (
            <Container style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                {product &&<>
                <ProductGallery product={product} />
                <ProductInfo product={product} />
                <ProductReview product={product} />
                </>
                }
              </ScrollView>
              {product && <BottomActionBar product={product} />}
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

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
