

import { Begin, Block, Button, Card, Container, Content, End, FieldText, RText } from "@/src/libs/by";
import { Label } from "@/src/libs/by/Label";
import { init } from "@/src/process/constants";
import { valid } from "@/src/process/helper";
import * as React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import Context from "./context";

export function SignIn() {

  return (
    <Context.Provider>
      <Context.Consumer>
        {({ methods: { handleSubmit }, meds }) => {
          return (
            <Container
              style={{
                alignContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <ScrollView
                style={{
                  flex: 1,
                }}
              >
                <Block
                  style={{
                    flex: 1,
                  }}
                >
                  <Card
                    style={{
                      borderRadius: 16,
                      backgroundColor: "#FFFFFF",
                      padding: 24,
                      top: 160,
                      gap: 16,
                    }}
                  >
                    <Begin style={{ marginBottom: 42 }}>
                      <Image
                        source={{
                          uri: `${init?.Env?.URL_MINIO}/mobile/assets/img/division/Login-Logo.png`,
                        }}
                        style={styles.ImageBackground}
                      />
                    </Begin>

                    <Content>
                      <FieldText
                        name="fields.Username"
                        label={<Label text={"Tài khoản"} />}
                        placeholder=""
                        rules={valid.required()}
                      />
                      <FieldText
                        name="fields.Password"
                        label={<Label text={"Mật khẩu"} />}
                        placeholder=""
                        rules={valid.required()}
                        type="password"
                      />
                    </Content>
                    <End style={{ gap: 16 }}>
                      <Button
                        _set={{
                          onPress: 
                          () => {},
                          // handleSubmit(meds.onSignIn),
                          style: {
                            flex: 1,
                          },
                        }}
                        _type="Fill"
                        _kind="Oke"
                      >
                        <RText
                          style={{
                            color: "white",
                            fontWeight: 600,
                            fontSize: 16,
                          }}
                        >
                          Đăng nhập
                        </RText>
                      </Button>

                      <Button
                        _type="Icon"
                        _set={{
                          style: { elevation: 6, backgroundColor: "white" },
                        }}
                      >
                        <RText>icon</RText>
                      </Button>
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
  ImageBackground: { width: "auto", height: 179, aspectRatio: 352 / 179 },
});
