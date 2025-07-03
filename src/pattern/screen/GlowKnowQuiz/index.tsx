import { Container } from "@/src/libs/by";
import Context from "./seg/context";
import { GamePlay } from "./seg/GamePlay";
import { MenuGlowKnow } from "./seg/MenuGlowKnow";

export function GlowKnowQuiz() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ meds, hasStarted }) => {
          return (
            <Container style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
              {!hasStarted ? (
                <MenuGlowKnow onPlay={() => meds.handlePlayGame()} />
              ) : (
                <GamePlay />
              )}
            </Container>
          );
        }}
      </Context.Consumer>
    </Context.Provider>
  );
}
