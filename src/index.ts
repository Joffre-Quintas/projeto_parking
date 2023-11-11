import express from 'express';
import route from './router';
import cors from 'cors';

const app = express()

//middlewares
app.use(express.json())
app.use(cors())
app.use(route)

app.listen(3000, () => console.log('Servidor rodando...'))