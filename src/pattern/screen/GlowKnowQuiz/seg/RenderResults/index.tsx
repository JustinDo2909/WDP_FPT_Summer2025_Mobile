"use client";

import { Container, RText, Section } from "@/src/libs/by";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export function RenderResults(props: {
  finalScore: { correct: number; total: number };
  rewardTiers: { correct: number; reward: string }[];
  getEarnedReward: (correct: number) => string | null;
}) {
  const { finalScore, rewardTiers, getEarnedReward } = props;

  const router = useRouter();

  const earnedReward = getEarnedReward(finalScore.correct);
  const rewardHookItems = Array.from({ length: 20 }, (_, i) => 20 - i);

  const handleBackMenu = () => {
    router.push(`/root/dynamic?path=/Home`);
  };

  return (
    <Container style={resultStyles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Section style={resultStyles.header}>
          <TouchableOpacity
            style={resultStyles.headerButton}
            onPress={handleBackMenu}
          >
            <RText style={resultStyles.headerButtonText}>Shop</RText>
          </TouchableOpacity>
          {/* <TouchableOpacity style={resultStyles.headerButton}>
            <RText style={resultStyles.headerButtonText}>Redeem</RText>
          </TouchableOpacity> */}
        </Section>

        <RText style={resultStyles.congratsTitle}>Congratulation!</RText>

        <View style={resultStyles.scoreCard}>
          <RText style={resultStyles.scoreText}>
            <RText style={resultStyles.scoreNumber}>
              {finalScore.correct}/{finalScore.total}
            </RText>{" "}
            questions correct
          </RText>
        </View>

        <RText style={resultStyles.yourRewardTitle}>Your reward</RText>
        <View style={resultStyles.rewardCard}>
          <MaterialCommunityIcons
            name="ticket-percent-outline"
            size={24}
            color="#ef4444"
          />
          <RText style={resultStyles.rewardText}>
            {earnedReward || "No reward achieved"}
          </RText>
        </View>

        <RText style={resultStyles.congratsScript}>Congratulations!</RText>

        <View style={resultStyles.hookContainer}>
          <RText style={resultStyles.hookTitle}>Reward hook</RText>
          <ScrollView style={resultStyles.hookList} nestedScrollEnabled>
            {rewardHookItems.map((num) => {
              const tier = rewardTiers.find((t) => t.correct === num);
              return (
                <View
                  key={num}
                  style={[
                    resultStyles.hookItem,
                    finalScore.correct === num &&
                      resultStyles.hookItemHighlight,
                  ]}
                >
                  <RText style={resultStyles.hookItemText}>
                    # Correct {num}/{finalScore.total} :
                  </RText>
                  {tier && (
                    <View style={resultStyles.hookReward}>
                      <MaterialCommunityIcons
                        name="ticket-percent-outline"
                        size={18}
                        color="#ef4444"
                      />
                      <RText style={resultStyles.hookRewardText}>
                        {tier.reward}
                      </RText>
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </Container>
  );
}
const resultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  congratsTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ef4444",
    textAlign: "center",
    marginVertical: 20,
  },
  scoreCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "500",
  },
  scoreNumber: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 22,
  },
  yourRewardTitle: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  rewardCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    gap: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ef4444",
  },
  congratsScript: {
    fontFamily: "cursive",
    fontSize: 48,
    color: "#f4a261",
    textAlign: "center",
    marginVertical: 20,
    opacity: 0.5,
  },
  hookContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },
  hookTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  hookList: {
    maxHeight: 250,
  },
  hookItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  hookItemHighlight: {
    borderColor: "#ef4444",
    borderWidth: 2,
    backgroundColor: "#fef2f2",
  },
  hookItemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  hookReward: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  hookRewardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ef4444",
  },
});
