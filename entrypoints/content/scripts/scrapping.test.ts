import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { extractRedditPostsFromDom, extractRedditCommentsFromDom, extractJSONListFromMarkdown } from './scrapping';

describe('extractRedditPostsFromDom', () => {
  const mockDocument = {
    querySelectorAll: vi.fn(),
  };

  beforeEach(() => {
    // @ts-ignore
    global.document = mockDocument;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-ignore
    global.document = undefined;
  });

  it('should extract post data from DOM elements', () => {
    const mockPostElements = [
      {
        getAttribute: vi.fn((attr: string) => {
          switch (attr) {
            case 'post-title':
              return 'Test Post Title';
            case 'permaLink':
              return '/r/test/comments/123';
            case 'comment-count':
              return '10';
            case 'score':
              return '100';
            case 'author':
              return 'test-author';
            case 'time':
              return '2 hours ago';
            default:
              return null;
          }
        }),
        querySelector: vi.fn((selector: string) => {
          if (selector.includes('flair-content')) {
            return { textContent: 'Test Flair' };
          }
          if (selector.includes('text-body')) {
            return { textContent: 'Test Description' };
          }
          return null;
        }),
      },
    ];

    mockDocument.querySelectorAll.mockReturnValue(mockPostElements);

    const result = extractRedditPostsFromDom();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 0,
      title: 'Test Post Title',
      link: 'https://www.reddit.com/r/test/comments/123',
      comments: '10',
      tag: 'Test Flair',
      description: 'Test Description',
      score: '100',
      author: 'test-author',
      time: '2 hours ago',
      color: null,
    });
  });

  it('should return empty array if no posts found', () => {
    mockDocument.querySelectorAll.mockReturnValue([]);
    const result = extractRedditPostsFromDom();
    expect(result).toEqual([]);
  });
});

describe('extractRedditCommentsFromDom', () => {
  const mockDocument = {
    querySelectorAll: vi.fn(),
    getElementById: vi.fn(),
  };

  beforeEach(() => {
    // @ts-ignore
    global.document = mockDocument;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // @ts-ignore
    global.document = undefined;
  });

  it('should extract comments data from DOM elements', () => {
    const mockCommentElement = {
      getAttribute: vi.fn((attr: string) => {
        switch (attr) {
          case 'author':
            return 'comment-author';
          case 'permalink':
            return '/r/test/comments/123/comment/456';
          case 'thingId':
            return 't1_456';
          case 'score':
            return '50';
          default:
            return null;
        }
      }),
    };

    const mockContentDiv = {
      innerText: 'This is a test comment content',
    };

    mockDocument.querySelectorAll.mockReturnValue([mockCommentElement]);
    mockDocument.getElementById.mockReturnValue(mockContentDiv);

    const result = extractRedditCommentsFromDom();

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 't1_456',
      author: 'comment-author',
      comment: 'This is a test comment content',
      permalink: '/r/test/comments/123/comment/456',
      score: '50',
    });
  });

  it('should handle missing comment content', () => {
    const mockCommentElement = {
      getAttribute: vi.fn((attr: string) => {
        if (attr === 'thingId') return 't1_456';
        return '';
      }),
    };

    mockDocument.querySelectorAll.mockReturnValue([mockCommentElement]);
    mockDocument.getElementById.mockReturnValue(null);

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const result = extractRedditCommentsFromDom();

    expect(result).toHaveLength(0);
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe('extractJSONListFromMarkdown', () => {
  it('should extract JSON array from markdown code blocks', () => {
    const markdown = 'Here is the data:\n```json\n[{"name": "test"}]\n```';
    const result = extractJSONListFromMarkdown(markdown);
    expect(result).toEqual([{ name: 'test' }]);
  });

  it('should extract single JSON object from markdown code blocks', () => {
    const markdown = 'Result:\n```json\n{"name": "test"}\n```';
    const result = extractJSONListFromMarkdown<{ name: string }>(markdown);
    expect(result).toEqual([{ name: 'test' }]);
  });

  it('should extract JSON from inline backticks', () => {
    const markdown = 'The config is `{"enabled": true}`';
    const result = extractJSONListFromMarkdown(markdown);
    expect(result).toEqual([{ enabled: true }]);
  });

  it('should parse raw JSON string if no code blocks found', () => {
    const markdown = '[{"id": 1}]';
    const result = extractJSONListFromMarkdown(markdown);
    expect(result).toEqual([{ id: 1 }]);
  });

  it('should return empty array for invalid JSON', () => {
    const markdown = 'Not a JSON string';
    const result = extractJSONListFromMarkdown(markdown);
    expect(result).toEqual([]);
  });
});

