/**
 * Generic document repository interface.
 *
 * `FileRepository` (P0) and a future Cosmos DB-backed implementation (P1) both
 * implement this interface so calling code does not depend on the storage
 * technology. See docs/adr/0003-file-repository-for-p0.md.
 */
export interface Repository<T> {
  list(): Promise<T[]>;
  get(id: string): Promise<T | undefined>;
  put(id: string, value: T): Promise<void>;
  delete(id: string): Promise<void>;
}
