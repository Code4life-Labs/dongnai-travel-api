type SortOptions = {
  isDescending: boolean;
};

/**
 * Use to sort places by rating
 * @param places
 * @param options
 * @returns
 */
export function sortPlacesByStar(places: Array<any>, options: SortOptions) {
  let isDescending = options && options.isDescending ? true : false;

  return places.sort(function (a, b) {
    return isDescending ? b.rating - a.rating : a.rating - b.rating;
  });
}

/**
 * Use to sort places by total of rating.
 * @param places
 * @param options
 * @returns
 */
export function sortPlacesByRating(places: Array<any>, options: SortOptions) {
  let isDescending = options && options.isDescending ? true : false;

  return places.sort(function (a, b) {
    return isDescending
      ? b.userRatingsTotal - a.userRatingsTotal
      : a.userRatingsTotal - b.userRatingsTotal;
  });
}
