import { Button, FieldText, RText } from "@/src/libs/by";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import context from "./context"; // Adjust if your context hook is named differently
import { init } from "@/src/process/constants";


export function AddAddressForm({ onSave, initialShippingInfo }: { onSave: (address: IAddress) => void; initialShippingInfo?: IAddress }) {
  const { meds, ss,  methods: { handleSubmit }, isLoading, setShowAddAddress, setShippingInfo, shippingInfo } = context.useCtx();


  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Fetch provinces
  useEffect(() => {
    if (initialShippingInfo) setShippingInfo(initialShippingInfo)
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
          <FieldText
            name="fields.fullname"
            style={{ input: [styles.input, errors.fullname && styles.inputError] }}
            placeholder="Enter full name"
            value={shippingInfo.fullname || ""}
            onChange={(v: string) => setShippingInfo({ ...shippingInfo, fullname: v })}
          />
          {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}
        </View>
        <View style={styles.flex1}>
          <RText style={styles.label}>Phone</RText>
          <FieldText
            name="fields.phone"
            style={{ input: [styles.input, errors.phone && styles.inputError] }}
            placeholder="Enter phone number"
            value={shippingInfo.phone || ""}
            onChange={(v: string) => setShippingInfo({ ...shippingInfo, phone: v })}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
        </View>
      </View>
      {/* Province & PIN */}
      <View style={styles.row}>
        <View style={styles.flex1}>
          <RText style={styles.label}>Province/City</RText>
          <View style={[ errors.city && styles.inputError]}>
            {loadingProvinces ? (
              <ActivityIndicator size="small" color="#F23059" />
            ) : (
              <Picker
                style={styles.picker}
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
          <FieldText
            name="fields.pincode"
            style={{ input: [styles.input, errors.pincode && styles.inputError] }}
            placeholder="Enter PIN code"
            value={shippingInfo.pincode || ""}
            onChange={(v: string) => setShippingInfo({ ...shippingInfo, pincode: v })}
          />
          {errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}
        </View>
      </View>
      {/* District */}
      <View style={styles.flex1}>
        <RText style={styles.label}>District</RText>
        <View style={[ errors.district && styles.inputError]}>
          {loadingDistricts ? (
            <ActivityIndicator size="small" color="#F23059" />
          ) : (
            <Picker
              style={styles.picker}
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
        <View style={[errors.ward && styles.inputError]}>
          {loadingWards ? (
            <ActivityIndicator size="small" color="#F23059" />
          ) : (
            <Picker
              style={styles.picker}
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
        <FieldText
          name="fields.address"
          style={{ input: [styles.input, errors.address && styles.inputError] }}
          placeholder="Street number + street name"
          value={shippingInfo.address || ""}
          onChange={(v: string) => setShippingInfo({ ...shippingInfo, address: v })}
        />
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}
      </View>
      {/* Notes */}
      <View style={styles.flex1}>
        <RText style={styles.label}>Notes</RText>
        <FieldText
          name="fields.notes"
          style={{ input: styles.input }}
          placeholder="Add a note (optional)"
          value={shippingInfo.notes || ""}
          onChange={(v: string) => setShippingInfo({ ...shippingInfo, notes: v })}
        />
      </View>
      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.cancelBtn]} onPress={() => setShowAddAddress(false)} disabled={isLoading}>
          <RText style={styles.cancelText}>Cancel</RText>
        </TouchableOpacity>
        <Button
          _type="Fill"
          _set={{
            onPress: () => {
              handleSubmit(meds.onAddAddress)()
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
  input: { borderRadius: 8, padding: 10},
  inputError: { borderColor: "#F23059" },
  error: { color: "#F23059", fontSize: 12, marginBottom: 2 },
  row: { flexDirection: "row", gap: 12 },
  flex1: { flex: 1, minWidth: 0 },
  picker: { height: 50, width: "100%", backgroundColor: "transparent", borderWidth: 1, fontSize: 12,
      borderColor: init.Color.BgDisableTextfileld,
      borderRadius: 6, padding: 0 },
  buttonRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12, marginTop: 16 },
  button: { borderRadius: 8, paddingVertical: 12, paddingHorizontal: 24, backgroundColor: "#F23059", shadowColor: "transparent", elevation: 0, height: 40 },
  cancelBtn: { backgroundColor: "#eee", marginRight: 8, shadowColor: "transparent", elevation: 0 },
  saveBtn: { backgroundColor: "#F23059", shadowColor: "transparent", elevation: 0 },
  cancelText: { color: "#333", fontWeight: "bold" },
  saveText: { color: "#fff", fontWeight: "bold" },
});