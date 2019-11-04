import React, { useState, useContext, createContext } from "react";
import create from "zustand";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, to } from "react-spring";
import { useLocalStorage, useWindowSize } from "react-use";

import { Context } from "../Context";

const LS_KEY = "sidebarState";
const DEFAULT_WIDTH = 280;
const V_THRESHOLD = 0.15; // velocity --> how fast the swipe is
const D_THRESHOLD = 0.6; // direction --> how straight the swipe is

const useSidebar = () => {
  const [persistedState] = useLocalStorage<{ isOpen: boolean }>(LS_KEY);
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(width < 768);
  const [sidebarWidth, setSidebarWidth] = useState(isMobile ? width : DEFAULT_WIDTH);
  const sidebarStyle = useSpring({
    translate: [isOpen ? 0 : -100]
  });
  const toggleSidebar = () => setIsOpen(!isOpen);
  const mainStyle = useSpring({
    marginLeft: isMobile ? 0 : isOpen ? sidebarWidth : 0
  });
  const dragSidebar = useDrag(({ direction, velocity, last }) => {
    if (direction[0] < -D_THRESHOLD && last && velocity > V_THRESHOLD) {
      toggleSidebar();
    }
  });

  const dragMain = useDrag(({ direction, velocity, last }) => {
    if (direction[0] > D_THRESHOLD && last && velocity > V_THRESHOLD) {
      toggleSidebar();
    }
  });
  const style = {
    transform: to(sidebarStyle.translate, x => `translateX(${x}%)`)
  };

  React.useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ isOpen }));
  }, [isOpen]);

  React.useEffect(() => {
    setIsOpen(persistedState ? persistedState.isOpen : false);
  }, [setIsOpen, persistedState]);

  return {
    toggleSidebar,
    isOpen,
    sidebarWidth,
    style,
    mainStyle,
    dragSidebar,
    dragMain
  };
};

function Sidebar() {
  const { style, toggleSidebar, dragSidebar, sidebarWidth, isOpen } = useContext(Context);

  console.log({ isOpen });

  return (
    <animated.div
      {...dragSidebar()}
      className="fixed top-0 left-0 h-full text-white py-12 px-6 overflow-x-scroll overflow-y-scroll scrolling-touch sm:w-screen md:w-64"
      style={{
        ...style,
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
