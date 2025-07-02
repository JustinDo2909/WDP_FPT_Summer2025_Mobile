import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RText, Button } from "@/src/libs/by";
import context from "./context"; // Adjust if your context hook is named differently


export function AddAddressForm({ onSave, initialShippingInfo }: { onSave: (address: IAddress) => void; initialShippingInfo?: IAddress }) {
  const [shippingInfo, setShippingInfo] = useState<Partial<IAddress>>(
    initialShippingInfo || {
      user_id: "",
      address: "",
      city: "",
      to_city_id: "",
      to_district_id: "",
      to_ward_code: "",
      pincode: "",
      phone: "",
      notes: "",
      fullname: "",
      district: "",
      ward: "",
    }
  );
  const { meds, ss,  methods: { handleSubmit }, isLoading, setShowAddressPicker } = context.useCtx();


  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Fetch provinces
  useEffect(() => {
    setLoadingProvinces(true);
    meds.onGetProvinces().then((data) => {
      setProvinces(data || []);
      setLoadingProvinces(false);
    });
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (shippingInfo.to_city_id) {
      setLoadingDistricts(true);
      meds.onGetDistricts(Number(shippingInfo.to_city_id)).then((data) => {
        setDistricts(data || []);
        setLoadingDistricts(false);
      });
      setShippingInfo((prev) => ({
        ...prev,
        to_district_id: "",
        district: "",
        to_ward_code: "",
        ward: "",
      }));
    } else {
      setDistricts([]);
      setShippingInfo((prev) => ({
        ...prev,
        to_district_id: "",
        district: "",
        to_ward_code: "",
        ward: "",
      }));
    }
  }, [shippingInfo.to_city_id]);

  // Fetch wards when district changes
  useEffect(() => {
    if (shippingInfo.to_district_id) {
      setLoadingWards(true);
      meds.onGetWards(Number(shippingInfo.to_district_id)).then((data) => {
        setWards(data || []);
        setLoadingWards(false);
      });
      setShippingInfo((prev) => ({
        ...prev,
        to_ward_code: "",
        ward: "",
      }));
    } else {
      setWards([]);
      setShippingInfo((prev) => ({
        ...prev,
        to_ward_code: "",
        ward: "",
      }));
    }
  }, [shippingInfo.to_district_id]);

  // Validation
  const validateForm = () => {
    const newErrors: { [k: string]: string } = {};
    if (!shippingInfo.fullname) newErrors.fullname = "Full name is required";
    if (!shippingInfo.phone) newErrors.phone = "Phone number is required";
    else if (!meds.validateVietnamesePhoneNumber(shippingInfo.phone)) newErrors.phone = "Invalid Vietnamese phone number";
    if (!shippingInfo.to_city_id) newErrors.city = "Province/City is required";
    if (!shippingInfo.to_district_id) newErrors.district = "District is required";
    if (!shippingInfo.to_ward_code) newErrors.ward = "Ward is required";
    if (!shippingInfo.address) newErrors.address = "Street address is required";
    if (!shippingInfo.pincode || shippingInfo.pincode.length < 6) newErrors.pincode = "PIN is required (6 digits)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RText style={styles.title}>Add a new address</RText>
      {/* Full Name & Phone */}
      <View style={styles.row}>
        <View style={styles.flex1}>
          <RText style={styles.label}>Full Name</RText>
          <TextInput
            style={[styles.input, errors.fullname && styles.inputError]}
            placeholder="Enter full name"
            value={shippingInfo.fullname || ""}
            onChangeText={(v) => setShippingInfo({ ...shippingInfo, fullname: v })}
          />
          {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}
        </View>
        <View style={styles.flex1}>
          <RText style={styles.label}>Phone</RText>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Enter phone number"
            value={shippingInfo.phone || ""}
            onChangeText={(v) => setShippingInfo({ ...shippingInfo, phone: v })}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
        </View>
      </View>
      {/* Province & PIN */}
      <View style={styles.row}>
        <View style={styles.flex1}>
          <RText style={styles.label}>Province/City</RText>
          <View style={[styles.pickerWrapper, errors.city && styles.inputError]}>
            {loadingProvinces ? (
              <ActivityIndicator size="small" color="#F23059" />
            ) : (
              <Picker
                selectedValue={shippingInfo.to_city_id || ""}
                onValueChange={(val) => {
                  const selected = provinces.find((p) => p.codeId === val);
                  setShippingInfo({
                    ...shippingInfo,
                    to_city_id: val,
                    city: selected ? selected.name : "",
                  });
                }}
              >
                <Picker.Item label="Select province/city" value="" />
                {provinces.map((province) => (
                  <Picker.Item key={province.codeId} label={province.name} value={province.codeId} />
                ))}
              </Picker>
            )}
          </View>
          {errors.city && <Text style={styles.error}>{errors.city}</Text>}
        </View>
        <View style={styles.flex1}>
          <RText style={styles.label}>PIN Code</RText>
          <TextInput
            style={[styles.input, errors.pincode && styles.inputError]}
            placeholder="Enter PIN code"
            value={shippingInfo.pincode || ""}
            onChangeText={(v) => setShippingInfo({ ...shippingInfo, pincode: v })}
            keyboardType="number-pad"
            maxLength={6}
          />
          {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}
        </View>
      </View>
      {/* District */}
      <View style={styles.flex1}>
        <RText style={styles.label}>District</RText>
        <View style={[styles.pickerWrapper, errors.district && styles.inputError]}>
          {loadingDistricts ? (
            <ActivityIndicator size="small" color="#F23059" />
          ) : (
            <Picker
              selectedValue={shippingInfo.to_district_id || ""}
              enabled={!!shippingInfo.to_city_id}
              onValueChange={(val) => {
                const selected = districts.find((d) => d.codeId === val);
                setShippingInfo({
                  ...shippingInfo,
                  to_district_id: val,
                  district: selected ? selected.name : "",
                });
              }}
            >
              <Picker.Item label="Select district" value="" />
              {districts.map((district) => (
                <Picker.Item key={district.codeId} label={district.name} value={district.codeId} />
              ))}
            </Picker>
          )}
        </View>
        {errors.district && <Text style={styles.error}>{errors.district}</Text>}
      </View>
      {/* Ward */}
      <View style={styles.flex1}>
        <RText style={styles.label}>Ward</RText>
        <View style={[styles.pickerWrapper, errors.ward && styles.inputError]}>
          {loadingWards ? (
            <ActivityIndicator size="small" color="#F23059" />
          ) : (
            <Picker
              selectedValue={shippingInfo.to_ward_code || ""}
              enabled={!!shippingInfo.to_district_id}
              onValueChange={(val) => {
                const selected = wards.find((w) => w.codeId === val);
                setShippingInfo({
                  ...shippingInfo,
                  to_ward_code: val,
                  ward: selected ? selected.name : "",
                });
              }}
            >
              <Picker.Item label="Select ward" value="" />
              {wards.map((ward) => (
                <Picker.Item key={ward.codeId} label={ward.name} value={ward.codeId} />
              ))}
            </Picker>
          )}
        </View>
        {errors.ward && <Text style={styles.error}>{errors.ward}</Text>}
      </View>
      {/* Street Address */}
      <View style={styles.flex1}>
        <RText style={styles.label}>Street Address</RText>
        <TextInput
          style={[styles.input, errors.address && styles.inputError]}
          placeholder="Street number + street name"
          value={shippingInfo.address || ""}
          onChangeText={(v) => setShippingInfo({ ...shippingInfo, address: v })}
        />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}
      </View>
      {/* Notes */}
      <View style={styles.flex1}>
        <RText style={styles.label}>Notes</RText>
        <TextInput
          style={styles.input}
          placeholder="Add a note (optional)"
          value={shippingInfo.notes || ""}
          onChangeText={(v) => setShippingInfo({ ...shippingInfo, notes: v })}
        />
      </View>
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => setShowAddressPicker(false)} disabled={isLoading}>
          <RText style={styles.cancelText}>Cancel</RText>
        </TouchableOpacity>
        <Button
          _type="Fill"
          _set={{
            onPress: () => {
              handleSubmit(meds.onGetShippingFee)()
            },
            style: [styles.button, styles.saveBtn, isLoading && { opacity: 0.7 }],
            disabled: isLoading,
          }}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <RText style={styles.saveText}>Save Address</RText>}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  title: { fontWeight: "bold", fontSize: 18, marginBottom: 12 },
  label: { fontWeight: "bold", marginTop: 8, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 4, backgroundColor: "#f9f9f9" },
  inputError: { borderColor: "#F23059" },
  error: { color: "#F23059", fontSize: 12, marginBottom: 2 },
  row: { flexDirection: "row", gap: 12 },
  flex1: { flex: 1, minWidth: 0 },
  pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, backgroundColor: "#f9f9f9", marginBottom: 4 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 16 },
  button: { borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24 },
  cancelBtn: { backgroundColor: "#eee", marginRight: 8 },
  saveBtn: { backgroundColor: "#F23059" },
  cancelText: { color: "#333", fontWeight: "bold" },
  saveText: { color: "#fff", fontWeight: "bold" },
});