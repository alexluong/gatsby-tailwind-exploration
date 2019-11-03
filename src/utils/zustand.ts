import produce from "immer";

const isBrowser = typeof window !== "undefined";

export const persist = (LS_KEY: string) => config => (set, get, api) =>
  config(
    args => {
      set(args);
      isBrowser && localStorage.setItem(LS_KEY, JSON.stringify(get()));
    },
    get,
    api
  );

export const immer = config => (set, get, api) =>
  config(fn => set(produce(fn)), get, api);
