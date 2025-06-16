
import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosResponse } from "axios";
import { useRouter } from "expo-router";
import { delay } from "lodash";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
        email: string;
        password: string;
      };
    };
    const ss = sStore();

    const router = useRouter();

    const methods = useForm<IForm>({
      mode: "onChange",
      reValidateMode: "onSubmit",
      defaultValues: {
        fields: {},
      },
    });

    const meds = {
      //#region getCart
      async onGetCart() {
        try {
          const { data }: AxiosResponse<IResponse<ICart, 'cart'>> = await onCRUD({
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

      //#region onGetUser
     async onGetUser() {
        try {
          const { data }: AxiosResponse<IResponse<IUser, 'user'>> = await onCRUD({
            Name: "auth/logged-in-user",
          }).Get({
            payload: {},
          });

          if (data?.user) {
            ss.setJointData({ User: data?.user });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endRegion

      //#region onSignIn
      async onSignIn({ fields }: IForm) {
        try {
           const { data: dUser }:AxiosResponse<any> = await onCRUD(
            {
              Name: "auth/login",
            }
          ).Post({
            payload: {
              email: fields.email,
              password: fields.password,
            },
          });

          if (dUser.success) {
            AsyncStorage.setItem('jwt', dUser.accessToken)
          }
      

      //     if (dToken?.Data) {
      //       ss.setToken(dToken?.Data);

      //       const { data: dUser }: AxiosResponse<IResult<IUser>> = await onCRUD(
      //         {
      //           Name: "Auth/Info",
      //           Cluster: Cluster.HIS,
      //         }
      //       ).Get({});
      //       if (dUser?.Data) {
      //         ss.setAuthData({ UserInfo: dUser?.Data });

      //         await meds.onCertInfo({
      //           UserCode: String(dUser?.Data?.EmployeeCode),
      //         });

      //         await meds.onPermissionByEmployee({
      //           EmpID: Number(dUser?.Data?.EmployeeID),
      //         });

      //         await meds.onListFunction({});
             await meds.onGetUser()
             await meds.onGetCart()

              Toast.show({
                type: "success",
                text1: "Logged in successfully!",
              });

              

              delay(() => {
                router.push("/root");
              }, 500);
          
      } catch (error) {
          onError({ error });
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
    };
  },
});
