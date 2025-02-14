/**
 * Use this function to compute:
 * - totalFavorites
 * - totalVisits
 * - totalReviews
 * - rating
 * - isLiked (if user exists)
 * - isVisted (if user exists)
 *
 * Note: this function effect the result.
 * @param plainPlace
 */
export function computeStateOfPlace(plainPlace: any, userId: string) {
  if (plainPlace.reviews) {
    let sum = 0,
      total = 0;
    for (const review of plainPlace.reviews) {
      sum = review.rating;
      total++;
    }
    plainPlace.totalReviews = total;
    plainPlace.rating = sum / total;
  }

  if (plainPlace.favorites) {
    let total = 0;
    plainPlace.isFavorited = false;
    for (const favorite of plainPlace.favorites) {
      if (!plainPlace.isFavorited && userId == favorite.userId)
        plainPlace.isFavorited = true;
      total++;
    }
    plainPlace.totalFavorites = total;
    delete plainPlace.favorites;
  }

  if (plainPlace.visits) {
    let total = 0;
    plainPlace.isVisited = false;
    for (const visit of plainPlace.visits) {
      if (!plainPlace.isVisited && userId == visit.userId)
        plainPlace.isVisited = true;
      total++;
    }
    plainPlace.totalVisits = total;
    delete plainPlace.visits;
  }

  return plainPlace;
}
