import { Container, RText } from "@/src/libs/by";
import { map } from "lodash";
import React from "react";
import { BottomNavigate } from "./seg/BottomNavigate";
import Context from "./seg/context";
import { Modules } from "./seg/Modules";
import { ProductGrid } from "../../share/ProductGrid";

export function Home() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => (
          <Container style={{paddingVertical: 0}}>
            <ProductGrid products={ss.Joint.Products ?? []}/>
            {/* <Modules /> */}
            {/* <BottomNavigate /> */}
          </Container>
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}
