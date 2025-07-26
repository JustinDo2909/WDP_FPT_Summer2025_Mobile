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
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Context from "./seg/context";

export function Event() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const router = useRouter();

          useEffect(() => {
            if (ss.Joint.Events && ss.Joint.Events.length >= 0) {
              setIsLoading(false);
            }
          }, [ss.Joint.Events]);

          // Define gradient colors for fallback
          const gradients: [string, string][] = [
            ["#ef4444", "#7f1d1d"], // red-500 to red-950
            ["#000000", "#737373"], // black to neutral-400
            ["#3b82f6", "#c4b5fd"], // blue-500 to violet-300
            ["#10b981", "#064e3b"], // emerald-500 to emerald-950
            ["#f59e0b", "#78350f"], // amber-500 to amber-950
            ["#8b5cf6", "#4c1d95"], // violet-500 to violet-950
          ];

          const handleEventPress = (event: IEvent) => {
            if (!event.is_active || event.type === "DROP") {
              router.push(`/root/dynamic?path=/ComingSoon`);
            } else {
              let route = "Event";
              if (event.type === "QUIZ") {
                route = "GlowKnowQuiz";
              } else if (event.type) {
                route = `${event.type.replace(/\s+/g, "")}Event`;
              }
              ss.setPickData({ NavHeading: "Back" });
              router.push(`/root/dynamic?path=/${route}`);
            }
          };

          if (isLoading) {
            return (
              <Container style={styles.loadingContainer}>
                <Image
                  source={require("../../../../assets/images/logo.png")}
                  style={styles.loadingImage}
                  resizeMode="contain"
                />
              </Container>
            );
          }

          return (
            <Container style={styles.container}>
              {/* Title Section */}
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

                  {/* <Row style={styles.actionButtons}>
                    <Button _type="Icon" _set={{ style: styles.actionButton }}>
                      <MaterialIcons name="history" size={24} color="black" />
                    </Button>
                    <Button _type="Icon" _set={{ style: styles.actionButton }}>
                      <FontAwesome5 name="home" size={24} color="black" />
                    </Button>
                  </Row> */}
                </Row>
              </Section>

              {/* Events List */}
              <ScrollView
                style={styles.gamesList}
                showsVerticalScrollIndicator={true}
              >
                <Column style={styles.gamesContainer}>
                  {(ss.Joint.Events ?? []).length > 0 ? (
                    (ss.Joint.Events ?? []).map(
                      (event: IEvent, index: number) => (
                        <Button
                          key={event.id ?? `event-${index}`}
                          _type="Icon"
                          _set={{
                            style: styles.gameCard,
                            onPress: () => handleEventPress(event),
                          }}
                        >
                          {() =>
                            event.image_url ? (
                              <ImageBackground
                                source={{ uri: event.image_url }}
                                style={styles.gradientBackground}
                                imageStyle={styles.backgroundImage}
                              >
                                <View style={styles.overlay}>
                                  <Row style={styles.gameContent}>
                                    {/* Event Icon */}
                                    <Block style={styles.gameIconContainer}>
                                      {event.image_url ? (
                                        <Image
                                          source={{ uri: event.image_url }}
                                          style={styles.gameIconImage}
                                          resizeMode="cover"
                                        />
                                      ) : null}
                                    </Block>

                                    {/* Event Info */}
                                    <Column style={styles.gameInfo}>
                                      <RText style={styles.gameTitle}>
                                        {event.title ?? "Unnamed Event"}
                                      </RText>
                                      <RText style={styles.gameDescription}>
                                        {event.description ??
                                          "No description available"}
                                      </RText>
                                    </Column>

                                    {/* Coming Soon Badge */}
                                    {!event.is_active && (
                                      <Block style={styles.comingSoonBadge}>
                                        <RText style={styles.comingSoonText}>
                                          Coming soon...
                                        </RText>
                                      </Block>
                                    )}
                                  </Row>
                                </View>
                              </ImageBackground>
                            ) : (
                              <LinearGradient
                                colors={gradients[index % gradients.length]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.gradientBackground}
                              >
                                <Row style={styles.gameContent}>
                                  {/* Event Icon */}
                                  <Block style={styles.gameIconContainer}>
                                    {event.image_url ? (
                                      <Image
                                        source={{ uri: event.image_url }}
                                        style={styles.gameIconImage}
                                        resizeMode="cover"
                                      />
                                    ) : null}
                                  </Block>

                                  {/* Event Info */}
                                  <Column style={styles.gameInfo}>
                                    <RText style={styles.gameTitle}>
                                      {event.title ?? "Unnamed Event"}
                                    </RText>
                                    <RText style={styles.gameDescription}>
                                      {event.description ??
                                        "No description available"}
                                    </RText>
                                  </Column>

                                  {/* Coming Soon Badge */}
                                  {!event.is_active && (
                                    <Block style={styles.comingSoonBadge}>
                                      <RText style={styles.comingSoonText}>
                                        Coming soon...
                                      </RText>
                                    </Block>
                                  )}
                                </Row>
                              </LinearGradient>
                            )
                          }
                        </Button>
                      )
                    )
                  ) : (
                    <RText style={styles.noEventsText}>
                      No events available
                    </RText>
                  )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingImage: {
    width: 100,
    height: 100,
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
    backgroundColor: "#000",
    minHeight: 80,
  },
  gradientBackground: {
    borderRadius: 10,
    minHeight: 80,
    width: "100%",
    justifyContent: "center",
  },
  backgroundImage: {
    borderRadius: 10,
    opacity: 0.6,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Dark overlay for text contrast
    borderRadius: 10,
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
    padding: 10,
  },
  gameTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  gameDescription: {
    color: "white",
    fontSize: 16,
    fontWeight: "400",
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
  noEventsText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});
