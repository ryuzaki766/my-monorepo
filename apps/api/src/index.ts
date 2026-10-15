import express from "express";
import fs from "fs";
import path from "path";
import { APP_NAME } from "@my-app/shared";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// ---------- API routes ----------
app.get("/api/hello", (_req, res) => {
  res.json({ message: `Halo dari backend ${APP_NAME}!` });
});

// ---------- Serve frontend hasil build (mode produksi) ----------
// Hanya aktif kalau folder apps/web/dist sudah ada (setelah `npm run build`)
const webDist = path.join(__dirname, "../../web/dist");

if (fs.existsSync(webDist)) {
  app.use(express.static(webDist));

  // Express 5: wildcard harus pakai nama, bukan "*" polos
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(webDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API jalan di http://localhost:${PORT}`);
});