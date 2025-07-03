import { Container } from "@/src/libs/by";
import Context from "../context";
import { GlowKnow } from "../GlowKnow";

export function GamePlay() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => {
          const questions = ss.Joint.QuizQuestions ?? [];
          const rewardTiers = (ss.Joint.EventReward ?? []).map((reward) => ({
            correct: reward.min_correct,
            reward:
              reward.type === "PERCENT"
                ? `${reward.discount_value}% voucher`
                : `${reward.discount_value} VND discount`,
          }));

          return (
            <Container
              style={{ paddingVertical: 0, backgroundColor: "#f5f5f5" }}
            >
              <GlowKnow questions={questions} rewardTiers={rewardTiers} />
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
