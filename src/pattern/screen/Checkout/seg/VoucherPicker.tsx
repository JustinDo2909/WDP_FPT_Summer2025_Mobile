import React from "react";
import { FlatList, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { RText } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";

export function VoucherPicker({ vouchers, onSelect, selectedId }: {
  vouchers: IVoucher[];
  onSelect: (voucher: IVoucher) => void;
  selectedId?: string;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item)}
            style={[
              styles.card,
              item.id === selectedId ? styles.cardSelected : styles.cardUnselected
            ]}
            activeOpacity={0.7}
          >
            {/* Hot Sale Icon */}
            <View style={styles.iconContainer}>
              <Image
              source={require('@/assets/images/hot-sale.png')}
              style={styles.hotSaleIcon}
              />
            </View>

            <View style={styles.cardContent}>
              <RText style={styles.cardDiscountText}>{formatDiscount(item)}</RText>
              {item.redeemed_at && (
                <RText style={styles.cardRedeemedText}>Đã sử dụng vào: {item.redeemed_at}</RText>
              )}
              <View style={styles.divider} />
              {/* <RText style={styles.cardDescription}>
                {item.description || "Không có mô tả."}
              </RText> */}
            </View>
          </TouchableOpacity>
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