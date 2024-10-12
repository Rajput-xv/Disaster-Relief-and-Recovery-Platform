const syncOfflineData = async () => {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      try {
        await registration.sync.register('sync-offline-data');
        console.log('Sync registered');
      } catch (err) {
        console.error('Sync registration failed:', err);
      }
    } else {
      // Fallback for browsers that don't support background sync
      console.log('Background sync not supported');
      // Implement manual sync here
    }
  };
  
  export { syncOfflineData };