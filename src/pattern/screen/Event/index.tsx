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
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import Context from "./seg/context";

export function Event() {
  const router = useRouter();

  // Hàm chọn màu nền dựa trên image_url hoặc index
  const getBackgroundColor = (
    imageUrl: string | undefined,
    index: number
  ): string => {
    if (!imageUrl) {
      const defaultColors = ["#ef4444", "#000000", "#3b82f6"];
      return defaultColors[index % defaultColors.length];
    }
    if (imageUrl.includes("red")) return "#ef4444";
    if (imageUrl.includes("black")) return "#000000";
    if (imageUrl.includes("blue")) return "#3b82f6";
    return "#6b7280"; // Màu xám mặc định
  };

  const handleGamePress = (event: IEvent) => {
    if (!event.is_active) {
      router.push(`/root/dynamic?path=/ComingSoon`);
      return;
    }
    const routeMap: { [key: string]: string } = {
      DROP: "BeautyDrop",
      QUIZ: "GlowKnowQuiz",
    };
    const route = routeMap[event.type || ""] || "ComingSoon";
    router.push(`/root/dynamic?path=/${route}`);
  };

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const events = ss.Joint?.Events ?? [];

          return (
            <Container style={styles.container}>
              <Section style={styles.titleSection}>
                <Row style={styles.titleRow}>
                  <Row style={styles.titleContent}>
                    <Wrap>
                      <RText style={styles.mainTitle}>
                        CosmePlay{"\n"}Event
                      </RText>
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
              <ScrollView
                style={styles.gamesList}
                showsVerticalScrollIndicator={false}
              >
                <Column style={styles.gamesContainer}>
                  {events.map((event, index) => (
                    <Button
                      key={event.id || `event-${index}`}
                      _type="Icon"
                      _set={{
                        style: styles.gameCard,
                        onPress: () => handleGamePress(event),
                      }}
                    >
                      {() => (
                        <Block
                          style={[
                            styles.gradientBackground,
                            {
                              backgroundColor: getBackgroundColor(
                                event.image_url,
                                index
                              ),
                            },
                          ]}
                        >
                          <Row style={styles.gameContent}>
                            <Block style={styles.gameIconContainer}>
                              {event.image_url ? (
                                <Image
                                  source={{ uri: event.image_url }}
                                  style={styles.gameIconImage}
                                  resizeMode="cover"
                                />
                              ) : null}
                            </Block>
                            <Column style={styles.gameInfo}>
                              <RText style={styles.gameTitle}>
                                {event.title || "Untitled Event"}
                              </RText>
                              <RText style={styles.gameDescription}>
                                {event.description ||
                                  "No description available"}
                              </RText>
                            </Column>
                            {!event.is_active && (
                              <Block style={styles.comingSoonBadge}>
                                <RText style={styles.comingSoonText}>
                                  Coming soon...
                                </RText>
                              </Block>
                            )}
                          </Row>
                        </Block>
                      )}
                    </Button>
                  ))}
                </Column>
              </ScrollView>
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
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
    color: "#be185d",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
