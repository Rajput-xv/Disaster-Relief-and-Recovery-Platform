self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-offline-data') {
      event.waitUntil(syncOfflineDataToServer());
    }
  });
  
  async function syncOfflineDataToServer() {
    const offlineData = await getOfflineData();
    // Implement logic to send offline data to server
    // Update local storage or IndexedDB after successful sync
  }