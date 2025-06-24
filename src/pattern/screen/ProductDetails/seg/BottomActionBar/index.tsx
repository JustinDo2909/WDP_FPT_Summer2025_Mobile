import { Button, Row, RText, Wrap } from "@/src/libs/by";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { formatPrice } from '@/src/libs/share/formatPrice';
import React from "react";
import context from "../context";

export const BottomActionBar = ({product}:{product: IProduct}) => {
  const { ss, meds } = context.useCtx();
  const { navigate } = useCustomRouter();
  const [quantity, setQuantity] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const inStock = product.total_stock ?? 0;

  const handleAddToCart = async () => {
    if (quantity > inStock) {
      alert("Not enough stock");
      return;
    }
    setLoading(true);
    await meds.addToCart(product.id, quantity);
    await meds.onGetCart();
    ss.setJointData({ cartSpin: true });
    setLoading(false);
    // Optionally show a toast here
  };

  const handleBuyNow = async () => {
    if (quantity > inStock) {
      alert("Not enough stock");
      return;
    }
    setLoading(true);
    await meds.addToCart(product.id, quantity);
    await meds.onGetCart();
    ss.setJointData({ cartSpin: true });
    setLoading(false);
    navigate({ pathSegments: ["Cart"] });
  };

  const handleChangeQty = (delta: number) => {
    setQuantity(q => {
      let next = q + delta;
      if (next < 1) next = 1;
      if (next > inStock) next = inStock;
      return next;
    });
  };

  return (
    <Row style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#eee',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
    }}>
      <RText style={{ marginLeft: 12, fontWeight: 'bold', fontSize: 20 }}>{formatPrice(product.sale_price ?? product.price)}</RText>

      {/* Quantity Selector */}
      <Row style={{ alignItems: 'center', marginHorizontal: 12 }}>
        <Button _type="Icon" _set={{ onPress: () => handleChangeQty(-1), style: { backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 8, paddingBottom: 4 } }}>
          <RText style={{ fontSize: 22, color: '#B80060' }}>-</RText>
        </Button>
        <RText style={{ fontWeight: 'bold', fontSize: 18, marginHorizontal: 8 }}>{quantity}</RText>
        <Button _type="Icon" _set={{ onPress: () => handleChangeQty(1), style: { backgroundColor: '#eee', borderRadius: 8, paddingHorizontal: 8 } }}>
          <RText style={{ fontSize: 22, color: '#B80060' }}>+</RText>
        </Button>
      </Row>

      <Wrap style={{ flex: 1, marginRight: 4, justifyContent: 'flex-end', flexDirection: 'row', gap: 8 }}>
        <Button _kind={"Normal"} _type={"Fill"} _set={{ onPress: handleAddToCart, style: { backgroundColor: '#F3F3F3', paddingVertical: 6, marginRight: 8, height: 64 }, disabled: loading || inStock === 0 }}>
          <RText style={{ color: '#B80060', fontWeight: 'bold', fontSize: 16 }}>{loading ? "Adding..." : "Add to cart"}</RText>
        </Button>
        <Button _kind={"Oke"} _type={"Fill"} _set={{ onPress: handleBuyNow, style: { backgroundColor: '#B80060', paddingVertical: 6,  height: 64 }, disabled: loading || inStock === 0 }}>
          <RText style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>{loading ? "Buying..." : "Buy now"}</RText>
        </Button>
      </Wrap>
    </Row>
  );
}