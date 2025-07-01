"use client";

import { Column, Container, Row, RText, Wrap } from "@/src/libs/by";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

interface ComingSoonProps {
  gameTitle?: string;
}

export function ComingSoon({ gameTitle = "Game Event" }: ComingSoonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/root/dynamic?path=/Event`);
  };

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={["#ffe4e6", "#fce7f3", "#fdf2f8"]}
      style={styles.container}
    >
      <Container style={styles.innerContainer}>
        <Column style={styles.centerContent}>
          {/* Title */}
          <Animated.View
            style={{
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim,
              alignItems: "center",
            }}
          >
            <Row style={styles.titleContent}>
              <Wrap>
                <RText style={styles.mainTitle}>CosmePlay {"\n"}Event</RText>
                <Image
                  source={{
                    uri: "https://icons.veryicon.com/png/o/miscellaneous/ds/13-exclamation-mark.png",
                  }}
                  style={styles.titleIcon}
                />
              </Wrap>
              <RText style={styles.subtitle}>Play, Win, Glow!</RText>
            </Row>
          </Animated.View>

          {/* COMING SOON */}
          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <RText style={styles.comingSoonText}>🚧 COMING SOON 🚧</RText>
          </Animated.View>

          {/* Description & Features */}
          <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
            <RText style={styles.descriptionText}>
              We're currently working on this exciting feature.{"\n"}Stay tuned
              and get ready for the ultimate beauty game experience!
            </RText>

            <View style={styles.featureList}>
              <RText style={styles.featureItem}>• Daily challenges</RText>
              <RText style={styles.featureItem}>• Exclusive rewards</RText>
              <RText style={styles.featureItem}>• Multi-device support</RText>
              <RText style={styles.featureItem}>• Style, score & share</RText>
            </View>

            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <RText style={styles.backText}>Back to Events</RText>
            </TouchableOpacity>

            <RText style={styles.footerHint}>
              Follow us for updates and launch announcements!
            </RText>
          </Animated.View>
        </Column>
      </Container>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 26,
  },
  titleContent: {
    alignItems: "flex-end",
  },
  mainTitle: {
    color: "#8b5cf6",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleIcon: {
    width: 14,
    height: 40,
    transform: [{ rotate: "10deg" }],
    marginTop: 5,
  },
  subtitle: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 4,
  },
  comingSoonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e11d48",
    textAlign: "center",
    letterSpacing: 1.2,
  },
  descriptionText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 320,
  },
  featureList: {
    marginTop: 14,
    alignItems: "flex-start",
  },
  featureItem: {
    fontSize: 15,
    color: "#7c3aed",
    marginBottom: 5,
  },
  backButton: {
    marginTop: 24,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#f472b6",
    borderRadius: 24,
    shadowColor: "#f472b6",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  backText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  footerHint: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 24,
    textAlign: "center",
  },
});
