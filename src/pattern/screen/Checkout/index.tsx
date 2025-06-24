import { Button, RText } from "@/src/libs/by";
import React from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";
import { AddAddressForm } from "./seg/AddAddressForm";
import { AddressPicker } from "./seg/AddressPicker";
import { CartItems } from "./seg/CartItems";
import Context from "./seg/context";
import { OrderSummary } from "./seg/OrderSummary";
import { VoucherPicker } from "./seg/VoucherPicker";

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
          discount,
          shippingFee,
          total,
          isLoading,
          handleBuyNow,
          fetchAddresses,
        }) => (
          <View style={styles.container}>
            <FlatList
              data={cartItems}
              keyExtractor={item => item.id.toString()}
              ListHeaderComponent={
                <>
                  {/* Address Picker */}
                  <Button _type="Stroke" _set={{ onPress: () => setShowAddressPicker(true), style: styles.sectionBtn }}>
                    <RText style={styles.sectionBtnText}>
                      {selectedAddress ? `${selectedAddress.fullname}, ${selectedAddress.address}, ${selectedAddress.city}` : "Choose shipping address"}
                    </RText>
                  </Button>
                </>
              }
              renderItem={({ item }) => (
                <CartItems items={[item]} />
              )}
              ListFooterComponent={
                <>
                  {/* Voucher Picker */}
                  <Button _type="Stroke" _set={{ onPress: () => setShowVoucherPicker(true), style: styles.sectionBtn }}>
                    <RText style={styles.sectionBtnText}>
                      {selectedVoucher ? `${selectedVoucher.title} - ${selectedVoucher.amount} VND` : "Select voucher"}
                    </RText>
                  </Button>
                  {/* Order Summary */}
                  <OrderSummary subtotal={subtotal} discount={discount} shippingFee={shippingFee} total={total} />
                  {/* <View style={{ height: 120 }} /> */}
                </>
              }
              contentContainerStyle={styles.scrollContent}
            />
            {/* Sticky Bar */}
            <View style={styles.stickyBar}>
              <RText style={styles.stickyTotal}>Total: {total.toLocaleString()} VND</RText>
              <Button _type="Fill" _set={{ onPress: handleBuyNow, style: styles.buyBtn, disabled: isLoading }}>
                <RText style={styles.buyBtnText}>{isLoading ? "Processing..." : "Buy now"}</RText>
              </Button>
            </View>
            {/* Address Picker Modal */}
            <Modal visible={showAddressPicker} animationType="slide">
              <AddressPicker
                addresses={addresses}
                onSelect={addr => { setSelectedAddress(addr); setShowAddressPicker(false); }}
                onAddNew={() => { setShowAddressPicker(false); setShowAddAddress(true); }}
                selectedId={selectedAddress?.id}
              />
              <Button _type="Stroke" _set={{ onPress: () => setShowAddressPicker(false), style: { margin: 16 } }}>
                <RText>Close</RText>
              </Button>
            </Modal>
            {/* Add Address Modal */}
            <Modal visible={showAddAddress} animationType="slide">
              <AddAddressForm onSave={addr => { setShowAddAddress(false); fetchAddresses(); }} />
              <Button _type="Stroke" _set={{ onPress: () => setShowAddAddress(false), style: { margin: 16 } }}>
                <RText>Close</RText>
              </Button>
            </Modal>
            {/* Voucher Picker Modal */}
            <Modal visible={showVoucherPicker} animationType="slide">
              <VoucherPicker
                vouchers={vouchers}
                onSelect={voucher => { setSelectedVoucher(voucher); setShowVoucherPicker(false); }}
                selectedId={selectedVoucher?.id}
              />
              <Button _type="Stroke" _set={{ onPress: () => setShowVoucherPicker(false), style: { margin: 16 } }}>
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
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContent: { paddingBottom: 30 },
  sectionBtn: { margin: 16, borderRadius: 8, padding: 12 },
  sectionBtnText: { fontWeight: 'bold', fontSize: 16 },
  stickyBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee', position: 'absolute', left: 0, right: 0, bottom: 0 },
  stickyTotal: { fontWeight: 'bold', fontSize: 18, color: '#F23059' },
  buyBtn: { backgroundColor: '#F23059', borderRadius: 8, paddingVertical: 2, paddingHorizontal: 32 },
  buyBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
