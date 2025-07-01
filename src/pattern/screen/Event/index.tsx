import {
  Block,
  Button,
  Column,
  Container,
  Row,
  RText,
  Section,
  Wrap,
} from "@/src/libs/by";
import { sStore } from "@/src/stores";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
interface GameEvent {
  id: string;
  title: string;
  description: string;
  gradient: [string, string];
  isComingSoon?: boolean;
  icon?: string;
  route?: string;
}

export function Event() {
  const router = useRouter();
  const ss = sStore();
  const gameEvents: GameEvent[] = [
    {
      id: "1",
      title: "Glow & Know?",
      description: "Test your beauty IQ and unlock exclusive rewards!",
      gradient: ["#ef4444", "#7f1d1d"], // red-500 to red-950
      icon: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWgRpE1y0PbRCkXY9LnGeq3s0xvu1DfoHdiypw",
      route: "GlowKnowQuiz",
    },
    {
      id: "2",
      title: "Skincare Stack",
      description: "Build Your Routine, Reap Your Rewards!",
      gradient: ["#000000", "#737373"], // black to neutral-400
      isComingSoon: true,
      icon: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWJO2IWBb8oq4Kbj9AfXElYCFHPx6VGdDynW1t",
      route: "SkinCareStack",
    },
    {
      id: "3",
      title: "Product Pursuit",
      description: "Find the Hidden Gems, Win Big!",
      gradient: ["#3b82f6", "#c4b5fd"], // blue-500 to violet-300
      isComingSoon: true,
      icon: "https://hzjfxfzm26.ufs.sh/f/KMp0egfMgYyWs3ZLKz5puPxTBasbNvKnjZzRAoIOXMS7cLdU",
      route: "ProductPursuit",
    },
  ];

  const handleGamePress = (game: GameEvent) => {
    if (!game.isComingSoon) {
      ss.setPickData({ NavHeading: "Back" });
      router.push(`/root/dynamic?path=/${game.route}`);
    } else {
      router.push(`/root/dynamic?path=/ComingSoon`);
    }
  };

  return (
    <Container style={styles.container}>
      {/* Title Section */}
      <Section style={styles.titleSection}>
        <Row style={styles.titleRow}>
          <Row style={styles.titleContent}>
            <Wrap>
              <RText style={styles.mainTitle}>CosmePlay{"\n"}Event</RText>
              <Image
                source={{
                  uri: "https://icons.veryicon.com/png/o/miscellaneous/ds/13-exclamation-mark.png",
                }}
                style={styles.titleIcon}
              />
            </Wrap>
            <RText style={styles.subtitle}>Play, Win, Glow!</RText>
          </Row>

          <Row style={styles.actionButtons}>
            <Button _type="Icon" _set={{ style: styles.actionButton }}>
              <MaterialIcons name="history" size={24} color="black" />
            </Button>
            <Button _type="Icon" _set={{ style: styles.actionButton }}>
              <FontAwesome5 name="home" size={24} color="black" />
            </Button>
          </Row>
        </Row>
      </Section>

      {/* Games List */}
      <ScrollView style={styles.gamesList} showsVerticalScrollIndicator={false}>
        <Column style={styles.gamesContainer}>
          {gameEvents.map((game) => (
            // <Block style={styles.shadowWrapper}>
            <Button
              key={game.id}
              _type="Icon"
              _set={{
                style: styles.gameCard,
                onPress: () => handleGamePress(game),
              }}
            >
              {() => (
                <LinearGradient
                  colors={game.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientBackground}
                >
                  <Row style={styles.gameContent}>
                    {/* Game Icon */}
                    <Block style={styles.gameIconContainer}>
                      {game.icon ? (
                        <Image
                          source={{ uri: game.icon }}
                          style={styles.gameIconImage}
                          resizeMode="cover"
                        />
                      ) : null}
                    </Block>

                    {/* Game Info */}
                    <Column style={styles.gameInfo}>
                      <RText style={styles.gameTitle}>{game.title}</RText>
                      <RText style={styles.gameDescription}>
                        {game.description}
                      </RText>
                    </Column>

                    {/* Coming Soon Badge */}
                    {game.isComingSoon && (
                      <Block style={styles.comingSoonBadge}>
                        <RText style={styles.comingSoonText}>
                          Coming soon...
                        </RText>
                      </Block>
                    )}
                  </Row>
                </LinearGradient>
              )}
            </Button>
            // </Block>
          ))}
        </Column>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  titleSection: {
    width: "100%",
    paddingVertical: 10,
  },
  titleRow: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContent: {
    flex: 1,
    alignItems: "flex-end",
  },
  mainTitle: {
    color: "#8b5cf6",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "laila, sans-serif, system-ui, roboto",
    textAlign: "center",
  },
  titleIcon: {
    width: 14,
    height: 40,
    transform: [{ rotate: "10deg" }],
  },
  subtitle: {
    color: "#333",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 5,
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    minHeight: 38,
    minWidth: 38,
    backgroundColor: "#fff",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  gamesList: {
    flex: 1,
  },
  gamesContainer: {
    gap: 20,
    paddingBottom: 20,
  },
  gameCard: {
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    backgroundColor: "transparent",
    minHeight: 80,
  },
  gradientBackground: {
    borderRadius: 10,
    minHeight: 80,
    width: "100%",
    justifyContent: "center",
  },
  gameContent: {
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  gameIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  gameIconText: {
    color: "black",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    position: "absolute",
  },
  gameIconImage: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },
  gameInfo: {
    flex: 1,
    gap: 10,
  },
  gameTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  gameDescription: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  comingSoonBadge: {
    position: "absolute",
    right: 10,
    bottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  comingSoonText: {
    color: "#be185d", // pink-800
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
