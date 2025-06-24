import { Button, RText } from "@/src/libs/by";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export function VoucherPicker({ vouchers, onSelect, selectedId }: {
  vouchers: any[];
  onSelect: (voucher: any) => void;
  selectedId?: string;
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={vouchers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Button
            _type={item.id === selectedId ? "Fill" : "Stroke"}
            _set={{ onPress: () => onSelect(item), style: styles.card }}
          >
            <RText style={styles.cardText}>{item.title} - {item.amount} VND</RText>
            <RText style={styles.cardSub}>{item.description}</RText>
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 10, borderRadius: 8, padding: 12 },
  cardText: { fontWeight: 'bold', fontSize: 16 },
  cardSub: { color: '#888', fontSize: 13 },
});
