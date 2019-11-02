import produce from "immer";

const isBrowser = typeof window !== "undefined";

export const persist = config => (set, get, api) =>
  config(
    args => {
      set(args);
      isBrowser && localStorage.setItem("sidebarState", JSON.stringify(get()));
    },
    get,
    api
  );

export const immer = config => (set, get, api) =>
  config(fn => set(produce(fn)), get, api);
