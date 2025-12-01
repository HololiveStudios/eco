// src/lib/offline-storage.ts - NOVO (IndexedDB para armazenamento offline)
class OfflineStorage {
  private dbName = 'ecommerce-offline';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Store para pedidos offline
        if (!db.objectStoreNames.contains('orders')) {
          const ordersStore = db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
          ordersStore.createIndex('timestamp', 'timestamp', { unique: false });
          ordersStore.createIndex('synced', 'synced', { unique: false });
        }

        // Store para carrinho offline
        if (!db.objectStoreNames.contains('cart')) {
          db.createObjectStore('cart', { keyPath: 'productId' });
        }

        // Store para produtos em cache
        if (!db.objectStoreNames.contains('products')) {
          const productsStore = db.createObjectStore('products', { keyPath: 'id' });
          productsStore.createIndex('category', 'category', { unique: false });
          productsStore.createIndex('featured', 'featured', { unique: false });
        }

        // Store para favoritos
        if (!db.objectStoreNames.contains('wishlist')) {
          db.createObjectStore('wishlist', { keyPath: 'productId' });
        }
      };
    });
  }

  async saveOfflineOrder(order: any): Promise<number> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['orders'], 'readwrite');
      const store = transaction.objectStore('orders');
      const request = store.add({
        ...order,
        timestamp: Date.now(),
        synced: false
      });

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async getOfflineOrders(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['orders'], 'readonly');
      const store = transaction.objectStore('orders');
      const index = store.index('synced');
      const request = index.getAll(false);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async markOrderAsSynced(id: number): Promise<void> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['orders'], 'readwrite');
      const store = transaction.objectStore('orders');
      const request = store.get(id);

      request.onsuccess = () => {
        const order = request.result;
        if (order) {
          order.synced = true;
          const updateRequest = store.put(order);
          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = () => reject(updateRequest.error);
        } else {
          resolve();
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async saveCart(items: any[]): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['cart'], 'readwrite');
    const store = transaction.objectStore('cart');

    // Limpar carrinho existente
    await store.clear();

    // Adicionar novos itens
    for (const item of items) {
      await store.add(item);
    }
  }

  async getCart(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['cart'], 'readonly');
      const store = transaction.objectStore('cart');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async cacheProducts(products: any[]): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['products'], 'readwrite');
    const store = transaction.objectStore('products');

    for (const product of products) {
      await store.put(product);
    }
  }

  async getCachedProducts(): Promise<any[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['products'], 'readonly');
      const store = transaction.objectStore('products');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async saveWishlist(items: string[]): Promise<void> {
    if (!this.db) await this.init();

    const transaction = this.db!.transaction(['wishlist'], 'readwrite');
    const store = transaction.objectStore('wishlist');

    await store.clear();

    for (const productId of items) {
      await store.add({ productId, timestamp: Date.now() });
    }
  }

  async getWishlist(): Promise<string[]> {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['wishlist'], 'readonly');
      const store = transaction.objectStore('wishlist');
      const request = store.getAll();

      request.onsuccess = () => {
        const items = request.result.map((item: any) => item.productId);
        resolve(items);
      };
      request.onerror = () => reject(request.error);
    });
  }
}

export const offlineStorage = new OfflineStorage();