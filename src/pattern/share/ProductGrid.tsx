// components/ProductGrid.tsx

import { Block } from "@/src/libs/by";
import React from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_MARGIN = 16; // 8px left + 8px right from itemWrapper
const CARD_WIDTH = SCREEN_WIDTH / 2 - CARD_MARGIN;

interface ProductGridProps {
  products: IProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <Block style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          //   <View style={styles.itemWrapper}>
          <ProductCard product={item} cardWidth={CARD_WIDTH} />
          //   </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      />
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 0,
  },
  content: {
    paddingBottom: 32,
    paddingVertical: 16,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 8,
  },
  itemWrapper: {
    paddingHorizontal: 8,
    width: CARD_WIDTH,
  },
});
