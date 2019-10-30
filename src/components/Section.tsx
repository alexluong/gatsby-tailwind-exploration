import React from "react";
import { useMeasure } from "react-use";
import { useSpring, animated } from "react-spring";

interface SectionProps {
  isOpen: boolean;
  toggleSection: () => void;
}

const Section = ({ isOpen, toggleSection }: SectionProps) => {
  const [ref, { height }] = useMeasure();

  const styles = useSpring({ height: isOpen ? height : 0 });

  return (
    <div className="mb-12">
      <h2 className="cursor-pointer" onClick={() => toggleSection()}>
        This is the Section Name
      </h2>
      <animated.ul style={{ height: styles.height, overflow: "hidden" }}>
        <div ref={ref}>
          <li>Hello</li>
          <li>Hello</li>
          <li>Hello</li>
        </div>
      </animated.ul>
    </div>
  );
};

export default Section;
