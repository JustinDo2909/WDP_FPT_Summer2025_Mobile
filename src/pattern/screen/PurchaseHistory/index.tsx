import { Container, FieldText, Loading, RText } from "@/src/libs/by";
import { Ionicons } from "@expo/vector-icons";
import { groupBy } from "lodash";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Context from "./seg/context";
import { PurchaseItem } from "./seg/PurchaseItem";
import { formatPrice } from "@/src/libs/share/formatPrice";

export function PurchaseHistory() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds, methods, ss, orders, loading }) => {

          const filteredOrders = meds.getFilteredOrders();
          
          const renderHeader = () => (
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <RText style={styles.title}>Purchase history</RText>
                <RText style={styles.subtitle}>
                  Review the products you have purchased
                </RText>
              </View>

              <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                  <Ionicons
                    name="search"
                    size={20}
                    color="#9ca3af"
                    style={styles.searchIcon}
                  />
                  <FieldText
                    name="fields.searchQuery"
                    placeholder="Search your product"
                    style={{
                      input: styles.searchInput,
                      container: styles.searchFieldContainer,
                    }}
                  />
                </View>
              </View>
            </View>
          );

          // Render each order with its items
          const renderOrder = ({ item: order, index }) => {
            // Show date header if this is the first order of the date
            const prevOrder = index > 0 ? filteredOrders[index - 1] : null;
            const showDateHeader = !prevOrder || (new Date(prevOrder.createdAt)).toDateString() !== (new Date(order.createdAt)).toDateString();
            const dateStr = meds.formatDate(order.createdAt);
            
            return (
              <View>
                {showDateHeader && (
                  <View style={styles.dateHeader}>
                    <RText style={styles.dateText}>{(new Date(order.createdAt)).toDateString()}</RText>
                  </View>
                )}
                <View style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <RText style={styles.orderId}>Order #{order.id.slice(-6).toUpperCase()}</RText>
                    <RText style={styles.orderStatus}>{order.status}</RText>
                  </View>
                  <RText style={styles.orderTotal}>Total: {formatPrice(order.total_amount)}</RText>
                  <RText style={styles.orderDate}>Placed: {dateStr}</RText>
                  <View style={styles.itemsList}>
                    {order.orderItems?.map((orderItem) => (
                      <PurchaseItem key={orderItem.id} orderItem={orderItem} orderDate={dateStr} />
                    ))}
                  </View>
                </View>
              </View>
            );
          };

          if (loading && (!orders || orders.length === 0)) {
            return (
              <Container style={styles.loadingContainer}>
                {renderHeader()}
                <Loading />
              </Container>
            );
          }

          return (
            <Container style={styles.container}>
              <FlatList
                data={filteredOrders || []}
                keyExtractor={(order) => order.id}
                renderItem={renderOrder}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                  styles.listContent,
                  (!filteredOrders || filteredOrders.length === 0) && styles.emptyListContent
                ]}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={meds.onGetOrders}
                    colors={["#F23059"]}
                  />
                }
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Ionicons name="bag-outline" size={64} color="#d1d5db" />
                    <RText style={styles.emptyTitle}>No purchase history</RText>
                    <RText style={styles.emptySubtitle}>
                      Start shopping to see your orders here
                    </RText>
                  </View>
                }
              />
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#F23059",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  searchContainer: {
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchFieldContainer: {
    flex: 1,
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 0,
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  dateHeader: {
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#F23059',
  },
  orderStatus: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#6b7280',
  },
  orderTotal: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#374151',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 8,
  },
  itemsList: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 16,
    minHeight: 400,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});