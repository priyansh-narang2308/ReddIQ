import React from "react";
import { createRoot, Root } from "react-dom/client";
import { Toaster } from "react-hot-toast";

export const CreateContentElement = (
  uiContainer: HTMLElement,
  shadowContainer: HTMLElement,
  callback: (root: Root) => React.ReactNode
): Root => {
  const app = document.createElement("div");
  uiContainer.append(app);

  app.style.display = "flex";
  app.style.justifyContent = "center";
  app.style.alignItems = "center";
  app.style.width = "100%";
  app.style.height = "100%";

  const styles = {
    visibility: "visible",
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    zIndex: "100000000",
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(4px)",
    color: "white",
    fontFamily: "sans-serif",
  };

  Object.assign(shadowContainer.style, styles);

  const root = createRoot(app);

  shadowContainer.onclick = (e) => {
    if (e.target === shadowContainer) {
      root.unmount();
      shadowContainer.remove();
    }
  };

  root.render(
    <React.StrictMode>
      <Toaster />
      <div
        style={{
          pointerEvents: "auto",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        {callback(root)}
      </div>
    </React.StrictMode>
  );
  return root;
};
