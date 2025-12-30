const express = require("express");
const app = express();

app.use(express.json());

const codes = {}; // códigos em memória

app.post("/create", (req, res) => {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  codes[code] = { used: false };
  res.json({ code });
});

app.post("/redeem", (req, res) => {
  const { code } = req.body;

  if (!codes[code]) {
    return res.status(400).json({ error: "Código inválido" });
  }

  if (codes[code].used) {
    return res.status(400).json({ error: "Código já usado" });
  }

  codes[code].used = true;
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API rodando na porta", PORT));
