import React from "react";
import { animated } from "react-spring";

import Sidebar, { useSidebar } from "../components/Sidebar";
import { Context } from "../components/Context";

function IndexPage() {
  // const [isOpen, setIsOpen] =
  // Sidebar
  const stuff = useSidebar();

  return (
    <Context.Provider value={stuff}>
      <div className="min-h-screen relative overflow-x-hidden">
        <Sidebar />

        <animated.div
          // {...(isMobile ? dragMain() : {})}
          {...stuff.dragMain()}
          className="flex-1 p-16"
          style={stuff.mainStyle}
        >
          <p className="text-teal-600">Hello, World!</p>

          <button className="btn btn-primary" style={{ marginBottom: 1500 }} onClick={() => stuff.toggleSidebar()}>
            Toggle sidebar
          </button>

          <p>Hello</p>
        </animated.div>
      </div>
    </Context.Provider>
  );
}

export default IndexPage;
