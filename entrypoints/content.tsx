import "./popup/style.css"
import { createRoot } from "react-dom/client";

console.log("🚀 REDDIQ CONTENT SCRIPT INJECTED!");

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    let activeUi: any = null;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      (async () => {
        try {
          if (message.action === "post" || message.action === "comment") {
            if (activeUi) {
              activeUi.remove();
              activeUi = null;
            }

            activeUi = await createUI(ctx, message.action);
            activeUi.mount();
            sendResponse?.({ success: true });
          }
        } catch (err: any) {
          sendResponse?.({ success: false, error: String(err) });
        }
      })();

      return true;
    });
  },
});

const createUI = async (ctx: any, message: string) => {
  return createShadowRootUi(ctx, {
    name: `post-element-${message}`,
    position: "overlay",

    onMount: (container) => {
      console.log("🏗️ REDDIQ onMount Called", container);
      
      const app = document.createElement("div");
      container.append(app);

      Object.assign(container.style, {
        position: "fixed",
        inset: "0",
        zIndex: "2147483647",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
        pointerEvents: "auto",
      });

      const root = createRoot(app);
      root.render(
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            padding: "30px",
            borderRadius: "16px",
            backgroundColor: "#1a1a1b",
            border: "2px solid #ff4500",
            boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#ff4500",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              boxShadow: "0 0 20px rgba(255, 69, 0, 0.4)",
            }}
          >
            🤖
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: "14px", color: "#818384", letterSpacing: "1px", textTransform: "uppercase" }}>
              ReddIQ Assistant
            </div>
            <div style={{ color: "#ffffff" }}>
              Analysing {message.toUpperCase()}...
            </div>
          </div>
        </div>
      );

      return root;
    },

    onRemove(root) {
      console.log("🗑️ REDDIQ UI Removed");
      root?.unmount();
    },
  });
};
