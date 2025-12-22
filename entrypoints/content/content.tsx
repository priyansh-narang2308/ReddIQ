import React from "react";
import "../popup/style.css"; //for all css importing
import { createRoot } from "react-dom/client";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",
  // in this we have the ctx: contentscriptContext
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "post-element",
      position: "inline",
      onMount: (uiContainer, shadow, shadowContainer) => {
        const app = document.createElement("div");
        // append into the shadow container so our overlay styles affect it
        shadowContainer.append(app);

        const styles = {
          visibility: "visible",
          position: "fixed",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          zIndex: "9999",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        };

        Object.assign(shadowContainer.style, styles);
        const root = createRoot(app as HTMLElement);
        root.render(
          <React.StrictMode>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "3.5rem",
                  height: "40vh",
                  backgroundColor: "#f59e0b",
                  borderRadius: "0.25rem",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                }}
              />
            </div>
          </React.StrictMode>
        );
        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
    // chrome.runtime.onMessage.addListener(
    //   async (message, sender, sendResponse) => {
    //     switch (message.action) {
    //       case "post":
    //         break;

    //       case "comment":
    //         break;

    //       default:
    //         break;
    //     }
    //   }
    // );
  },
});
