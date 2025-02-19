const _SimpleMemoryStore: Record<string | number, any> = {};

export class SimpleMemoryStore {
  private constructor() {}
  /**
   * Use to save a temporary value in RAM
   * @param key
   * @param value
   */
  static save(key: string | number, value: any) {
    _SimpleMemoryStore[key] = value;
  }

  /**
   * Use to get a temporary value from RAM
   * @param key
   * @returns
   */
  static get<T = any>(key: string | number) {
    return _SimpleMemoryStore[key] as T;
  }
}
