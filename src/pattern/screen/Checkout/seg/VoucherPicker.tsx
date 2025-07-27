import React, { useMemo } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { RText } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { VoucherCard } from "@/src/pattern/share/VoucherCard";
import context from "./context";

export function VoucherPicker({ vouchers, onSelect, selectedId, cartItems }: {
  vouchers: IVoucher[];
  onSelect: (voucher: IVoucher) => void;
  selectedId?: string;
  cartItems: ICartLineItem[]
}) {

  const {meds} = context.useCtx()

  const cartProductIds = useMemo(
    () => cartItems.map(item => item.product_id),
    [cartItems]
  );

  const sortedVouchers = useMemo(() => {
    if (!vouchers) return [];
    return vouchers
      .map(voucher => {
        const applicable = Array.isArray(voucher.voucherProducts) &&
          voucher.voucherProducts.some(vp => cartProductIds.includes(vp.product.id));
        const savings = applicable ? meds.calculateVoucherSavings(voucher, cartItems) : 0;
        return { id : voucher.id, voucher, applicable, savings };
      })
      .sort((a, b) => {
        if (a.applicable !== b.applicable) return a.applicable ? -1 : 1;
        return b.savings - a.savings; // Sort by savings in descending order
      });
  }, [vouchers, cartProductIds, cartItems]);
  return (
    <View style={styles.container}>
      <FlatList
        data={sortedVouchers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <VoucherCard applicable={item.applicable} onUse={onSelect} voucher={item.voucher} buttonText="Apply" savings={item.savings}/>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f0f0', // Very light pink background for the screen
  },
  card: {
    marginBottom: 14, // Slightly more space between cards
    borderRadius: 12, // More rounded corners for a softer look
    padding: 18, // Increased padding inside the card
    backgroundColor: '#fff0f5', // Blush pink background
    shadowColor: '#ff69b4', // Pink shadow for consistency
    shadowOffset: { width: 0, height: 4 }, // More prominent shadow
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ffc0cb', // Light pink border
    overflow: 'hidden',
    position: 'relative', // Necessary for absolute positioning of the icon
  },
  cardSelected: {
    borderColor: '#ff1493', // Deep pink border when selected
    borderWidth: 3, // Thicker border to highlight selection
    backgroundColor: '#ffe0f0', // Slightly darker pink for selected background
  },
  cardUnselected: {
    borderColor: '#ffc0cb', // Standard light pink border
  },
  cardContent: {
    flex: 1,
    paddingLeft: 40, // Make space for the icon on the left
  },
  iconContainer: {
    position: 'absolute',
    top: 15, // Adjust vertical position
    left: 15, // Adjust horizontal position
    zIndex: 1, // Ensure icon is on top
  },
  hotSaleIcon: {
    width: 35, // Slightly larger icon
    height: 35,
    resizeMode: 'contain',
  },
  cardDiscountText: {
    fontWeight: 'bold',
    fontSize: 24, // Larger font for the main discount
    color: '#c71585', // Medium violet-red
    marginBottom: 8,
  },
  cardRedeemedText: {
    color: '#e0115f', // Ruby pink for redeemed status
    fontSize: 13,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  cardDescription: {
    color: '#6a0dad', // Darker purple-pink for readability
    fontSize: 15,
    marginTop: 5,
    lineHeight: 20, // Improve readability for longer descriptions
  },
  divider: {
    height: 1,
    backgroundColor: '#ffb6c1', // Light pink divider
    marginVertical: 12,
  },
});

const formatDiscount = (voucher: IVoucher) => {
  return voucher.type === "PERCENT"
    ? `GIẢM ${voucher.discount_value}% `
    : `GIẢM ${formatPrice(voucher.discount_value)}`;
};