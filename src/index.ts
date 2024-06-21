import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use('/api', routes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/p3tp2militar', {
     });
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro de conexão com o banco:', error);
    process.exit(1); // Sair do processo em caso de erro na conexão
  }
};

startServer();
