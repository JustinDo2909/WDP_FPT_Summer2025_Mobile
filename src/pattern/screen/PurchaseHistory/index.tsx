import { Container, FieldText, Loading, RText } from "@/src/libs/by";
import { Ionicons } from "@expo/vector-icons";
import { groupBy } from "lodash";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Context from "./seg/context";
import { PurchaseItem } from "./seg/PurchaseItem";

export function PurchaseHistory() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds, methods, ss, orders, loading }) => {
          const filteredOrders = meds.getFilteredOrders();

          const ordersByDate = groupBy(filteredOrders, (order) => {
            const date = new Date(order.createdAt);
            return date.toDateString();
          });

          const orderItems: Array<{
            item: IOrderItem;
            date: string;
            orderId: string;
          }> = [];

          Object.entries(ordersByDate).forEach(([date, orders]) => {
            orders.forEach((order) => {
              order.orderItems.forEach((item) => {
                orderItems.push({
                  item,
                  date: meds.formatDate(order.createdAt),
                  orderId: order.id,
                });
              });
            });
          });

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

          const renderOrderItem = ({
            item,
            index,
          }: {
            item: any;
            index: number;
          }) => {
            const { item: orderItem, date } = item;

            const prevItem = orderItems[index - 1];
            const showDateHeader = !prevItem || prevItem.date !== date;

            return (
              <View>
                {showDateHeader && (
                  <View style={styles.dateHeader}>
                    <RText style={styles.dateText}>{date}</RText>
                  </View>
                )}
                <PurchaseItem orderItem={orderItem} orderDate={date} />
              </View>
            );
          };

          if (loading && orders.length === 0) {
            return (
              <Container style={styles.container}>
                {renderHeader()}
                <Loading />
              </Container>
            );
          }

          return (
            <Container style={styles.container}>
              <FlatList
                data={orderItems}
                keyExtractor={(item, index) =>
                  `${item.orderId}-${item.item.id}-${index}`
                }
                renderItem={renderOrderItem}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  header: {
    backgroundColor: "#F23059",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  accountButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  accountText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 16,
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
