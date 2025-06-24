import { Button, RText } from "@/src/libs/by";
import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export function AddAddressForm({ onSave }: { onSave: (address: IAddress) => void }) {
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <View style={styles.container}>
      <RText style={styles.label}>Full Name</RText>
      <TextInput style={styles.input} value={fullname} onChangeText={setFullname} />
      <RText style={styles.label}>Address</RText>
      <TextInput style={styles.input} value={address} onChangeText={setAddress} />
      <RText style={styles.label}>City</RText>
      <TextInput style={styles.input} value={city} onChangeText={setCity} />
      <RText style={styles.label}>Phone</RText>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Button _type="Fill" _set={{ onPress: () => onSave({ fullname, address, city, phone, user_id: '', to_city_id: '', to_ward_code: '', to_district_id: '', district: '', ward: '', pincode: '' }), style: styles.saveBtn }}>
        <RText style={styles.saveBtnText}>Save Address</RText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 },
  saveBtn: { marginTop: 16, backgroundColor: '#F23059' },
  saveBtnText: { color: '#fff', fontWeight: 'bold' },
});
