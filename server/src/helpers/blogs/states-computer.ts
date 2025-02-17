/**
 * Use this function to compute:
 * - totalComments
 * - isLiked (if user exists)
 *
 * Note: this function effect the result.
 * @param plainBlog
 */
export function computeStateOfBlog(plainBlog: any, userId: string) {
  if (plainBlog.comments) {
    plainBlog.totalComments = plainBlog.comments.length;
    // Delete comments
    delete plainBlog.comments;
  }

  if (plainBlog.favorites) {
    let total = 0;
    plainBlog.isLiked = false;
    for (const favorite of plainBlog.favorites) {
      if (!plainBlog.isLiked && userId == favorite.userId)
        plainBlog.isLiked = true;
      total++;
    }
    plainBlog.totalFavorites = total;
    delete plainBlog.favorites;
  }

  return plainBlog;
}
