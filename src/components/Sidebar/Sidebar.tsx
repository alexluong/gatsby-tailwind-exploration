import React from "react";
import create from "zustand";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, AnimatedProps, to } from "react-spring";
import { useLocalStorage, useMount, useWindowSize } from "react-use";
import { persist, immer } from "../../utils/zustand";

const LS_KEY = "sidebarState";
const DEFAULT_WIDTH = 280;
const V_THRESHOLD = 0.15; // velocity --> how fast the swipe is
const D_THRESHOLD = 0.6; // direction --> how straight the swipe is

interface SidebarState {
  isMobile: boolean;
  sidebarWidth: number;
  isOpen: boolean;
  toggleSidebar: () => void;
  useDragSidebar: () => any;
  useDragMain: () => any;
  useSidebarLayout: () => any;
  useSidebarStyle: () => any;
  useMainStyle: () => any;
}

const [useSidebar] = create<SidebarState>(
  persist(LS_KEY)(
    immer((set, get) => ({
      isMobile: true,
      sidebarWidth: 0,
      isOpen: false,
      toggleSidebar: () => {
        set((state: SidebarState) => {
          state.isOpen = !state.isOpen;
        });
      },
      useSidebarStyle: () => {
        const { translate } = useSpring({
          translate: [get().isOpen ? 0 : -100]
        });
        return {
          transform: to(translate, x => `translateX(${x}%)`)
        };
      },
      useMainStyle: () => {
        const { isMobile, isOpen, sidebarWidth } = get();
        return useSpring({
          marginLeft: isMobile ? 0 : isOpen ? sidebarWidth : 0
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

function Sidebar() {
  const {
    sidebarWidth,
    toggleSidebar,
    useDragSidebar,
    useSidebarStyle
  } = useSidebar();

  const styles = useSidebarStyle();
  const bindSidebar = useDragSidebar();

  return (
    <animated.div
      {...bindSidebar()}
      className="fixed top-0 left-0 h-full text-white py-12 px-6 overflow-x-scroll overflow-y-scroll scrolling-touch"
      style={{
        ...styles,
        width: sidebarWidth,
        backgroundColor: "#121212"
      }}
    >
      <button className="mb-16" onClick={() => toggleSidebar()}>
        Close
      </button>

      <p>Sidebar</p>
    </animated.div>
  );
}

export default Sidebar;
export { Sidebar, useSidebar };
