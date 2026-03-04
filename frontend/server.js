import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80; // Nginx was listening on 80 inside the container
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:5000';

console.log(`Starting frontend server...`);
console.log(`Serving static files from ${path.join(__dirname, 'dist')}`);
console.log(`Proxying /api requests to ${BACKEND_URL}`);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Proxy error: ${err.message}`);
    if (err.code === 'ENOTFOUND') {
      console.error(`Error: Could not resolve backend host '${BACKEND_URL}'.`);
      console.error('Please ensure the BACKEND_URL environment variable is set correctly to your backend service URL.');
    }
    res.status(500).send('Proxy Error');
  }
  // If the backend expects /api prefix (which it does based on backend/index.ts), 
  // we don't need pathRewrite to remove it.
  // But we might need to ensure the path is forwarded correctly.
  // By default, /api/foo is forwarded as /api/foo to target.
  // If backend is http://backend:5000, then it hits http://backend:5000/api/foo
  // This matches backend routes: app.use('/api/auth', ...)
}));

// Handle SPA routing - return index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server is running on port ${PORT}`);
});
