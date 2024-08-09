import express from 'express';
import signale from 'signale';
import morgan from 'morgan';
import cors from 'cors';
import UserRouter from './user/infraestructure/routes';

const port = process.env.PORT || 3000;

const app = express();
app.disable("x-powered-by");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "PREFLIGHT"],
    credentials: true,
}));

app.use('/', UserRouter);

app.listen(port, () => {
    signale.success(`Server running on port ${port}`);
});