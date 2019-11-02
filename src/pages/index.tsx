import React from "react";
import { useSpring, animated } from "react-spring";
import { useWindowSize } from "react-use";
import Sidebar, { useSidebar } from "../components/Sidebar";

const DEFAULT_WIDTH = 280;

const IndexPage = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { width } = useWindowSize();

  const isMobile = width < 500;
  const sidebarWidth = isMobile ? width : DEFAULT_WIDTH;

  // Animation
  const sidebarStyle = useSpring({
    translate: [isOpen ? 0 : -sidebarWidth]
  });
  const mainStyle = useSpring(
    isMobile ? {} : { marginLeft: isOpen ? sidebarWidth : 0 }
  );

  return (
    <div className="min-h-screen relative">
      <Sidebar
        style={{
          width: sidebarWidth,
          ...sidebarStyle
        }}
      />

      <animated.div className="flex-1 p-16" style={mainStyle}>
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
};

export default IndexPage;
