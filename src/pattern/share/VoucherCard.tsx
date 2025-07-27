import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { RText, Wrap } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";
import context from "../screen/Checkout/seg/context";

export function VoucherCard({
  voucher,
  onUse,
  buttonText = "Use Now",
  applicable,
  savings
}: {
  voucher: IVoucher;
  onUse: (v: IVoucher) => void;
  buttonText?: string;
  applicable?: boolean;
  savings?: number;
}) {
  const isRedeemed = voucher.redeemed;
  const {meds} = context.useCtx()
  const expiry = new Date(new Date(voucher.created_at).getTime() + 2 * 24 * 60 * 60 * 1000);
  const expiryDate = expiry.toLocaleDateString("vi-VN");
  return (
    <View
      style={[
        styles.card,
        styles.limitedCard,
        (isRedeemed || !applicable) && styles.disabledCard,
      ]}
    >
      <View style={styles.leftCol}>
        {!isRedeemed && applicable && (
          <View style={styles.limitedTag}>
            <RText style={styles.limitedText}>Limited quantity</RText>
          </View>
        )}
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
        <RText style={styles.voucherTitle}>Get {formatDiscount(voucher)}</RText>
       
       {buttonText != "Use Now" && <RText style={styles.savingsText}>
          {applicable
            ? `Save ${formatPrice(savings)}`
            : "Cannot apply for product"}
        </RText>
        }

        {(voucher.voucherProducts && voucher.voucherProducts.length > 0) && (
          <Wrap className="mt-2 text-xs text-gray-600">
            <RText>Applicable for:&nbsp;
            {voucher.voucherProducts.map((vp, index) => (
              <React.Fragment key={vp.product.id}>
                {/* <Link
                  href={`/products/${vp.product.id}`}
                  className="text-blue-600 hover:underline"
                > */}
                  {vp.product.title}
                {/* </Link> */}
                {index < voucher.voucherProducts.length - 1 && ", "}
              </React.Fragment>
              
            ))}
            </RText>
          </Wrap>
        )}
        
        <RText style={styles.expiryText}>Valid until {expiryDate}</RText>
      </View>
      <View style={styles.rightCol}>
        <TouchableOpacity
          style={[
            styles.useNowBtn,
            (isRedeemed || !applicable) && styles.disabledBtn,
          ]}
          onPress={() => {
            if (!isRedeemed && applicable) onUse(voucher);
          }}
          disabled={isRedeemed || !applicable}
        >
          {isRedeemed || !applicable ? (
            <RText style={styles.disabledText}>{buttonText}</RText>
          ) : (
            <RText style={styles.useNowText}>{buttonText}</RText>
          )}
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
    ? `${voucher.discount_value}% OFF`
    : `${formatPrice(voucher.discount_value)} OFF`;
}

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
  disabledCard: { opacity: 0.5 },
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
  savingsText: { fontSize: 14, color: "#F23059", marginTop: 4 },
  expiryText: { fontSize: 12, color: "#999", marginTop: 2 },
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
  disabledBtn: {
    backgroundColor: "#f2f2f2",
    borderColor: "#ccc",
  },
  useNowText: { color: "#F23059", fontWeight: "bold", fontSize: 15 },
  disabledText: { color: "#888", fontWeight: "bold", fontSize: 15 },
  termsText: { color: "#888", fontSize: 13, marginTop: 2 },
});
