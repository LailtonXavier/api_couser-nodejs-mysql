import { resolve } from 'path';

import './database'; // aqui estamos chamando nosso arq pra rodar...

import cors from 'cors';
import helmet from 'helmet';

import express from 'express';
import homeRoutes from './routes/homeRoutes';
import userRoutes from './routes/userRoutes';
import alunoRoutes from './routes/alunoRoutes';
import tokenRoutes from './routes/tokenRoutes';
import photoRoutes from './routes/photoRoutes.js';

// o dominio que tera acesso
// tenho q colocar a aplicacao react que vai consumir
const allowList = [
  'https://apilailton.tk',
  'http://localhost:3000',
];

// agora as configs
// se tiver na list acima, passa
const corsOptions = {
  origin(origin, calback) {
    if (allowList.indexOf(origin) !== -1 || !origin) {
      calback(null, true);
    } else {
      calback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', photoRoutes);
  }
}

export default new App().app;
