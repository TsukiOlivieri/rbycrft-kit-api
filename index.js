const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/create", (req, res) => {
  const kit = req.body.kit;
  const buyer = req.body.buyer;

  if (!kit || !buyer) {
    return res.status(400).json({
      success: false,
      error: "missing parameters"
    });
  }

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  res.json({
    success: true,
    code: code
  });
});

app.get("/", (req, res) => {
  res.send("API online");
});

const PORT = process.env.PORT;
app.listen(PORT, "0.0.0.0", () => {
  console.log("API rodando na porta " + PORT);
});
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
