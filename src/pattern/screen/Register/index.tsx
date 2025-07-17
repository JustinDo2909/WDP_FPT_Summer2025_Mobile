import {
  Begin,
  Block,
  Button,
  Card,
  Container,
  Content,
  End,
  FieldText,
  RText,
} from "@/src/libs/by";
import { Label } from "@/src/libs/by/Label";
import { init } from "@/src/process/constants";
import { valid } from "@/src/process/helper";
import { useRouter } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Context from "./seg/context";

export function Register() {
  const router = useRouter();
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ methods: { handleSubmit }, meds, loading }) => {
          return (
            <Container style={styles.container}>
              <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <Block style={styles.mainBlock}>
                  {/* Premium Background Gradient Effect */}
                  <View style={styles.backgroundGradient} />

                  {/* Luxury Card Container */}
                  <Card style={styles.luxuryCard}>
                    {/* Premium Logo Section */}
                    <Begin style={styles.logoSection}>
                      {/* Welcome Text */}
                      <View style={styles.welcomeSection}>
                        <RText style={styles.welcomeTitle}>
                          Join CosmePlay
                        </RText>
                        <RText style={styles.welcomeSubtitle}>
                          Create your premium beauty account
                        </RText>
                      </View>
                    </Begin>

                    {/* Form Content */}
                    <Content style={styles.formContent}>
                      <View style={styles.inputContainer}>
                        <FieldText
                          name="fields.name"
                          label={
                            <Label text={"Name"} style={styles.inputLabel} />
                          }
                          placeholder="Enter your name"
                          rules={valid.required()}
                          style={{ input: styles.luxuryInput }}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <FieldText
                          name="fields.email"
                          label={
                            <Label text={"Email"} style={styles.inputLabel} />
                          }
                          placeholder="Enter your email"
                          rules={valid.required()}
                          style={{ input: styles.luxuryInput }}
                        />
                      </View>

                      <View style={styles.inputContainer}>
                        <FieldText
                          name="fields.password"
                          label={
                            <Label text={"Password"} style={styles.inputLabel} />
                          }
                          placeholder="Enter your password"
                          rules={valid.required()}
                          type="password"
                          style={{ input: styles.luxuryInput }}
                        />
                      </View>
                    </Content>

                    {/* Action Buttons */}
                    <End style={styles.actionSection}>
                      {/* Primary Register Button */}
                      <View style={styles.buttonWrapper}>
                        <Button
                          _set={{
                            onPress: () => {
                              if (!loading) handleSubmit(meds.onRegister)();
                            },
                            style: {
                              backgroundColor: init.Color.PrimaryBrand,
                              paddingVertical: 8,
                              height: 64,
                              opacity: loading ? 0.7 : 1,
                            },
                            disabled: loading,
                          }}
                          _type="Full"
                          _kind="Oke"
                        >
                          <RText
                            style={{
                              color: "#fff",
                              fontWeight: "bold",
                              fontSize: 16,
                            }}
                          >
                            {loading ? "Registering..." : "Register"}
                          </RText>
                        </Button>
                      </View>

                      {/* Sign In Section */}
                      <View style={styles.signUpSection}>
                        <RText style={styles.signUpText}>
                          Already have an account?
                        </RText>
                        <Button
                          _type="Fill"
                          _set={{
                            onPress: () => {
                              meds.navigateToRegis();
                            },
                            style: styles.signUpButton,
                          }}
                        >
                          <RText style={styles.signUpLink}>Sign in now</RText>
                        </Button>
                      </View>

                      {/* Continue as Guest Button */}
                      <View style={styles.buttonWrapper}>
                        <Button
                          _type="Fill"
                          _set={{
                            style: styles.guestButton,
                            onPress: () => {
                              router.push("/root");
                            },
                          }}
                        >
                          <RText style={styles.guestButtonText}>
                            Continue as guest
                          </RText>
                        </Button>
                      </View>
                    </End>
                  </Card>
                </Block>
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
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  mainBlock: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    minHeight: "100%",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: init.Color.PrimaryBrand,
    opacity: 0.08,
    borderRadius: 24,
  },
  luxuryCard: {
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeSection: {
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: init.Color.PrimaryBrand,
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  formContent: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  luxuryInput: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    color: "#374151",
    borderRadius: 12,
  },
  actionSection: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: 16,
  },
  buttonWrapper: {
    width: "100%",
  },
  signUpSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 8,
  },
  signUpText: {
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "400",
  },
  signUpButton: {
    backgroundColor: "transparent",
    paddingVertical: 0,
    paddingHorizontal: 4,
    marginLeft: 2,
  },
  signUpLink: {
    fontSize: 15,
    fontWeight: "600",
    color: init.Color.PrimaryBrand,
  },
  guestButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 8,
  },
  guestButtonText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
  },
});