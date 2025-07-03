import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";

export default GenCtx({
  useLogic() {
    const ss = sStore();
    const methods = useForm({
      mode: "all",
      defaultValues: {
        fields: {},
        filters: {},
      },
    });

    const [hasStarted, setHasStarted] = useState<boolean>(false);

    const meds = {
      //#region getRandomQuestions
      async onGetQuestions() {
        try {
          const {
            data,
          }: AxiosResponse<IQuestionResponse<QuizQuestion, "questions">> =
            await onCRUD({
              Name: "events/1/questions/random",
            }).Get({
              payload: {},
            });

          if (data?.questions) {
            ss.setJointData({ QuizQuestions: data?.questions });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion
      //#region getRewardTiers
      async onGetEventReward() {
        try {
          const {
            data,
          }: AxiosResponse<IEventRewardResponse<EventReward, "eventRewards">> =
            await onCRUD({
              Name: "events/1/rewards",
            }).Get({
              payload: {},
            });

          if (data?.eventRewards) {
            ss.setJointData({ EventReward: data?.eventRewards });
          }
        } catch (error) {
          onError({ error });
        }
      },
      //#endregion

      //#region playEvent
      async playGame() {
        // try {
        //   await onCRUD({
        //     Name: "events/play",
        //   }).Post({
        //     payload: {},
        //   });
        Toast.show({
          type: "success",
          text1: "Play Game successful",
        });
        // } catch (error) {
        //   onError({ error });
        // }
      },

      // #region
      async calculateReward(correct_answers: number) {
        try {
          await onCRUD({
            Name: "events/1/calculate-reward",
          }).Post({
            payload: {
              correct_answers,
            },
          });
        } catch (error) {
          onError({ error });
        }
      },
      // #endregion
      //#endregion
      handlePlayGame() {
        setHasStarted(true);
        meds.playGame();
      },
    };

    //#region LifeCycle

    useEffect(() => {
      ss.resetPick();
      meds.onGetQuestions();
      meds.onGetEventReward();
    }, []);

    //#endregion

    return { meds, methods, ss, hasStarted };
  },
});
