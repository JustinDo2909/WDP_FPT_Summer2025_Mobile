import { ICartLineItem } from "@/assets/types/cart";
import { Card, Column, Row, RText } from "@/src/libs/by";
import { calculateDiscount } from "@/src/libs/share/calcDiscount";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export function CartItem({ item, selected, onSelect }: {
  item: ICartLineItem;
  selected: boolean;
  onSelect: (id: number) => void;
}) {
  const { product, quantity } = item;
  return (
    <Card style={styles.card}>
      <Row style={{ alignItems: 'flex-start', gap: 12 }}>
        <TouchableOpacity onPress={() => onSelect(item.id)}>
          <Ionicons name={selected ? "checkbox" : "square-outline"} size={28} color={selected ? "#F23059" : "#bbb"} />
        </TouchableOpacity>
        <Image source={{ uri: product.image_url }} style={styles.image} />
        <Column style={{ flex: 1, gap: 4 }}>
          <RText style={styles.title}>{product.title}</RText>
          <RText style={styles.desc}>{product.description}</RText>
          <Row style={{ alignItems: 'center', gap: 8 }}>
            {product.sale_price && (
              <View style={styles.discountBadge}>
                <RText style={styles.discountText}>-{calculateDiscount(product.sale_price, product.price)}%</RText>
              </View>
            )}
            <RText style={styles.price}>{formatPrice(product.sale_price ?? product.price)}</RText>
            {product.sale_price && (
              <RText style={styles.oldPrice}>{formatPrice(product.price)}</RText>
            )}
          </Row>
          <RText style={styles.qty}>Qty: {quantity}</RText>
        </Column>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  image: { width: 72, height: 72, borderRadius: 8, backgroundColor: '#f3f3f3' },
  title: { fontWeight: 'bold', fontSize: 16 },
  desc: { color: '#888', fontSize: 13 },
  discountBadge: { backgroundColor: '#8b5cf6', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  price: { color: '#F23059', fontWeight: 'bold', fontSize: 18 },
  oldPrice: { color: '#bbb', textDecorationLine: 'line-through', fontSize: 14, marginLeft: 6 },
  qty: { color: '#666', fontSize: 13, marginTop: 4 },
});
