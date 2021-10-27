import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/Aluno'; // todos model devem vir aqui e colocar no array
import User from '../models/User';
import Foto from '../models/Foto';

const models = [Aluno, User, Foto]; // todos models aqui

const connection = new Sequelize(databaseConfig);

// vou jogar a conexão aqui dentro
models.forEach((model) => model.init(connection));

// vms checar se tem o metodo de assoation e executar ele
models.forEach((model) => model.associate && model.associate(connection.models));

// depois q criado precisamos chama-lo em nosso servidor
// no App.js
