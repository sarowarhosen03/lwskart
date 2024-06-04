"use server";

import { cache } from "react";

export const getDectionary = cache(async (langCode, node) => {
  const data = await import(`../db/languages/${langCode}.json`).then(
    (module) => module.default,
  );
  if (node) {
    return data?.[node] || data;
  }
  return data;
});
