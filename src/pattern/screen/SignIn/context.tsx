
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";

export default GenCtx({
  useLogic() {
    type IForm = {
      fields: {
        Username: string;
        Password: string;
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
      //#region onCertInfo
     
      //#endregion
      //#region onListFunction
   
      //#endregion

      //#region onPermissionByEmployee
    
      //#endregion

      //#region onSignIn
      // async onSignIn({ fields }: IForm) {
      //   try {
      //     const { data: dToken }: AxiosResponse<IResult<string>> = await onCRUD(
      //       {
      //         Name: "Auth/Login",
      //         Cluster: Cluster.HIS,
      //       }
      //     ).Post({
      //       payload: {
      //         Username: fields.Username,
      //         Password: fields.Password,
      //       },
      //     });

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

      //         Toast.show({
      //           type: "success",
      //           text1: "Đăng nhập thành công!",
      //         });

      //         delay(() => {
      //           router.push("/root");
      //         }, 500);
      //       }
      //     }
      //   } catch (error) {
      //     onError({ error });
      //   }
      // },
      //#endregion
      //#region onSignOut
      onSignOut() {
        ss.resetAuth();
      },
      //#endregion
    };

    return {
      methods,
      meds,
    };
  },
});
