import { Container, RText } from "@/src/libs/by";
import { map } from "lodash";
import React from "react";
import { BottomNavigate } from "./seg/BottomNavigate";
import Context from "./seg/context";
import { Modules } from "./seg/Modules";

export function Home() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => (
          <Container>
            {map(ss?.Joint?.Product, (item, index) => (
              <RText key={index}>{item}</RText>
            ))}
            <Modules />
            <BottomNavigate />
          </Container>
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}
