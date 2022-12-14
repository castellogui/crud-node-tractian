import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import companyRoutes from "./routes/CompanyRoutes";
import unitRoutes from "./routes/UnitRoutes";
import assetRoutes from "./routes/AssetRoutes";

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
app.use("/units", unitRoutes);
app.use("/assets", assetRoutes);

export default app;
