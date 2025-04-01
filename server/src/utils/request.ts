export class RequestUtils {
  /**
   * Get `limit` and `skip` from request.
   * @param req
   * @returns
   */
  static getLimitNSkip(req: any) {
    let skip = parseInt(req.query.skip as string);
    let limit = parseInt(req.query.limit as string);

    if (Number.isNaN(skip)) skip = 0;
    if (Number.isNaN(limit)) limit = 10;

    return { limit, skip };
  }
}
