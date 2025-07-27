import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { RText, FieldText, Button } from "@/src/libs/by";
import { ToastAndroid, Platform, Alert } from "react-native";
import Context from "./seg/context";
import { Ionicons } from "@expo/vector-icons";
import { valid } from "@/src/process/helper";
import { init } from "@/src/process/constants";

export function ReviewProduct() {
  // Expecting route.params.product to be passed from purchase history
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ methods: { handleSubmit }, meds, loading, product, reviewMessage, reviewValue, setReviewMessage, setReviewValue }) => {
          if (loading) {
            return (
              <View style={styles.centered}><ActivityIndicator color="#F23059" /></View>
            );
          }



          return (
            <View style={styles.container}>
              {/* Product Image at the top */}
              {product?.image_url && (
                <Image source={{ uri: product.image_url }} style={styles.productImageTop} />
              )}
              <RText style={styles.productTitle}>{product?.title}</RText>
              <View style={styles.starsRow}>
                {[1,2,3,4,5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setReviewValue(star)}>
                    <Ionicons
                      name={reviewValue >= star ? "star" : "star-outline"}
                      size={32}
                      color={reviewValue >= star ? "#FFD700" : "#ccc"}
                      style={styles.starIcon}
                    />
                  </TouchableOpacity>
                ))}
              </View>
              <FieldText
                name="fields.reviewMessage"
                style={{ input: styles.input, container: styles.inputContainer }}
                placeholder="Write your review..."
                rules={valid.required()}
              />
              <Button
                _type="Fill"
                _set={{
                  onPress: () => {
                    if (!loading) handleSubmit(meds.addReview)()
                   },
                  style: {
                    backgroundColor: init.Color.PrimaryBrand,
                    paddingVertical: 8,
                    height: 64,
                    opacity: (loading || !reviewValue) ? 0.7 : 1,
                    },
                  disabled: loading || !reviewValue,
                }}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <RText style={styles.submitText}>Submit Review</RText>}
              </Button>
            </View>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 24, alignItems: "center" },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  productImage: { width: 120, height: 120, borderRadius: 16, marginBottom: 16, resizeMode: "contain" },
  productImageTop: { width: 180, height: 180, borderRadius: 20, marginBottom: 20, resizeMode: "contain" },
  productTitle: { fontWeight: "bold", fontSize: 18, marginBottom: 16, textAlign: "center" },
  starsRow: { flexDirection: "row", marginBottom: 16 },
  starIcon: { marginHorizontal: 4 },
  input: { minHeight: 80, textAlignVertical: "top", fontSize: 16, padding: 12, borderWidth: 1, borderColor: "#eee", borderRadius: 8, backgroundColor: "#fafafa" },
  inputContainer: { width: "100%", marginBottom: 20 },
  submitBtn: { backgroundColor: "#F23059", borderRadius: 8, paddingVertical: 14, paddingHorizontal: 32, marginTop: 8 },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  alreadyReviewedText: { color: "#27ae60", fontWeight: "bold", fontSize: 18, marginTop: 16, textAlign: "center" },
});
