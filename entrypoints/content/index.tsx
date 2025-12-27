import "../popup/style.css";
import { CreateContentElement } from "@/shared/common";
import PostModal from "./posts";
import CommentsModal from "./comments";
import {
  extractRedditCommentsFromDom,
  extractRedditPostsFromDom,
} from "./scripts/scrapping";

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

                  const posts = extractRedditPostsFromDom();
                  const comments = extractRedditCommentsFromDom();
                  return (
                    <>
                      {message.action === "post" ? (
                        <PostModal posts={posts} onRemove={onRemove} />
                      ) : (
                        <CommentsModal
                          post={posts[0]}
                          comments={comments}
                          onRemove={onRemove}
                        />
                      )}
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
