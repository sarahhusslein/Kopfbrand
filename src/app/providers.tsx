"use client";

import { TransitionRouter } from "next-transition-router";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransitionRouter
      leave={async (next) => {
        // await omeAnimation().then(next);
      }}
      enter={async (next) => {
        // await anotherAnimation().then(next);
      }}
    >
      {children}
    </TransitionRouter>
  );
}