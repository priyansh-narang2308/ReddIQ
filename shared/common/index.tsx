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
    backgroundColor: "transparent",
    backdropFilter: "none",
    color: "white",
    fontFamily: "sans-serif",
    pointerEvents: "none",
  };

  Object.assign(shadowContainer.style, styles);

  uiContainer.style.width = "100%";
  uiContainer.style.height = "100%";
  uiContainer.style.display = "flex";
  uiContainer.style.flexDirection = "column";

  const root = createRoot(app);



  root.render(
    <React.StrictMode>
      <div
        className="fixed inset-0 w-screen h-screen flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md"
        style={{
          pointerEvents: "auto",
          animation: "fadeIn 0.3s ease-out",
        }}
      >
        {callback(root)}
      </div>
      <Toaster
        containerStyle={{
          zIndex: 1000000000,
        }}
        position="top-right"
      />
    </React.StrictMode>
  );
  return root;
};
