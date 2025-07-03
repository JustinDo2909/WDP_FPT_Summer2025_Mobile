import { Button, Container, Row, RText } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { init } from "@/src/process/constants";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CartItem } from "./seg/CartItem";
import Context from "./seg/context";

export function Cart() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss, cart, meds, isLoading }) => {
          const cartItems = cart?.cartItems ?? [];
          return (
            <Container style={{ backgroundColor: '#f5f5f5', flex: 1, paddingBottom: 0, paddingHorizontal: 0 }}>
              {/* <Header title="My Cart" /> */}

              {/* Voucher Bar */}
              {/* <View style={styles.voucherBar}>
                <Row style={styles.voucherRow}>
                  <Row style={styles.voucherLeft}>
                    <Ionicons name="pricetag-outline" size={22} color="#222" />
                    <RText style={styles.voucherLabel}>CosmePlay Voucher</RText>
                  </Row>
                  <Button 
                    _set={{ 
                      onPress: meds.handleVoucherPress, 
                      style: styles.voucherButton 
                    }} 
                    _type="Default"
                  >
                    <RText style={styles.chooseVoucher}>Choose your voucher</RText>
                    <Ionicons name="chevron-forward" size={18} color="#888" />
                  </Button>
                </Row>
              </View> */}

              <ScrollView style={{ flex: 1 }}>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={meds.handleQuantityChange}
                    onRemove={meds.handleRemove}
                  />
                ))}
              </ScrollView>

              {/* Select All, Cost, Buy Bar */}
              <View style={styles.bottomBar}>
                <Row style={styles.bottomRow}>
                  <View style={styles.costSection}>
                    <RText style={styles.costLabel}>Total:</RText>
                    <RText style={styles.costText}>
                      {formatPrice(meds.calculateTotal())}
                    </RText>
                  </View>
                  
                  <Button 
                    _set={{ 
                      onPress: meds.handleBuyPress, 
                      style: [
                        styles.buyBtn, 
                        !cartItems.length && styles.buyBtnDisabled
                      ],
                      disabled: !cartItems.length || isLoading
                    }} 
                    _type="Fill"
                  >
                    <RText style={
                     
                         styles.buyText
                    }>
                      {isLoading ? "Processing..." : "Checkout"}
                    </RText>
                  </Button>
                </Row>
              </View>
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: '#f5f5f5', 
    flex: 1, 
    padding: 0 
  },
  scrollView: { 
    flex: 1 
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  voucherBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    borderTopWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#fff' 
  },
  voucherRow: { 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flex: 1 
  },
  voucherLeft: { 
    flexDirection: 'row',
    alignItems: 'center'
  },
  voucherLabel: { 
    color: '#222', 
    fontWeight: 'bold', 
    fontSize: 17 
  },
  voucherButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 0 
  },
  chooseVoucher: { 
    color: '#888', 
    fontWeight: '500', 
    fontSize: 16, 
    marginRight: 8 
  },
  bottomBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16,
    paddingVertical: 16, 
    borderTopWidth: 1, 
    borderColor: '#eee', 
    backgroundColor: '#fff', 
    borderBottomLeftRadius: 16, 
    borderBottomRightRadius: 16 
  },
  bottomRow: { 
    alignItems: 'center', 
    flex: 1, 
    justifyContent: 'space-between' 
  },
  selectAllSection: { 
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectAllBtn: { 
    padding: 0,
  },
  selectAllText: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    color: '#222' 
  },
  costSection: {
    alignItems: 'center',
  },
  costLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  costText: { 
    fontWeight: 'bold', 
    fontSize: 17, 
    color: '#222' 
  },
  buyBtn: { 
    backgroundColor: init.Color.PrimaryBrand, 
    borderRadius: 8, 
    paddingVertical: 8, 
    paddingHorizontal: 24,
    minWidth: 80,
    height: 40,
    alignItems: 'center',
  }, 
  buyBtnDisabled: {
    backgroundColor: '#ddd',
  },
  buyText: { 
    color: init.Color.Whites, 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  buyTextDisabled: {
    color: '#999',
  },
});