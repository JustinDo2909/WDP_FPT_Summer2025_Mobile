import { RText } from "@/src/libs/by";
import React from "react";
import { StyleSheet, View } from "react-native";

export function OrderSummary({ subtotal, discount, shippingFee, total, voucherDiscount }: {
  subtotal: number;
  discount?: number;
  voucherDiscount?: number;
  shippingFee: number | null;
  total: number;
}) {
  return (
    <View style={styles.container}>
      <RText style={styles.title}>Order Summary</RText>

      <View style={styles.row}><RText>Subtotal</RText><RText>{subtotal.toLocaleString()} VND</RText></View>
      {(discount && discount !== 0) ? <View style={styles.row}><RText>Discount</RText><RText>-{discount.toLocaleString()} VND</RText></View> : ""}
      {(voucherDiscount && voucherDiscount !== 0) ? <View style={styles.row}><RText>Voucher</RText><RText>-{voucherDiscount.toLocaleString()} VND</RText></View> : ""}
      <View style={styles.row}><RText>Shipping</RText><RText>{shippingFee !== null ? shippingFee.toLocaleString() + ' VND' : '--'}</RText></View>
      <View style={styles.totalRow}><RText style={styles.totalLabel}>Total</RText><RText style={styles.total}>{total.toLocaleString()} VND</RText></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 12, margin: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, marginBottom: 4 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  totalLabel: { fontWeight: 'bold', fontSize: 18 },
  total: {fontSize: 18 },
  title: { fontSize: 20, marginVertical: 8,  fontWeight: 'bold' },
});
