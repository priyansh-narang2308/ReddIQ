import "../popup/style.css";
import { CreateContentElement } from "@/shared/common";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui",

  async main(ctx) {
    let activeUi: any = null;

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "post" || message.action === "comment") {
        (async () => {
          if (activeUi) {
            activeUi.remove();
            activeUi = null;
          }

          activeUi = await createShadowRootUi(ctx, {
            name: `reddiq-overlay-${message.action}`,
            position: "overlay",
            anchor: "body",
            append: "last",
            onMount: (uiContainer, shadow, shadowContainer) => {
              return CreateContentElement(
                uiContainer,
                shadowContainer,
                (root) => {
                  return (
                    <div className="p-6 bg-amber-500 rounded-4xl border-8 border-white shadow-xl transform transition-all duration-300 w-fit">
                      <h1 className="text-4xl font-black text-black italic tracking-tighter uppercase">
                        Hello World
                      </h1>
                    </div>
                  );
                }
              );
            },
            onRemove: (root) => {
              root?.unmount();
            },
          });

          activeUi.mount();
          sendResponse({ success: true });
        })();
        return true;
      }
    });
  },
});
