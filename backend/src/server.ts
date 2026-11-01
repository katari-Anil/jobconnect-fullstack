import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 JobConnect REST API Backend Running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`👤 Developer: Katari Anil (https://github.com/katari-Anil)`);
  console.log(`=========================================`);
});
