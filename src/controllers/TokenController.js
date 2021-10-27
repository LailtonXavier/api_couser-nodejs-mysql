import jwt from 'jsonwebtoken';
import User from '../models/User';

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
    const user = await User.findOne({ where: { email } });

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
    const token = jwt.sign(
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

export default new TokenController();
