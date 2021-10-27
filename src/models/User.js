import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name:
      {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo name deve ter entre 3 e 255 caracteres',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email ja existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },

      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },

      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'O campo senha precisa ter entre 6 a 50 caracteres',
          },
        },
      },
    },

    {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      // fazendo um hash de pass e jogando en pass_hash
      // seria de 8 a 10
      if (user.password) { // com isso estamos garantindo q sera enviado a senha
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  // comparando, ele retorna uma promisse
  passwordValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

/**
 *  explicaçào no README
 *
 */
