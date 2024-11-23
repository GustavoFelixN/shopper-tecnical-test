import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Sucesso");
});

app.listen(PORT, () => {
  console.log(`Server runnig at port: ${PORT}`);
});
