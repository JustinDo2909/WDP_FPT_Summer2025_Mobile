import { Begin, Block, Button, Card, Container, Content, End, FieldText, RText } from "@/src/libs/by";
import { Label } from "@/src/libs/by/Label";
import { init } from "@/src/process/constants";
import { valid } from "@/src/process/helper";
import * as React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import Context from "./seg/context";

export function SignIn() {
  const router = useRouter()
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ methods: { handleSubmit }, meds }) => {
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
                      {/* <View style={styles.logoContainer}>
                        <Image
                          source={{
                            uri: `${init?.Env?.URL_MINIO}/mobile/assets/img/division/Login-Logo.png`,
                          }}
                          style={styles.logo}
                        />
                      </View> */}
                      
                      {/* Welcome Text */}
                      <View style={styles.welcomeSection}>
                        <RText style={styles.welcomeTitle}>
                          Welcome to CosmePlay
                        </RText>
                        <RText style={styles.welcomeSubtitle}>
                          Your premium beauty destination
                        </RText>
                      </View>
                    </Begin>

                    {/* Form Content */}
                    <Content style={styles.formContent}>
                      <View style={styles.inputContainer}>
                        <FieldText
                          name="fields.email"
                          label={<Label text={"Email"} style={styles.inputLabel} />}
                          placeholder="Enter your email"
                          rules={valid.required()}
                          style={{ input: styles.luxuryInput }}
                        />
                      </View>
                      
                      <View style={styles.inputContainer}>
                        <FieldText
                          name="fields.password"
                          label={<Label text={"Password"} style={styles.inputLabel} />}
                          placeholder="Enter your password"
                          rules={valid.required()}
                          type="password"
                          style={{ input: styles.luxuryInput }}
                        />
                      </View>

                      {/* Forgot Password Link */}
                      <View style={styles.forgotPasswordContainer}>
                        <Button
                          _type="Default"
                          _set={{
                            onPress: () => {},
                            // style: styles.forgotPasswordButton,
                          }}
                        >
                          <RText style={styles.forgotPasswordText}>
                            Forgot password?
                          </RText>
                        </Button>
                      </View>
                    </Content>

                    {/* Action Buttons */}
                    <End style={styles.actionSection}>
                      {/* Primary Sign In Button */}
                      <View style={styles.buttonWrapper}>
                        <Button
                          _set={{
                            onPress: () => {
                              console.log("Sign In pressed");
                              handleSubmit(meds.onSignIn)()
                            },
                            style: styles.primaryButton,
                          }}
                          _type="Full"
                          _kind="Oke"
                        >
                          <RText style={styles.primaryButtonText}>
                            Sign In
                          </RText>
                        </Button>
                      </View>

                      {/* Divider */}
                      <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <RText style={styles.dividerText}>or</RText>
                        <View style={styles.dividerLine} />
                      </View>

                      {/* Social Login Button */}
                      <View style={styles.buttonWrapper}>
                        <Button
                          _type="Stroke"
                          _set={{
                            style: styles.socialButton,
                            onPress: () => {},
                          }}
                        >
                          <View style={styles.socialButtonContent}>
                            <RText style={styles.socialButtonIcon}>🌟</RText>
                            <RText style={styles.socialButtonText}>
                              Sign in with Google
                            </RText>
                          </View>
                        </Button>
                      </View>

                      {/* Sign Up Section */}
                      <View style={styles.signUpSection}>
                        <RText style={styles.signUpText}>
                          Don't have an account?
                        </RText>
                        <Button
                          _type="Fill"
                          _set={{
                            onPress: () => {},
                            style: styles.signUpButton,
                          }}
                        >
                          <RText style={styles.signUpLink}>
                            Sign up now
                          </RText>
                        </Button>
                      </View>

                      {/* Continue as Guest Button - moved to bottom */}
                      <View style={styles.buttonWrapper}>
                        <Button
                          _type="Fill"
                          _set={{
                            style: styles.guestButton,
                            onPress: () => {router.push('/root')},
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
    backgroundColor: '#F8F9FA',
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
    position: 'relative',
    justifyContent: 'center',
    minHeight: '100%',
  },
  backgroundGradient: {
    position: 'absolute',
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
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 82,
    aspectRatio: 352 / 179,
    resizeMode: 'contain',
  },
  welcomeSection: {
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: init.Color.PrimaryBrand,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#6B7280',
    textAlign: 'center',
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
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  luxuryInput: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    color: '#374151',
    borderRadius: 12,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  forgotPasswordButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: init.Color.PrimaryBrand,
  },
  actionSection: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 16,
  },
  buttonWrapper: {
    width: '100%',
  },
  primaryButton: {
    backgroundColor: init.Color.PrimaryBrand,
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: init.Color.PrimaryBrand,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#FFF",
    fontWeight: '700',
    fontSize: 17,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  socialButton: {
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  signUpText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '400',
  },
  signUpButton: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 4,
    marginLeft: 2,
  },
  signUpLink: {
    fontSize: 15,
    fontWeight: '600',
    color: init.Color.PrimaryBrand,
  },
  guestButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 8,
  },
  guestButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
});