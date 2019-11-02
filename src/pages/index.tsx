import React from "react";
import { useSpring, animated } from "react-spring";
import Sidebar, { useSidebar } from "../components/Sidebar";

const WIDTH = 280;

const IndexPage = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  // Animation
  const { translate, marginLeft } = useSpring({
    translate: [isOpen ? 0 : -WIDTH],
    marginLeft: isOpen ? WIDTH : 0
  });

  return (
    <div className="min-h-screen relative">
      <Sidebar
        style={{
          translate,
          width: WIDTH
        }}
      />

      <animated.div className="flex-1 p-16" style={{ marginLeft }}>
        <p className="text-teal-600">Hello, World!</p>
        <button className="btn btn-primary" onClick={() => toggleSidebar()}>
          Open/Close
        </button>
      </animated.div>
    </div>
  );
};

export default IndexPage;
