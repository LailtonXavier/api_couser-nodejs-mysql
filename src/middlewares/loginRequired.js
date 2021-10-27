import jwt from 'jsonwebtoken';
import User from '../models/User';

// em todas as requizoções estamos pasando seu email e id
export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    // agora vms mandar em tds as requisições os dados
    const { id, email } = dados;

    // checar se meu id e email correspondem ao meu banco, se o msm
    // comparando com where se o id e email são iguais
    // explicação abaixo
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario com id e email invalido'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};

// para Maria pode editar seus proprios dados, precisa fazer o login e
// gerar outro token outra vez
// a cada requisição vms chegcar na base de dados
