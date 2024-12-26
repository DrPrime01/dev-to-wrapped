export {};

declare global {
  interface ArticleType {
    comments_count: number;
    public_reactions_count: number;
    published_at: Date | string;
  }

  interface StatsType {
    totalArticles: number;
    totalReactions: number;
    totalComments: number;
    totalArticlesThisYear: number;
    totalReactionsThisYear: number;
    totalCommentsThisYear: number;
    articleWithMostComments: string;
    articleWithMostReactions: string;
  }

  interface MaxType {
    public_reactions_count: number;
    comments_count: number;
  }
}
