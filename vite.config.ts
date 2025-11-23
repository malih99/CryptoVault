import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    middlewareMode: false,
    setup: (server) => {},
    // برای Vite 7+
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const useMock = process.env.VITE_USE_MOCK_API === "1";
        if (!useMock) return next();

        if (req.url?.startsWith("/api/transactions")) {
          try {
            const p = path.resolve(__dirname, "src/mocks/transactions.json");
            const json = fs.readFileSync(p, "utf-8");
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.statusCode = 200;
            res.end(json);
            return;
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "mock file not found" }));
            return;
          }
        }
        next();
      });
    },
  },
});
