import React from "react";
import { useSpring, animated, to } from "react-spring";
import Sidebar, { useSidebar } from "../components/Sidebar";

function IndexPage() {
  const {
    isOpen,
    isMobile,
    sidebarWidth,
    toggleSidebar,
    useDragMain,
    useSidebarLayout
  } = useSidebar();

  useSidebarLayout();

  // Animation
  const { translate } = useSpring({
    translate: [isOpen ? 0 : -100]
  });
  const { marginLeft } = useSpring({
    marginLeft: isMobile ? 0 : isOpen ? sidebarWidth : 0
  });

  const bindMain = useDragMain();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Sidebar
        style={{
          width: sidebarWidth,
          transform: to(translate, x => `translateX(${x}%)`)
        }}
      />

      <animated.div
        {...(isMobile ? bindMain() : {})}
        className="flex-1 p-16"
        style={{ marginLeft }}
      >
        <p className="text-teal-600">Hello, World!</p>
        <button
          className="btn btn-primary"
          style={{ marginBottom: 1500 }}
          onClick={() => toggleSidebar()}
        >
          Open/Close
        </button>

        <p>Hello</p>
      </animated.div>
    </div>
  );
}

export default IndexPage;
