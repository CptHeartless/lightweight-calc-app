import { MemoryStorage } from './MemoryStorage';

export interface IStorage {
  set: (key: string, value: string) => void;
  get: (key: string) => string | null;
  key: (idx: number) => string | null;
  remove: (key: string) => void;
  length: number;
}

const isLocalStorageSupported = (): boolean => {
  try {
    localStorage.getItem('');
    return true;
  } catch {
    return false;
  }
};

export class SafeStorage implements IStorage {
  private storage: Storage;

  public get length() {
    return this.storage.length;
  }

  public constructor(type: 'session' | 'local' = 'session') {
    if (isLocalStorageSupported()) {
      this.storage = type === 'local' ? localStorage : sessionStorage;
    } else {
      this.storage = new MemoryStorage();
    }
  }

  public get(key: string) {
    return this.storage.getItem(key);
  }

  public set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  public remove(key: string) {
    this.storage.removeItem(key);
  }

  public key(idx: number) {
    return this.storage.key(idx);
  }
}
