import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { RText } from "@/src/libs/by";
import Context from "./seg/context";
import { VoucherCard } from "../../share/VoucherCard";

export function Vouchers() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ vouchers, isLoading, meds }) => (
          <View style={styles.container}>
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.topBtn}>
                <RText style={styles.topBtnText}>Enter voucher code</RText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topBtn}>
                <RText style={styles.topBtnText}>Find more vouchers</RText>
              </TouchableOpacity>
            </View>
            <FlatList
              data={vouchers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <VoucherCard
                  voucher={item}
                  onUse={(v) => meds.onUseVoucher(v)}
                />
              )}
              contentContainerStyle={{ paddingBottom: 24 }}
              refreshing={isLoading}
              onRefresh={meds.onGetVouchers}
            />
          </View>
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    gap: 12,
  },
  topBtn: {
    flex: 1,
    backgroundColor: "#fafafa",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#eee",
  },
  topBtnText: { color: "#222", fontWeight: "bold", fontSize: 16 },
});
