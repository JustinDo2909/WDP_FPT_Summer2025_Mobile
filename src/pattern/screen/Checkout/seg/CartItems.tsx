import { Row, RText } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";
import { init } from "@/src/process/constants";
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

export function CartItems({ items }: { items: ICartLineItem[] }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Image source={{ uri: item.product.image_url }} style={styles.thumbnail} />
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <RText style={styles.title}>{item.product.title}</RText>
                <Row style={{flex: 1, flexDirection: "row", justifyContent: 'space-between'}}>
                <RText style={styles.price}>{formatPrice(item.product.sale_price ?? item.product.price)}</RText>
                <RText style={styles.desc}>x {item.quantity}</RText>
                </Row>


              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 10, borderRadius: 8, padding: 12, backgroundColor: '#ffffff' },
  row: { flexDirection: 'row', alignItems: 'center' },
  thumbnail: { width: 48, height: 48, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 16 },
  price: { color: init.Color.PrimaryBrand, fontSize: 16 },
  desc: { color: '#888', fontSize: 13 },
});
