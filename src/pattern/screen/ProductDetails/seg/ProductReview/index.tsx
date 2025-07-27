import { useState } from "react";
import { Box, Button, RText } from "@/src/libs/by";
import { Image, View } from "react-native";

export const ProductReview = ({
  reviews = [],
  rating,
}: {
  reviews?: IReview[];
  rating: number;
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 1);

  return (
    <Box style={{ paddingVertical: 8, backgroundColor: "#fff", gap: 0 }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 8,
          paddingHorizontal: 6,
        }}
      >
        <RText style={{ fontSize: 18, fontWeight: "bold" }}>
          {rating.toFixed(1)}
        </RText>
        <RText style={{ fontSize: 18, marginLeft: 4 }}>⭐</RText>
        <RText style={{ fontSize: 18, marginLeft: 8, fontWeight: "500" }}>
          Product review
        </RText>
      </View>

      {/* Review Boxes */}
      {displayedReviews.length > 0 ? (
        displayedReviews.map((review) => (
          <View
            key={review.id}
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "#ddd",
              paddingVertical: 12,
              paddingHorizontal: 6,
              marginBottom: 6,
            }}
          >
            {/* User Info + Rating */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: "https://i.imgur.com/kd9g9Xs.png" }}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 18,
                    marginRight: 8,
                  }}
                />
                <RText style={{ fontWeight: "bold", fontSize: 15 }}>
                  {review.user_name}
                </RText>
              </View>
              <RText style={{ fontSize: 16 }}>
                {"⭐".repeat(review.review_value)}
              </RText>
            </View>

            {/* Review Text */}
            <RText style={{ fontSize: 14, color: "#333", lineHeight: 18 }}>
              {review.review_message}
            </RText>
          </View>
        ))
      ) : (
        <RText style={{ paddingHorizontal: 6, color: "#999" }}>
          No reviews yet.
        </RText>
      )}

      {/* View All / Collapse Toggle */}
      {reviews.length > 1 && (
        <Button
          _set={{
            onPress: () => setShowAll(!showAll),
            style: {
              flex: 1,
              alignItems: "center",
              marginTop: 4,
            },
          }}
        >
          <RText style={{ fontSize: 16, fontWeight: "bold" }}>
            {showAll ? "Collapse ▲" : "View All ➔"}
          </RText>
        </Button>
      )}
    </Box>
  );
};
