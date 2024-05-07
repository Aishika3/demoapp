/* eslint-disable no-restricted-globals */
// worker.js

self.onmessage = async function (event) {
    try {
      const modelUrl = event.data;
      console.log('Downloading model:', modelUrl);
  
      // Simulating model download
      // You might use actual download logic here
      const response = await fetch(modelUrl);
      const modelData = await response.text();
  
      // Send a message back to the main thread with the downloaded model data
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({ status: 'success', modelData });
    } catch (error) {
      console.error('Error downloading model:', error);
  
      // Send an error message back to the main thread
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({ status: 'error', error: error.message });
    }
  };
  