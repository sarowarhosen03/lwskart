"use server";

import { defaultLocale } from "./controler/internationalization";

export const getDectionary = async (langCode, node) => {
  let data = null;
  try {
    data = await import(`../db/languages/${langCode}.json`).then(
      (module) => module.default,
    );
  } catch (error) {
    data = await import(`../db/languages/${defaultLocale}.json`).then(
      (module) => module.default,
    );
  }
  if (node) {
    return data?.[node] || data;
  }
  return data;
};
