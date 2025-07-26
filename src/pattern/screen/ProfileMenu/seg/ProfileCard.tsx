import { Begin, Card, Column, Row, RText } from "@/src/libs/by";
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";

export function ProfileCard({ name, phone }: { name: string; phone: string; }) {
  return (
    <Card style={styles.card}>
      <Row style={{ alignItems: 'center', gap: 12 }}>
        <Begin style={styles.avatar}><RText style={styles.avatarText}>{name[0]}</RText></Begin>
        <Column style={{ flex: 1 }}>
          <RText style={styles.name}>{name}</RText>
          <RText style={styles.phone}>{phone}</RText>
        </Column>
        <Ionicons name="bag-outline" size={28} color="#F23059" />
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F23059', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
  name: { fontWeight: 'bold', fontSize: 18 },
  phone: { color: '#888', fontSize: 14 },
  pointsBox: { marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  pointsLabel: { color: '#F23059', fontWeight: 'bold', fontSize: 15 },
  points: { color: '#F23059', fontWeight: 'bold', fontSize: 15 },
});
