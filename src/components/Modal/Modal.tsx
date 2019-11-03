import React from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { useTransition, animated, to } from "react-spring";

function Modal({ showDialog, close }) {
  const AnimatedDialogOverlay = animated(DialogOverlay);
  const AnimatedDialogContent = animated(DialogContent);

  const transitions = useTransition(showDialog, null, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20 }
  });

  return (
    <>
      {transitions.map(
        ({ item, key, props: styles }) =>
          item && (
            <AnimatedDialogOverlay
              key={key}
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                opacity: styles.opacity
              }}
              className="fixed top-0 left-0 w-screen h-screen"
              onDismiss={close}
            >
              <AnimatedDialogContent
                aria-label="important dialog"
                style={{
                  margin: "20vh auto",
                  width: "50vw",
                  transform: to(styles.y, y => `translateY(${y}px)`)
                }}
                className="p-16 bg-white shadow-md"
              >
                <p>
                  The overlay styles are a white fade instead of the default
                  black fade.
                </p>
                <button className="btn btn-primary my-4" onClick={close}>
                  Very nice.
                </button>
              </AnimatedDialogContent>
            </AnimatedDialogOverlay>
          )
      )}
    </>
  );
}

export default Modal;
