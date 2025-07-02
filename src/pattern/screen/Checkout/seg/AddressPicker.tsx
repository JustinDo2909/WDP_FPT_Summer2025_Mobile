import { RText } from "@/src/libs/by";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export function AddressPicker({ addresses, onSelect, onAddNew, selectedId }: {
  addresses: IAddress[];
  onSelect: (address: IAddress) => void;
  onAddNew: () => void;
  selectedId?: string;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={onAddNew} activeOpacity={0.8}>
        <RText style={styles.addBtnText}>+ Add new address</RText>
      </TouchableOpacity>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id || item.address}
        renderItem={({ item }) => {
          const selected = item.id === selectedId;
          return (
            <TouchableOpacity
              style={[
                styles.card,
                selected && styles.cardSelected,
              ]}
              onPress={() => onSelect(item)}
              activeOpacity={0.85}
            >
              <View style={{ flex: 1 }}>
                <RText style={styles.cardText}>{item.fullname} - {item.address}, {item.city}</RText>
                <RText style={styles.cardSub}>{item.phone}</RText>
              </View>
              {selected && (
                <Ionicons name="checkmark-circle" size={24} color="#F23059" style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  addBtn: {
    marginBottom: 16,
    backgroundColor: '#F23059',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: "#F23059",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 1,
  },
  cardSelected: {
    borderColor: '#F23059',
    backgroundColor: '#FFF5F7',
    shadowOpacity: 0.15,
    elevation: 3,
  },
  cardText: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  cardSub: { color: '#888', fontSize: 13 },
});
