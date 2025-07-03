import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { RText } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";

export function VoucherCard({
  voucher,
  onUse,
  buttonText = "Use Now"
}: {
  voucher: IVoucher;
  onUse: (v: IVoucher) => void;
  buttonText?: string;
}) {
  return (
    <View style={[styles.card, styles.limitedCard]}>
      <View style={styles.leftCol}>
        {/* You can conditionally render this if needed */}
        <View style={styles.limitedTag}>
          <RText style={styles.limitedText}>Limited quantity</RText>
        </View>
        <View style={styles.voucherIconBox}>
          <RText style={styles.voucherIconText}>
            {voucher.type === "AMOUNT"
              ? `${voucher.discount_value}K`
              : `${voucher.discount_value}%`}
          </RText>
          <RText style={styles.voucherIconText}>Off</RText>
        </View>
      </View>
      <View style={styles.middleCol}>
        <RText style={styles.voucherTitle}>{formatDiscount(voucher)}</RText>
      </View>
      <View style={styles.rightCol}>
        <TouchableOpacity
          style={styles.useNowBtn}
          onPress={() => onUse(voucher)}
        >
          <RText style={styles.useNowText}>{buttonText}</RText>
        </TouchableOpacity>
        <TouchableOpacity>
          <RText style={styles.termsText}>Terms &gt;</RText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const formatDiscount = (voucher: IVoucher) => {
  return voucher.type === "PERCENT"
    ? `${voucher.discount_value}% Off `
    : `${formatPrice(voucher.discount_value)} Off`;
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 12,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f5f5f5",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  limitedCard: { borderColor: "#f2f2f2" },
  leftCol: { alignItems: "center", marginRight: 12, width: 80 },
  voucherIconBox: {
    backgroundColor: "#F23059",
    borderRadius: 8,
    padding: 10,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  voucherIconText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  limitedTag: {
    backgroundColor: "#FFD6E0",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  limitedText: { color: "#F23059", fontWeight: "bold", fontSize: 12 },
  middleCol: { flex: 1, justifyContent: "center" },
  voucherTitle: { fontWeight: "bold", fontSize: 17, color: "#222" },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 80,
  },
  useNowBtn: {
    backgroundColor: "#fff0f3",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#F23059",
    marginBottom: 8,
    marginTop: 16,
  },
  useNowText: { color: "#F23059", fontWeight: "bold", fontSize: 15 },
  termsText: { color: "#888", fontSize: 13, marginTop: 2 },
});
