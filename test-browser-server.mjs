import { startBrowserControlServerFromConfig } from './extensions/browser/src/server.js';

async function testServer() {
  console.log('Starting browser control server...');
  try {
    const state = await startBrowserControlServerFromConfig();
    if (state) {
      console.log('✓ Server started successfully!');
      console.log('  Port:', state.port);
      console.log('  URL:', `http://127.0.0.1:${state.port}/`);
      console.log('  Auth: off (no authentication required)');
      console.log('\nPress Ctrl+C to stop the server...');
      
      // Keep the server running
      process.on('SIGINT', () => {
        console.log('\nStopping server...');
        process.exit(0);
      });
    } else {
      console.log('✗ Server failed to start (browser control may be disabled in config)');
      process.exit(1);
    }
  } catch (error) {
    console.error('✗ Error starting server:', error.message);
    process.exit(1);
  }
}

testServer();
