import React from "react";
import { animated } from "react-spring";
import Sidebar, { useSidebar } from "../components/Sidebar";
import Modal from "../components/Modal";

function IndexPage() {
  // Sidebar
  const {
    isMobile,
    sidebarWidth,
    toggleSidebar,
    useDragMain,
    useSidebarLayout,
    useSidebarStyle,
    useMainStyle
  } = useSidebar();

  useSidebarLayout();
  const sidebarStyle = useSidebarStyle();
  const mainStyle = useMainStyle();
  const bindMain = useDragMain();

  // Modal
  const [showDialog, setShowDialog] = React.useState(false);
  const close = () => setShowDialog(false);
  const toggleModal = () => setShowDialog(!showDialog);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Sidebar
        style={{
          width: sidebarWidth,
          ...sidebarStyle
        }}
      />

      <animated.div
        {...(isMobile ? bindMain() : {})}
        className="flex-1 p-16"
        style={mainStyle}
      >
        <p className="text-teal-600">Hello, World!</p>
        <button className="btn btn-primary ml-0 m-4" onClick={toggleModal}>
          Toggle modal
        </button>

        <button
          className="btn btn-primary"
          style={{ marginBottom: 1500 }}
          onClick={() => toggleSidebar()}
        >
          Toggle sidebar
        </button>

        <Modal showDialog={showDialog} close={close} />

        <p>Hello</p>
      </animated.div>
    </div>
  );
}

export default IndexPage;
