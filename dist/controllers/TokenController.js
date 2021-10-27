"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    // se n eviou nada
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais invalidas'],
      });
    }

    // verificando se os email esta igual
    const user = await _User2.default.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario não existe'],
      });
    }

    // se a senha n é valida retorna um erro
    if (!(await user.passwordValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    // criando nosso token, pegando id e email, secret e o temp
    const { id } = user;
    const token = _jsonwebtoken2.default.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      {
        expiresIn:
      process.env.TOKEN_EXPIRATION,
      },
    );

    return res.json({ token, user: { name: user.name, id, email } });
  }
}

exports. default = new TokenController();
