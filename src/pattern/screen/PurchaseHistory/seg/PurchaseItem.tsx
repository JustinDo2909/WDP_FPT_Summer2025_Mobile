import { Button, Card, Column, Row, RText } from "@/src/libs/by";
import { formatPrice } from "@/src/libs/share/formatPrice";
import React from "react";
import { Alert, Image, StyleSheet, View } from "react-native";

interface PurchaseItemProps {
  orderItem: IOrderItem;
  orderDate: string;
}

export function PurchaseItem({ orderItem, orderDate }: PurchaseItemProps) {
  const { title, price, image_url, quantity } = orderItem;

  const handleRepurchase = () => {
    Alert.alert("Repurchase", "Repurchase feature coming soon!");
  };

  const handleFeedback = () => {
    Alert.alert("Feedback", "Feedback feature coming soon!");
  };

  return (
    <Card style={styles.card}>
      <Row style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                image_url?.length > 0 ? image_url : "https://picsum.photos/80",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Column style={styles.detailsContainer}>
          <RText style={styles.title} numberOfLines={2}>
            {title}
          </RText>
          <RText style={styles.description} numberOfLines={1}>
            Premium beauty product for daily use
          </RText>

          <Row style={styles.priceContainer}>
            <RText style={styles.costLabel}>Cost: </RText>
            <RText style={styles.currentPrice}>{formatPrice(price)}</RText>
            <RText style={styles.arrow}> → </RText>
            <RText style={styles.originalPrice}>
              {formatPrice(price * 1.2)}
            </RText>
          </Row>

          <Row style={styles.buttonContainer}>
            <Button
              _type="Stroke"
              _set={{
                onPress: handleRepurchase,
                style: styles.repurchaseButton,
              }}
            >
              <RText style={styles.buttonText}>Repurchase</RText>
            </Button>

            <Button
              _type="Stroke"
              _set={{
                onPress: handleFeedback,
                style: styles.feedbackButton,
              }}
            >
              <RText style={styles.buttonTextSecondary}>Feedback</RText>
            </Button>
          </Row>
        </Column>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  container: {
    alignItems: "flex-start",
    gap: 12,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fce7f3",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 18,
  },
  priceContainer: {
    alignItems: "center",
    flexWrap: "wrap",
  },
  costLabel: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ef4444",
  },
  arrow: {
    fontSize: 14,
    color: "#6b7280",
    marginHorizontal: 4,
  },
  originalPrice: {
    fontSize: 14,
    color: "#6b7280",
    textDecorationLine: "line-through",
  },
  buttonContainer: {
    gap: 8,
    marginTop: 4,
  },
  repurchaseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: "#F23059",
    borderRadius: 6,
    minWidth: 100,
  },
  feedbackButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: "#6b7280",
    borderRadius: 6,
    minWidth: 80,
  },
  buttonText: {
    fontSize: 14,
    color: "#F23059",
    fontWeight: "500",
  },
  buttonTextSecondary: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
});
