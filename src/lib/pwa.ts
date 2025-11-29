// src/lib/pwa.ts - Helpers PWA
export class PWAManager {
  private deferredPrompt: any = null;
  private swRegistration: ServiceWorkerRegistration | null = null;

  async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('[PWA] Service Worker registered');
        
        // Verificar atualizações
        this.swRegistration.addEventListener('updatefound', () => {
          this.handleUpdateFound();
        });
        
        // Verificar se há update aguardando
        if (this.swRegistration.waiting) {
          this.showUpdateNotification();
        }
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error);
      }
    }

    // Capturar evento de instalação
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Detectar quando foi instalado
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] App installed');
      this.deferredPrompt = null;
      this.hideInstallButton();
    });

    // Verificar se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('[PWA] Running in standalone mode');
    }

    // Registrar Periodic Background Sync
    this.registerPeriodicSync();
  }

  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    console.log(`[PWA] User response: ${outcome}`);
    this.deferredPrompt = null;
    
    return outcome === 'accepted';
  }

  private showInstallButton() {
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.classList.remove('hidden');
    }
  }

  private hideInstallButton() {
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.classList.add('hidden');
    }
  }

  private handleUpdateFound() {
    const newWorker = this.swRegistration?.installing;
    
    if (newWorker) {
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          this.showUpdateNotification();
        }
      });
    }
  }

  private showUpdateNotification() {
    const updateBanner = document.createElement('div');
    updateBanner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-primary text-white p-4 rounded-lg shadow-lg z-50';
    updateBanner.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <p class="font-semibold">Nova versão disponível!</p>
          <p class="text-sm opacity-90">Clique para atualizar</p>
        </div>
        <button id="update-button" class="ml-4 bg-white text-primary px-4 py-2 rounded font-semibold hover:bg-gray-100">
          Atualizar
        </button>
      </div>
    `;
    
    document.body.appendChild(updateBanner);
    
    document.getElementById('update-button')?.addEventListener('click', () => {
      this.updateServiceWorker();
      updateBanner.remove();
    });
  }

  private updateServiceWorker() {
    if (this.swRegistration?.waiting) {
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }

  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }
    
    return await Notification.requestPermission();
  }

  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (!this.swRegistration) {
      return null;
    }

    try {
      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          'YOUR_VAPID_PUBLIC_KEY' // Gerar com web-push
        )
      });
      
      console.log('[PWA] Push subscription:', subscription);
      
      // Enviar subscription para o servidor
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
      
      return subscription;
    } catch (error) {
      console.error('[PWA] Failed to subscribe to push:', error);
      return null;
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }

  private async registerPeriodicSync() {
    if (!this.swRegistration || !('periodicSync' in this.swRegistration)) {
      return;
    }

    try {
      await (this.swRegistration as any).periodicSync.register('update-products', {
        minInterval: 24 * 60 * 60 * 1000 // 24 horas
      });
      console.log('[PWA] Periodic sync registered');
    } catch (error) {
      console.error('[PWA] Failed to register periodic sync:', error);
    }
  }

  async registerBackgroundSync(tag: string) {
    if (!this.swRegistration || !('sync' in this.swRegistration)) {
      return;
    }

    try {
      await (this.swRegistration as any).sync.register(tag);
      console.log(`[PWA] Background sync registered: ${tag}`);
    } catch (error) {
      console.error('[PWA] Failed to register background sync:', error);
    }
  }

  async checkForUpdates() {
    if (this.swRegistration) {
      await this.swRegistration.update();
    }
  }

  async clearCache() {
    if (this.swRegistration) {
      const sw = this.swRegistration.active;
      sw?.postMessage({ type: 'CLEAR_CACHE' });
    }
  }

  async getVersion(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.swRegistration) {
        resolve('unknown');
        return;
      }

      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version || 'unknown');
      };

      this.swRegistration.active?.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      );
    });
  }

  isOnline(): boolean {
    return navigator.onLine;
  }

  onOnline(callback: () => void) {
    window.addEventListener('online', callback);
  }

  onOffline(callback: () => void) {
    window.addEventListener('offline', callback);
  }
}

export const pwa = new PWAManager();