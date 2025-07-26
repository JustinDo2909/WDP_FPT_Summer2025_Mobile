import { Button, Container, RText } from "@/src/libs/by";
import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Context from "./seg/context";
import { ProfileCard } from "./seg/ProfileCard";

export function ProfileMenu() {
  const { navigate } = useCustomRouter();

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const user = ss.Auth.User ?? {
            name: "Nguyen Kheu Anh Wuan",
            phone: "025 555 5555",
            points: 1280,
          };

          const handleViewPurchaseHistory = () => navigate({ pathSegments: ["PurchaseHistory"] });
          // const handleTrackOrder = () => navigate({ pathSegments: ["TrackOrder"] });
          const handleSupportCenter = () => navigate({ pathSegments: ["SupportCenter"] });
          const handleChat = () => navigate({ pathSegments: ["Chat"] });
          const handleViewVouchers = () => navigate({ pathSegments: ["Vouchers"] });
          const handleWebPlatform = () => navigate({ pathSegments: ["WebPlatform"] });

          return (
            <Container style={styles.container}>
              <ScrollView style={{ flex: 1 }}>
                <Animated.View entering={FadeInDown.duration(300)}>
                  <ProfileCard
                    name={user.name ?? ""}
                    phone={'02555 555 555'}
                  />
                  <View style={styles.menuBox}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleViewPurchaseHistory}
                      accessibilityLabel="View purchase history"
                    >
                      <Ionicons name="time-outline" size={20} color="#E0224A" />
                      <RText style={styles.buttonText}>View purchase history</RText>
                      <Ionicons name="chevron-forward" size={(20)} color="#E0224A" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                      style={styles.button}
                      // onPress={handleTrackOrder}
                      accessibilityLabel="Track order"
                    >
                      <Ionicons name="map-outline" size={(20)} color="#E0224A" />
                      <RText style={styles.buttonText}>Track order</RText>
                      <Ionicons name="chevron-forward" size={(20)} color="#E0224A" />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleViewVouchers}
                      accessibilityLabel="View Vouchers"
                    >
                      <Ionicons name="gift" size={(20)} color="#E0224A" />
                      <RText style={styles.buttonText}>View Vouchers</RText>
                      <Ionicons name="chevron-forward" size={(20)} color="#E0224A" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.menuBox}>
                    <RText style={styles.sectionTitle}>Support</RText>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSupportCenter}
                      accessibilityLabel="Support center"
                    >
                      <Ionicons name="help-circle-outline" size={(20)} color="#E0224A" />
                      <RText style={styles.buttonText}>Support center</RText>
                      <Ionicons name="chevron-forward" size={(20)} color="#E0224A" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleChat}
                      accessibilityLabel="Chat with CosmePlay"
                    >
                      <Ionicons name="chatbubble-outline" size={(20)} color="#E0224A" />
                      <RText style={styles.buttonText}>Chat with CosmePlay</RText>
                      <Ionicons name="chevron-forward" size={(20)} color="#E0224A" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleWebPlatform}
                      accessibilityLabel="Web platform"
                    >
                      <Ionicons name="globe-outline" size={(20)} color="#E0224A" />
                      <RText style={styles.buttonText}>Web platform</RText>
                      <Ionicons name="chevron-forward" size={(20)} color="#E0224A" />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
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
    backgroundColor: "#F9F9F9",
    flex: 1,
    padding: 0,
  },
  menuBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: "600",
    color: "#E0224A",
    fontSize: (20),
    marginBottom: 2,
    marginLeft: 4
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
  },
  buttonText: {
    flex: 1,
    fontSize: (14),
    color: '#333',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 8,
  },
});