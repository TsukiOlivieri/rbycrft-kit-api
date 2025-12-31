import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   BANCO SIMPLES (TEMPORÁRIO)
========================= */
const codes = [];

/* =========================
   GERAR CÓDIGO ÚNICO
========================= */
function gerarCodigo() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/* =========================
   TESTE DA API
========================= */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API RbyCrft Kit online"
  });
});

/* =========================
   DISCORD → CRIAR CÓDIGO
========================= */
app.post("/api/createcode", (req, res) => {
  const { discordId, product } = req.body;

  if (!discordId || !product) {
    return res.status(400).json({
      status: "error",
      message: "Dados inválidos"
    });
  }

  const code = gerarCodigo();

  codes.push({
    code,
    product,
    used: false
  });

  res.json({
    status: "success",
    code,
    product
  });
});

/* =========================
   MINECRAFT → RESGATAR
========================= */
app.post("/api/redeem", (req, res) => {
  const { code, player } = req.body;

  if (!code || !player) {
    return res.status(400).json({
      status: "error",
      message: "Código ou jogador ausente"
    });
  }

  const data = codes.find(c => c.code === code);

  if (!data) {
    return res.status(404).json({
      status: "error",
      message: "Código inválido"
    });
  }

  if (data.used) {
    return res.status(409).json({
      status: "error",
      message: "Código já resgatado"
    });
  }

  // marcar como usado
  data.used = true;

  /* AQUI: entregar kit no Minecraft */

  res.json({
    status: "success",
    message: "Kit resgatado com sucesso",
    product: data.product,
    player
  });
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API rodando na porta ${PORT}`);
});
