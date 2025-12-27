export interface IPost {
  id: number;
  title: string;
  link?: string;
  tag?: string | null;
  description?: string | null;
  score?: string | null;
  comments?: string | null;
  author?: string | null;
  time?: string | null;
  color?: string | null;
}

export interface IComment {
  id: number;
  author: string;
  comment: string;
  score: number;
  time: string;
  avatarColor: string;
  permalink?: string;
}

export async function extractRedditPostsFromDom() {
  const postElements = Array.from(
    document.querySelectorAll<HTMLElement>("shreddit-post")
  );
  const postData: IPost[] = [];

  postElements.forEach((postElement, index) => {
    const title = postElement.getAttribute("post-title")?.trim() ?? undefined;
    const permaLink = postElement.getAttribute("permaLink") ?? undefined;
    const fullLink = permaLink
      ? `https://www.reddit.com${permaLink}`
      : undefined;
    const commentCount = postElement.getAttribute("comment-count") ?? undefined;

    // I GOT THIS ALL FROM PROMPTING GPT RATHER THEN SEARCHING : ADMITTING IT 😭💔

    // this shreddit is from the reddit post itself!if u see its css 
    const tagElement = postElement.querySelector(
      "shreddit-post-flair a span div.flair-content"
    );
    const tag = tagElement?.textContent?.trim() ?? null;

    const descriptionEl = postElement.querySelector(
      `div[data-post-click-location="text-body"]>div`
    );
    const description = descriptionEl?.textContent?.trim() ?? null;

    const scoreElement = postElement.getAttribute("score");
    const score = scoreElement ?? null;

    const author = postElement.getAttribute("author") ?? null;
    const time = postElement.getAttribute("time") ?? null;
    const color = postElement.getAttribute("color") ?? null;

    if (title && fullLink) {
      postData.push({
        id: index,
        title,
        link: fullLink,
        comments: commentCount ?? null,
        tag,
        description,
        score,
        author,
        time,
        color,
      });
    }
  });

  return postData;
}
