const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/create", (req, res) => {
  const { kit, buyer } = req.body;

  if (!kit || !buyer) {
    return res.status(400).json({
      success: false,
      error: "missing parameters"
    });
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  res.json({
    success: true,
    code
  });
});

app.get("/", (req, res) => {
  res.send("API online");
});

// ⬇️ APENAS ISSO ⬇️
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("API rodando na porta " + PORT);
});
