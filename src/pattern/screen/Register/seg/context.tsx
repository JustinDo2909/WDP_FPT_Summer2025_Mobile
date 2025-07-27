import { useCustomRouter } from "@/src/libs/hooks/useCustomRouter";
import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { delay } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
        name: string;
        email: string;
        password: string;
      };
    };
    const ss = sStore();

    const {navigate} = useCustomRouter() 
    const router = useRouter()

    const methods = useForm<IForm>({
      mode: "onChange",
      reValidateMode: "onSubmit",
      defaultValues: {
        fields: {},
      },
    });

    const [loading, setLoading] = useState(false);

    const meds = {
      //#region getCart
      async onGetCart() {
        try {
          const { data }: AxiosResponse<IResponse<ICart, "cart">> =
            await onCRUD({
              Name: "cart/get-cart",
            }).Get({
              payload: {},
            });

          if (data?.cart) {
            ss.setJointData({ Cart: data?.cart });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      //#region navtoLogin
       navigateToRegis() {
        router.push("/auth?type=sign-up");       
        },

      //#endregion

      //#region onGetUser
      async onGetUser() {
        try {
          const { data }: AxiosResponse<IResponse<IUser, "user">> =
            await onCRUD({
              Name: "auth/logged-in-user",
            }).Get({
              payload: {},
            });

          if (data?.user) {
            ss.setAuthData({ User: data?.user });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endRegion

      //#region onRegister
      async onRegister({ fields }: IForm) {
        try {
          setLoading(true);
          const { data: dUser }: AxiosResponse<any> = await onCRUD({
            Name: "auth/register",
          }).Post({
            payload: {
              name: fields.name,
              email: fields.email,
              password: fields.password,
            },
          });

          Toast.show({
            type: "success",
            text1: "Success! Verify your email at " + fields.email,
            visibilityTime: 10000
          });

          delay(() => {
            router.push("/auth?type=sign-in");
            setLoading(false);
          }, 500);
        } catch (error) {
          onError({ error });
        } finally {
          setLoading(false);
        }
      },
      // #endregion
      //#region onSignOut
      // onSignOut() {
      //   ss.resetAuth();
      // },
      //#endregion
    };

    return {
      methods,
      meds,
      loading,
    };
  },
});