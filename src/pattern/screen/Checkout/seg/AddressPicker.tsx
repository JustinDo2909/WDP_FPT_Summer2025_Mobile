import { Button, RText } from "@/src/libs/by";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export function AddressPicker({ addresses, onSelect, onAddNew, selectedId }: {
  addresses: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddNew: () => void;
  selectedId?: string;
}) {
  return (
    <View style={styles.container}>
      <Button _type="Fill" _set={{ onPress: onAddNew, style: styles.addBtn }}>
        <RText style={styles.addBtnText}>+ Add new address</RText>
      </Button>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id || item.address}
        renderItem={({ item }) => (
          <Button
            _type={item.id === selectedId ? "Fill" : "Stroke"}
            _set={{ onPress: () => onSelect(item), style: styles.card }}
          >
            <RText style={styles.cardText}>{item.fullname} - {item.address}, {item.city}</RText>
            <RText style={styles.cardSub}>{item.phone}</RText>
          </Button>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  addBtn: { marginBottom: 12, backgroundColor: '#F23059' },
  addBtnText: { color: '#fff', fontWeight: 'bold' },
  card: { marginBottom: 10, borderRadius: 8, padding: 12 },
  cardText: { fontWeight: 'bold', fontSize: 16 },
  cardSub: { color: '#888', fontSize: 13 },
});
