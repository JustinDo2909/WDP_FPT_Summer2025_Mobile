import { Button, RText } from "@/src/libs/by";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";
import { AddAddressForm } from "./seg/AddAddressForm";
import { AddressPicker } from "./seg/AddressPicker";
import { CartItems } from "./seg/CartItems";
import Context from "./seg/context";
import { OrderSummary } from "./seg/OrderSummary";
import { VoucherPicker } from "./seg/VoucherPicker";
import { init } from "@/src/process/constants";
import { formatPrice } from "@/src/libs/share/formatPrice";

export function Checkout() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({
          cartItems,
          addresses,
          selectedAddress,
          setSelectedAddress,
          showAddressPicker,
          setShowAddressPicker,
          showAddAddress,
          setShowAddAddress,
          vouchers,
          selectedVoucher,
          setSelectedVoucher,
          showVoucherPicker,
          setShowVoucherPicker,
          subtotal,
          shippingFee,
          total,
          discount,
          isLoading,
          meds,
        }) => (
          <View style={styles.container}>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={
                <>
                  {/* Shipping Card */}
                  <View style={styles.cardRow}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Ionicons
                        name="car-outline"
                        size={28}
                        color="#3A3A3A"
                        style={{ marginRight: 12 }}
                      />
                      <View>
                        <RText style={styles.cardTitle}>Shipping</RText>
                        <RText style={styles.cardSubtitle}>
                          {selectedAddress
                            ? `${selectedAddress.phone}, ${selectedAddress.address}, ${selectedAddress.city}`
                            : "Add shipping address"}
                        </RText>
                      </View>
                    </View>
                    <Button
                      _type="Fill"
                      _set={{
                        onPress: () => setShowAddressPicker(true),
                        style: styles.addBtn,
                      }}
                    >
                      <RText style={styles.addBtnText}>Add</RText>
                    </Button>
                  </View>
                </>
              }
              renderItem={({ item }) => <CartItems items={[item]} />}
              ListFooterComponent={
                <>
                  {/* Voucher Card */}
                  <View style={styles.cardRow}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Ionicons
                        name="pricetag-outline"
                        size={28}
                        color="#3A3A3A"
                        style={{ marginRight: 12 }}
                      />
                      <View>
                        <RText style={styles.cardTitle}>Voucher</RText>
                        <RText style={styles.cardSubtitle}>
                          {selectedVoucher
                            ? `${formatDiscount(selectedVoucher)}`
                            : "Add Voucher"}
                        </RText>
                      </View>
                    </View>
                    <Button
                      _type="Fill"
                      _set={{
                        onPress: () => setShowVoucherPicker(true),
                        style: styles.addBtn,
                      }}
                    >
                      <RText style={styles.addBtnText}>Add</RText>
                    </Button>
                  </View>
                  {/* Order Summary */}
                  <OrderSummary
                    subtotal={subtotal}
                    voucherDiscount={discount}
                    shippingFee={shippingFee}
                    total={total}
                  />
                </>
              }
              contentContainerStyle={styles.scrollContent}
            />
            {/* Sticky Bar */}
            <View style={styles.stickyBar}>
              <RText style={styles.stickyTotal}>
                Total: {total.toLocaleString()} VND
              </RText>
              <Button
                _type="Fill"
                _set={{
                  onPress: meds.onBuyNow,
                  style: styles.buyBtn,
                  disabled: isLoading || !shippingFee,
                }}
              >
                <RText style={styles.buyBtnText}>
                  {isLoading ? "Processing..." : "Buy now"}
                </RText>
              </Button>
            </View>
            {/* Address Picker Modal */}
            <Modal visible={showAddressPicker} animationType="slide">
              <AddressPicker
                addresses={addresses}
                onSelect={(addr) => {
                  setSelectedAddress(addr);
                  setShowAddressPicker(false);
                }}
                onAddNew={() => {
                  setShowAddressPicker(false);
                  setShowAddAddress(true);
                }}
                selectedId={selectedAddress?.id}
              />
              <Button
                _type="Stroke"
                _set={{
                  onPress: () => setShowAddressPicker(false),
                  style: { margin: 16 },
                }}
              >
                <RText>Close</RText>
              </Button>
            </Modal>
            {/* Add Address Modal */}
            <Modal visible={showAddAddress} animationType="slide">
              <AddAddressForm
                onSave={(addr) => {
                  setShowAddAddress(false);
                  meds.onGetAddresses;
                }}
              />
              <Button
                _type="Stroke"
                _set={{
                  onPress: () => setShowAddAddress(false),
                  style: { margin: 16 },
                }}
              >
                <RText>Close</RText>
              </Button>
            </Modal>
            {/* Voucher Picker Modal */}
            <Modal visible={showVoucherPicker} animationType="slide">
              <VoucherPicker
                orderTotal={subtotal}
                cartItems={cartItems}
                vouchers={vouchers}
                onSelect={(voucher) => {
                  setSelectedVoucher(voucher);
                  setShowVoucherPicker(false);
                }}
                selectedId={selectedVoucher?.id}
              />
              <Button
                _type="Stroke"
                _set={{
                  onPress: () => setShowVoucherPicker(false),
                  style: { margin: 16 },
                }}
              >
                <RText>Close</RText>
              </Button>
            </Modal>
          </View>
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContent: { paddingBottom: 30 },
  sectionBtn: { margin: 16, borderRadius: 8, padding: 12 },
  sectionBtnText: { fontWeight: "bold", fontSize: 16 },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: "#222" },
  cardSubtitle: { color: "#888", fontSize: 14, marginTop: 2 },
  addBtn: {
    backgroundColor: init.Color.PrimaryBrand, 
    borderRadius: 8, 
    paddingVertical: 8, 
    paddingHorizontal: 24,
    minWidth: 80,
    height: 40,
    alignItems: 'center',
  },
  addBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  stickyBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  stickyTotal: { fontWeight: "bold", fontSize: 18, color: "#F23059" },
  buyBtn: {
    backgroundColor: "#F23059",
    borderRadius: 8,
    paddingVertical: 8,
    height: 40,
    paddingHorizontal: 32,
  },
  buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});

const formatDiscount = (voucher: IVoucher) => {
  return voucher.voucherTemplate.type === "PERCENT"
    ? `${voucher.voucherTemplate.discount_value}% Off `
    : `${formatPrice(voucher.voucherTemplate.discount_value)} Off`;
};
