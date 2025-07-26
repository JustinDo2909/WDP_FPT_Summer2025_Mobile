import { Container } from "@/src/libs/by";
import React from "react";
import { ProductGrid } from "../../share/ProductGrid";
import Context from "./seg/context";

export function Home() {
  return (
    <Context.Provider>
      <Context.Consumer>
        {({ ss }) => (
          <Container style={{ paddingVertical: 0, backgroundColor: "f5f5f5" }}>
            <ProductGrid products={ss.Joint.Products ?? []} />
            {/* <Modules /> */}
            {/* <BottomNavigate /> */}
          </Container>
        )}
      </Context.Consumer>
    </Context.Provider>
  );
}
