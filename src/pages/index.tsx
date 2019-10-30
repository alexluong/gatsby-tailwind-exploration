import React from "react";
import { useImmerReducer } from "use-immer";
import { useLocalStorage } from "react-use";
import { useSpring, animated } from "react-spring";
import Section from "../components/Section";

const WIDTH = 20;
const OPEN_SIDEBAR = "openSidebar";
const CLOSE_SIDEBAR = "closeSidebar";
const OPEN_SECTION = "openSection";
const CLOSE_SECTION = "closeSection";

type SidebarAction =
  | { type: "openSidebar" }
  | { type: "closeSidebar" }
  | { type: "openSection"; payload: { id: string } }
  | { type: "closeSection"; payload: { id: string } };

interface SidebarState {
  isOpen: boolean;
  closedSections: {
    [key: string]: boolean;
  };
}

const initialSidebarState: SidebarState = {
  isOpen: true,
  closedSections: {}
};

function reducer(state: SidebarState, action: SidebarAction): SidebarState {
  switch (action.type) {
    case OPEN_SIDEBAR: {
      state.isOpen = true;
      return state;
    }
    case CLOSE_SIDEBAR: {
      state.isOpen = false;
      return state;
    }
    case OPEN_SECTION: {
      state.closedSections[action.payload.id] = true;
      return state;
    }
    case CLOSE_SECTION: {
      state.closedSections[action.payload.id] = false;
      return state;
    }
    default:
      return state;
  }
}

const IndexPage = () => {
  const [lsValue, setLsValue] = useLocalStorage(
    "sidebarState",
    initialSidebarState
  );
  const [state, dispatch] = useImmerReducer(reducer, lsValue);

  const toggleSidebar = () => {
    dispatch({
      type: state.isOpen ? CLOSE_SIDEBAR : OPEN_SIDEBAR
    });
  };

  const toggleSection = (id: string) => () => {
    dispatch({
      type: state.closedSections[id] ? CLOSE_SECTION : OPEN_SECTION,
      payload: { id }
    });
  };

  // Persist state to local storage
  React.useEffect(() => {
    setLsValue(state);
  }, [state, setLsValue]);

  // Animation
  const styles = useSpring({ x: state.isOpen ? 0 : WIDTH });

  return (
    <div className="min-h-screen relative">
      <animated.div
        className="absolute top-0 left-0 h-full text-white py-12 px-6"
        style={{
          transform: styles.x.interpolate(x => `translateX(${-x}rem`),
          width: `${WIDTH}rem`,
          backgroundColor: "#121212"
        }}
      >
        <Section
          isOpen={!state.closedSections["1"]}
          toggleSection={toggleSection("1")}
        />
        <Section
          isOpen={!state.closedSections["2"]}
          toggleSection={toggleSection("2")}
        />
        <Section
          isOpen={!state.closedSections["3"]}
          toggleSection={toggleSection("3")}
        />
        <Section
          isOpen={!state.closedSections["4"]}
          toggleSection={toggleSection("4")}
        />
      </animated.div>

      <animated.div
        className="flex-1 p-16"
        style={{ marginLeft: styles.x.interpolate(x => `${WIDTH - x}rem`) }}
      >
        <p className="text-teal-600">Hello, World!</p>
        <button className="btn btn-primary" onClick={() => toggleSidebar()}>
          Open/Close
        </button>
      </animated.div>
    </div>
  );
};

export default IndexPage;
