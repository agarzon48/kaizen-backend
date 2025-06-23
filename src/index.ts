import express from 'express';
import cors from 'cors';
import routes from './infraestructure/express/routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Business Logic
app.use('/api', routes);

// Run the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});