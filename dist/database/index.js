"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno); // todos model devem vir aqui e colocar no array
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const models = [_Aluno2.default, _User2.default, _Foto2.default]; // todos models aqui

const connection = new (0, _sequelize2.default)(_database2.default);

// vou jogar a conexão aqui dentro
models.forEach((model) => model.init(connection));

// vms checar se tem o metodo de assoation e executar ele
models.forEach((model) => model.associate && model.associate(connection.models));

// depois q criado precisamos chama-lo em nosso servidor
// no App.js
