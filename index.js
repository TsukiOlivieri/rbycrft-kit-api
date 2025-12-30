import express from "express";

const app = express();

// Permite interpretar BODY enviado como x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Também interpreta JSON se for enviado
app.use(express.json());

// Endpoint de criação de código
app.post("/create", (req, res) => {
  try {
    const { kit, buyer } = req.body;

    // Valida parâmetros
    if (!kit || !buyer) {
      return res
        .status(400)
        .json({ success: false, error: "kit ou buyer faltando" });
    }

    // Gera um código aleatório
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    return res.json({
      success: true,
      code: code,
      kit: kit,
      buyer: buyer
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Erro interno da API" });
  }
});

// Endpoint de resgate de código (lembre de adaptar depois)
app.post("/redeem", (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ success: false, error: "code faltando" });
    }

    // Aqui você adiciona validação real depois
    // Por enquanto só devolve sucesso para testes
    return res.json({ success: true, code: code });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Erro interno da API" });
  }
});

// Resposta simples pra GET /
app.get("/", (req, res) => {
  res.send("API online");
});

// Usa a porta do Render ou 3000 local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
