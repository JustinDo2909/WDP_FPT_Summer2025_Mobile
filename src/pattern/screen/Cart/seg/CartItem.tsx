import { ICartLineItem } from "@/assets/types/cart";
import { Button, Card, Column, Row, RText } from "@/src/libs/by";
import { calculateDiscount } from "@/src/libs/share/calcDiscount";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, View } from "react-native";

export function CartItem({ item, onQuantityChange, onRemove }: {
  item: ICartLineItem;
  onQuantityChange: (id: number, newQty: number) => void;
  onRemove: (id: number) => void;
}) {
  const { product, quantity } = item;
  const inStock = product.total_stock ?? 0;
  return (
    <Card style={styles.card}>
      <Row style={{ alignItems: 'flex-start', gap: 12 }}>
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
          <Row style={{ alignItems: 'center', gap: 8, marginTop: 4 }}>
            <Button _type="Icon" _set={{ onPress: () => onQuantityChange(item.id, Math.max(1, quantity - 1)), style: styles.qtyBtn, disabled: quantity <= 1 }}>
              <RText style={styles.qtyBtnText}>-</RText>
            </Button>
            <RText style={styles.qty}>{quantity}</RText>
            <Button _type="Icon" _set={{ onPress: () => onQuantityChange(item.id, Math.min(inStock, quantity + 1)), style: styles.qtyBtn, disabled: quantity >= inStock }}>
              <RText style={styles.qtyBtnText}>+</RText>
            </Button>
            <Button _type="Icon" _set={{ onPress: () => onRemove(item.id), style: styles.removeBtn }}>
              <Ionicons name="trash-outline" size={20} color="#F23059" />
            </Button>
          </Row>
        </Column>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  image: { width: 72, height: 72, borderRadius: 8, backgroundColor: '#f3f3f3' },
  title: { fontWeight: 'bold', fontSize: 18 },
  desc: { color: '#888', fontSize: 13 },
  discountBadge: { backgroundColor: '#8b5cf6', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  price: { color: '#F23059', fontWeight: 'bold', fontSize: 18 },
  oldPrice: { color: '#bbb', textDecorationLine: 'line-through', fontSize: 14, marginLeft: 6 },
  qty: { color: '#666', fontSize: 15, marginHorizontal: 8 },
  qtyBtn: { backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  qtyBtnText: { fontSize: 18, color: '#F23059', fontWeight: 'bold' },
  removeBtn: { marginLeft: 8, backgroundColor: '#fff' },
});
