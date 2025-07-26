import { Column, Container, RText, Section } from "@/src/libs/by";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

export function MenuGlowKnow({ onPlay }: { onPlay: () => Promise<void> }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = async () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    try {
      await onPlay(); // Call handlePlayGame, proceeds to GamePlay on success
    } catch (error: any) {
      Alert.alert(
        "Unable to Play",
        error.message || "An error occurred. Please try again later.",
        [{ text: "OK" }]
      );
    }
  };

  const handleExit = () => {
    router.back(); // Navigate back to previous page
  };

  return (
    <ImageBackground
      source={{ uri: "https://yourdomain.com/path-to-image.jpg" }}
      style={{ flex: 1 }}
      resizeMode="cover"
      blurRadius={3}
    >
      <Container style={styles.container}>
        <Section style={styles.titleSection}>
          <Column style={styles.titleColumn}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <RText style={styles.gameTitle}>Glow & Know</RText>
              <RText style={styles.gameSubTitle}>
                Your Beauty Brain Teaser!
              </RText>
            </Animated.View>
            <RText style={styles.gameDescription}>
              Glow & Know is the ultimate beauty quiz game for all cosmetics
              enthusiasts. Challenge your knowledge with hundreds of questions
              covering skincare, makeup, brands, and beauty history. Play,
              learn, and glow as a true beauty expert!
            </RText>
          </Column>
        </Section>

        <Section style={styles.buttonSection}>
          <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}
          >
            <Animated.View
              style={[styles.playButton, { transform: [{ scale: scaleAnim }] }]}
            >
              <RText style={styles.playText}>Play Now!</RText>
            </Animated.View>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
            <RText style={styles.exitText}>Exit</RText>
          </TouchableOpacity>
        </Section>
      </Container>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5", // light pink
    justifyContent: "center",
  },
  titleSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  titleColumn: {
    alignItems: "center",
    gap: 10,
  },
  gameTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ef4444",
  },
  gameSubTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f97316",
  },
  gameDescription: {
    marginTop: 15,
    fontSize: 16,
    textAlign: "center",
    color: "#475569",
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonSection: {
    paddingHorizontal: 40,
    gap: 20,
  },
  playButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  playText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  exitButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    borderColor: "#ef4444",
    borderWidth: 2,
  },
  exitText: {
    color: "#ef4444",
    fontSize: 16,
    fontWeight: "600",
  },
});
