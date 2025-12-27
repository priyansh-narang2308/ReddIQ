import Header from "@/shared/common/header";
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
                  const onRemove = () => {
                    root?.unmount();
                    shadowContainer.remove();
                  };
                  return (
                    <>
                      <Header
                        title={`${
                          message.action.charAt(0).toUpperCase() +
                          message.action.slice(1)
                        } Insights`}
                        count={10}
                        onRemove={onRemove}
                      />
                    </>
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
