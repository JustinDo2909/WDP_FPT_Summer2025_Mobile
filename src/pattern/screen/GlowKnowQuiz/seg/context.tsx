import { onCRUD, onError } from "@/src/process/api/regular";
import { GenCtx } from "@/src/process/hooks";
import { sStore } from "@/src/stores";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
        try {
          await onCRUD({
            Name: "events/play",
          }).Post({
            payload: {},
          });
          setHasStarted(true); // Set hasStarted on success
        } catch (error) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 400) {
            throw new Error(
              "You have already played today. Try again tomorrow!"
            );
          } else {
            onError({ error });
            throw error; // Propagate non-400 errors
          }
        }
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
      async handlePlayGame() {
        try {
          await meds.playGame(); // hasStarted is set in playGame
        } catch (error) {
          throw error; // Propagate error for Alert in MenuGlowKnow
        }
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
