/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const API_URL = import.meta.env.VITE_APP_API_URL;

export async function fetchUserStats(username: string) {
  const currentYear = new Date().getFullYear();

  try {
    const response = await fetch(`${API_URL}/articles?username=${username}`);
    const articles = await response.json();

    const stats = {
      totalArticles: articles.length,
      totalReactions: articles.reduce(
        (sum: number, article: ArticleType) =>
          sum + (article.public_reactions_count || 0),
        0
      ),
      totalComments: articles.reduce(
        (sum: number, article: ArticleType) =>
          sum + (article.comments_count || 0),
        0
      ),
      totalArticlesThisYear: articles.filter((article: ArticleType) => {
        const articleYear = new Date(article.published_at).getFullYear();
        return articleYear === currentYear;
      }).length,
      totalReactionsThisYear: articles.reduce(
        (sum: number, article: ArticleType) => {
          const articleYear = new Date(article.published_at).getFullYear();
          return articleYear === currentYear
            ? sum + (article.public_reactions_count || 0)
            : sum;
        },
        0
      ),
      totalCommentsThisYear: articles.reduce(
        (sum: number, article: ArticleType) => {
          const articleYear = new Date(article.published_at).getFullYear();
          return articleYear === currentYear
            ? sum + (article.comments_count || 0)
            : sum;
        },
        0
      ),
      articleWithMostComments: articles.reduce(
        (max: MaxType, article: ArticleType) =>
          article.comments_count > (max?.comments_count || 0) ? article : max,
        null
      )?.title,
      articleWithMostReactions: articles.reduce(
        (max: MaxType, article: ArticleType) =>
          article.public_reactions_count > (max?.public_reactions_count || 0)
            ? article
            : max,
        null
      )?.title,
    };

    return stats;
  } catch (error: any) {
    throw new Error("Failed to fetch articles.");
  }
}
