import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import companyRoutes from "./routes/CompanyRoutes";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());
app.use("/companies", companyRoutes);
app.use("/users", userRoutes);

export default app;
