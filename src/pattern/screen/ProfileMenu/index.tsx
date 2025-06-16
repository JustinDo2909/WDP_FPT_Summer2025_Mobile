import { Button, Container, RText } from "@/src/libs/by";
import { ScrollView, StyleSheet, View } from "react-native";
import Context from "./seg/context";
import { ProfileCard } from "./seg/ProfileCard";

export function ProfileMenu() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          // UserInfo may be present or not, fallback to mock if not
          const user = (ss.Auth && 'UserInfo' in ss.Auth && ss.Auth.UserInfo && (ss.Auth.UserInfo as any).name)
            ? ss.Auth.UserInfo as { name: string; phone: string; points: number }
            : { name: "Nguyen Kheu Anh Wuan", phone: "025 555 5555", points: 1280 };
          return (
            <Container style={{ backgroundColor: '#fff', flex: 1, padding: 0 }}>
              <ScrollView style={{ flex: 1 }}>
                <ProfileCard name={user.name} phone={user.phone} points={user.points} />
                <View style={styles.menuBox}>
                  <Button _set={{ onPress: () => {} }} _type="Stroke"><RText>View purchase history</RText></Button>
                  <Button _set={{ onPress: () => {} }} _type="Stroke"><RText>Tracking order</RText></Button>
                </View>
                <View style={styles.menuBox}>
                  <RText style={styles.sectionTitle}>Support</RText>
                  <Button _set={{ onPress: () => {} }} _type="Stroke"><RText>Support center</RText></Button>
                  <Button _set={{ onPress: () => {} }} _type="Stroke"><RText>Chat with CosmePlay</RText></Button>
                  <Button _set={{ onPress: () => {} }} _type="Stroke"><RText>Web platform</RText></Button>
                </View>
              </ScrollView>
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  menuBox: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, padding: 12, gap: 8 },
  sectionTitle: { fontWeight: 'bold', color: '#F23059', marginBottom: 8 },
});