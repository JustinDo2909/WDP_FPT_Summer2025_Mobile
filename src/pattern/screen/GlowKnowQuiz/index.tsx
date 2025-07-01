import { Container } from "@/src/libs/by";
import { useState } from "react";
import { GamePlay } from "./seg/GamePlay";
import { MenuGlowKnow } from "./seg/MenuGlowKnow";
import context from "./seg/context";

export function GlowKnowQuiz() {
  const [hasStarted, setHasStarted] = useState(false);
  const { ss, meds } = context.useCtx();

  const handlePlayGame = () => {
    setHasStarted(true);
    // meds.playGame
  };
  return (
    <Container style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
      {!hasStarted ? <MenuGlowKnow onPlay={handlePlayGame} /> : <GamePlay />}
    </Container>
  );
}
