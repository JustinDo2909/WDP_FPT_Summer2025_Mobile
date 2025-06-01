import { Block, Button, Core, Cover, Group, RText, Wrap } from "@/src/libs/by";
import { init } from "@/src/process/constants";
import { sStore } from "@/src/stores";
import { router, useGlobalSearchParams } from "expo-router";
import { find, isEqual, last, split } from "lodash";
import { TouchableOpacity } from "react-native";

export function Header() {
  const ss = sStore();
  return (
    <Core
      id="Header"
      style={{
        flex: undefined,
        paddingHorizontal: 24,
        paddingVertical: 6,
      }}
    >
      <Block style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            router.push("/root" as any);
          }}
        >
          <RenderTitle />
        </TouchableOpacity>

        <Group
          style={{
            flexDirection: "row",
            gap: 16,
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 16 }}
            onPress={() => {
              // router.push({ pathname: "/root/user/info" });
              ss.setPickData({ NavHeading: "Quay lại" });
            }}
          >
            <Cover
              style={{
                gap: 4,
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <RText
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: init?.Color?.PrimaryDark,
                }}
              >
                {/* {ss.Auth?.UserInfo?.UserName} */}
                UserName
              </RText>
              <RText
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: init?.Color?.TextPrimary,
                }}
              >
                {/* {ss.Auth?.UserInfo?.DepartmentName} */}
                DepartmentName
              </RText>
            </Cover>
          </TouchableOpacity>
        </Group>
      </Block>
    </Core>
  );
}

const RenderTitle = () => {
  const ss = sStore();
  const params = useGlobalSearchParams<
  // ISearchParams
  any>();
  const gFnID = last(split(String(params?.path), "/"));
  const list = ["Home", "SignIn"];
  const fnc = find(list, (ele) => isEqual(ele, gFnID));

  const BtnBack = (
    <Button
      _type="Default"
      _set={{
        onPress() {
          if (router.canGoBack()) {
            router.back();
          }

          ss.setPickData({ NavHeading: "" });
        },
      }}
    >
      <RText>Back</RText>
    </Button>
  );

  if (ss.Pick?.NavHeading )   {
    return (
      <Wrap style={{ gap: 16 }}>
        {BtnBack}
        <RText
          style={{
            fontWeight: 600,
            color: init?.Color?.PrimaryDark,
          }}
        >
          {ss.Pick?.NavHeading ||
            //  fnc?.FunctionName?.replace(/-/g, "")
            fnc}
        </RText>
      </Wrap>
    );
  }

  return (
    // <Image
    //   source={{
    //     uri: `${init?.Env?.URL_MINIO}/mobile/assets/img/division/Headers.png`,
    //   }}
    //   style={{
    //     objectFit: "contain",
    //     height: Px.H(40),
    //     width: Px.W(288),
    //   }}
    // />
    <RText>Logo</RText>
  );
};
