import { Button, Container, Row, RText } from "@/src/libs/by";
import { Ionicons } from '@expo/vector-icons';
import { map } from "lodash";
import React from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { CartItem } from "./seg/CartItem";
import Context from "./seg/context";

export function Cart() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const cart = ss.Joint.Cart as ICart | undefined;
          const [selected, setSelected] = React.useState<number[]>([]);
          const [isLoading, setIsLoading] = React.useState(false);

          // Handle individual item selection
          const handleSelect = (id: number) => {
            setSelected((prev) => 
              prev.includes(id) 
                ? prev.filter(i => i !== id) 
                : [...prev, id]
            );
          };

          // Handle select all functionality
          const handleSelectAll = () => {
            const allItemIds = cart?.cartItems?.map(item => item.id) ?? [];
            const allSelected = selected.length === allItemIds.length && allItemIds.length > 0;
            setSelected(allSelected ? [] : allItemIds);
          };

          // Calculate total cost of selected items
          const calculateTotal = () => {
            if (!cart?.cartItems) return 0;
            return cart.cartItems
              .filter(item => selected.includes(item.id))
              .reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          };

          // Format currency
          const formatCurrency = (amount: number) => {
            return new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND'
            }).format(amount);
          };

          // Handle voucher selection
          const handleVoucherPress = () => {
            // Navigate to voucher selection screen or show modal
            Alert.alert("Vouchers", "Voucher selection feature coming soon!");
          };

          // Handle buy action
          const handleBuyPress = async () => {
            if (selected.length === 0) {
              Alert.alert("No items selected", "Please select items to purchase.");
              return;
            }

            setIsLoading(true);
            try {
              // Simulate API call
              await new Promise(resolve => setTimeout(resolve, 1000));
              Alert.alert("Success", "Items purchased successfully!");
              setSelected([]); // Clear selection after successful purchase
            } catch (error) {
              Alert.alert("Error", "Failed to process purchase. Please try again.");
            } finally {
              setIsLoading(false);
            }
          };

          const totalCost = calculateTotal();
          const allItemIds = cart?.cartItems?.map(item => item.id) ?? [];
          const isAllSelected = selected.length === allItemIds.length && allItemIds.length > 0;
          const hasSelectedItems = selected.length > 0;

          // Empty cart state
          if (!cart?.cartItems || cart.cartItems.length === 0) {
            return (
              <Container style={styles.container}>
                <View style={styles.emptyState}>
                  <Ionicons name="cart-outline" size={64} color="#ccc" />
                  <RText style={styles.emptyText}>Your cart is empty</RText>
                  <RText style={styles.emptySubtext}>Add some items to get started</RText>
                </View>
              </Container>
            );
          }

          return (
            <Container style={styles.container}>
              <ScrollView style={styles.scrollView}>
                {map(cart.cartItems, (item) => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    selected={selected.includes(item.id)} 
                    onSelect={handleSelect} 
                  />
                ))}
              </ScrollView>

              {/* Voucher Bar */}
              <View style={styles.voucherBar}>
                <Row style={styles.voucherRow}>
                  <Row style={styles.voucherLeft}>
                    <Ionicons name="pricetag-outline" size={22} color="#222" />
                    <RText style={styles.voucherLabel}>CosmePlay Voucher</RText>
                  </Row>
                  <Button 
                    _set={{ 
                      onPress: handleVoucherPress, 
                      style: styles.voucherButton 
                    }} 
                    _type="Default"
                  >
                    <RText style={styles.chooseVoucher}>Choose your voucher</RText>
                    <Ionicons name="chevron-forward" size={18} color="#888" />
                  </Button>
                </Row>
              </View>

              {/* Select All, Cost, Buy Bar */}
              <View style={styles.bottomBar}>
                <Row style={styles.bottomRow}>
                  <Row style={styles.selectAllSection}>
                    <Button 
                      _set={{ 
                        onPress: handleSelectAll, 
                        style: styles.selectAllBtn 
                      }} 
                      _type="Icon"
                    >
                      <Ionicons 
                        name={isAllSelected ? "checkbox" : "square-outline"} 
                        size={26} 
                        color="#222" 
                      />
                    </Button>
                    <RText style={styles.selectAllText}>Select all</RText>
                  </Row>
                  
                  <View style={styles.costSection}>
                    <RText style={styles.costLabel}>Total:</RText>
                    <RText style={styles.costText}>
                      {formatCurrency(totalCost)}
                    </RText>
                  </View>
                  
                  <Button 
                    _set={{ 
                      onPress: handleBuyPress, 
                      style: [
                        styles.buyBtn, 
                        !hasSelectedItems && styles.buyBtnDisabled
                      ],
                      disabled: !hasSelectedItems || isLoading
                    }} 
                    _type="Fill"
                  >
                    <RText style={[
                      styles.buyText,
                      !hasSelectedItems && styles.buyTextDisabled
                    ]}>
                      {isLoading ? "Processing..." : "Buy"}
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
    backgroundColor: '#fff', 
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
    alignItems: 'center', 
    gap: 8 
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
    padding: 16, 
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
    alignItems: 'center', 
    gap: 8 
  },
  selectAllBtn: { 
    padding: 0 
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
    backgroundColor: '#F9CACA', 
    borderRadius: 8, 
    paddingVertical: 12, 
    paddingHorizontal: 24,
    minWidth: 80,
    alignItems: 'center',
  },
  buyBtnDisabled: {
    backgroundColor: '#ddd',
  },
  buyText: { 
    color: '#222', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  buyTextDisabled: {
    color: '#999',
  },
});