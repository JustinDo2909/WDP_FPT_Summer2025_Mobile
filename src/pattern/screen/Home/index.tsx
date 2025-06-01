
import { Container } from "@/src/libs/by";
import React from "react";
import { BottomNavigate } from "./seg/BottomNavigate";
import Context from "./seg/context";
import { Modules } from "./seg/Modules";


export function Home() {
  return (
    <Context.Provider>
      <Container>
        <Modules />
        <BottomNavigate/>
      </Container>
    </Context.Provider>
  );
}
