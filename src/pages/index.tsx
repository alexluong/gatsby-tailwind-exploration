import React from "react";
import { animated } from "react-spring";
import Sidebar, { useSidebar } from "../components/Sidebar";

function IndexPage() {
  // Sidebar
  const {
    isMobile,
    toggleSidebar,
    useDragMain,
    useMainStyle,
    useSidebarLayout
  } = useSidebar();

  useSidebarLayout();
  const mainStyle = useMainStyle();
  const bindMain = useDragMain();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Sidebar />

      <animated.div
        {...(isMobile ? bindMain() : {})}
        className="flex-1 p-16"
        style={mainStyle}
      >
        <p className="text-teal-600">Hello, World!</p>

        <button
          className="btn btn-primary"
          style={{ marginBottom: 1500 }}
          onClick={() => toggleSidebar()}
        >
          Toggle sidebar
        </button>

        <p>Hello</p>
      </animated.div>
    </div>
  );
}

export default IndexPage;
