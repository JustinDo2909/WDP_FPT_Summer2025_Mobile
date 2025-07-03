import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SubmitConfirmProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function SubmitConfirm({
  visible,
  onCancel,
  onConfirm,
}: SubmitConfirmProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Submission Notice</Text>
          <Text style={styles.message}>
            Please note: All submissions are final. Ensure you've reviewed your
            answers carefully before submitting. Good luck!
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={onCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={[styles.button, styles.confirmButton]}
            >
              <Text style={styles.confirmText}>I'm sure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: "#1e293b",
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#e2e8f0",
  },
  confirmButton: {
    backgroundColor: "#22c55e",
  },
  cancelText: {
    color: "#1e293b",
    fontWeight: "600",
  },
  confirmText: {
    color: "white",
    fontWeight: "600",
  },
});
