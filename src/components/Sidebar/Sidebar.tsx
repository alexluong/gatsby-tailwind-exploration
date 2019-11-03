import React from "react";
import create from "zustand";
import { animated, AnimatedProps } from "react-spring";
import { useDrag } from "react-use-gesture";
import { useLocalStorage, useMount, useWindowSize } from "react-use";
import { persist, immer } from "../../utils/zustand";
import Section from "./Section";

const LS_KEY = "sidebarState";
const DEFAULT_WIDTH = 280;
const V_THRESHOLD = 0.15; // velocity --> how fast the swipe is
const D_THRESHOLD = 0.6; // direction --> how straight the swipe is

interface SidebarState {
  isMobile: boolean;
  sidebarWidth: number;
  isOpen: boolean;
  closedSections: {
    [key: string]: boolean;
  };
  toggleSidebar: () => void;
  toggleSection: (id: string) => () => void;
  useDragSidebar: () => any;
  useDragMain: () => any;
  useSidebarLayout: () => any;
}

const [useSidebar] = create<SidebarState>(
  persist(LS_KEY)(
    immer((set, get) => ({
      isMobile: true,
      sidebarWidth: 0,
      isOpen: false,
      closedSections: {},
      toggleSidebar: () => {
        set((state: SidebarState) => {
          state.isOpen = !state.isOpen;
        });
      },
      toggleSection: (id: string) => () => {
        set((state: SidebarState) => {
          state.closedSections[id] = !state.closedSections[id];
        });
      },
      useSidebarLayout: () => {
        const [persistedState] = useLocalStorage<SidebarState>(LS_KEY);
        const { width } = useWindowSize();
        const isMobile = width < 500;

        useMount(() => {
          set((state: SidebarState) => {
            state.sidebarWidth = isMobile ? width : DEFAULT_WIDTH;
            state.isMobile = isMobile;
            state.isOpen = persistedState.isOpen;
            state.closedSections = persistedState.closedSections;
          });
        });
      },
      useDragSidebar: () => {
        return useDrag(({ direction, velocity, last }) => {
          if (direction[0] < -D_THRESHOLD && last && velocity > V_THRESHOLD) {
            get().toggleSidebar();
          }
        });
      },
      useDragMain: () => {
        return useDrag(({ direction, velocity, last }) => {
          if (direction[0] > D_THRESHOLD && last && velocity > V_THRESHOLD) {
            get().toggleSidebar();
          }
        });
      }
    }))
  )
);

function Sidebar({ style }: AnimatedProps<{ style: object }>) {
  const {
    closedSections,
    toggleSidebar,
    toggleSection,
    useDragSidebar
  } = useSidebar();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, [isClient, setIsClient]);

  const bindSidebar = useDragSidebar();

  return (
    <animated.div
      {...bindSidebar()}
      className="fixed top-0 left-0 h-full text-white py-12 px-6 overflow-x-scroll overflow-y-scroll scrolling-touch"
      style={{
        ...style,
        backgroundColor: "#121212"
      }}
    >
      <button className="mb-16" onClick={() => toggleSidebar()}>
        Close
      </button>

      {/* <pre>{JSON.stringify(s, null, 4)}</pre> */}

      <Section
        isOpen={!closedSections["1"]}
        toggleSection={toggleSection("1")}
      />
      <Section
        isOpen={!closedSections["2"]}
        toggleSection={toggleSection("2")}
      />
      <Section
        isOpen={!closedSections["3"]}
        toggleSection={toggleSection("3")}
      />
      <Section
        isOpen={!closedSections["4"]}
        toggleSection={toggleSection("4")}
      />
      <Section
        isOpen={!closedSections["5"]}
        toggleSection={toggleSection("5")}
      />
      <Section
        isOpen={!closedSections["6"]}
        toggleSection={toggleSection("6")}
      />
      <Section
        isOpen={!closedSections["7"]}
        toggleSection={toggleSection("7")}
      />
      <Section
        isOpen={!closedSections["8"]}
        toggleSection={toggleSection("8")}
      />
      <Section
        isOpen={!closedSections["9"]}
        toggleSection={toggleSection("9")}
      />
      <Section
        isOpen={!closedSections["10"]}
        toggleSection={toggleSection("10")}
      />
    </animated.div>
  );
}

export default Sidebar;
export { Sidebar, useSidebar };
