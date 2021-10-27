"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name:
      {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo name deve ter entre 3 e 255 caracteres',
          },
        },
      },

      email: {
        type: _sequelize2.default.STRING,
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
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },

      password: {
        type: _sequelize2.default.VIRTUAL,
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
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  // comparando, ele retorna uma promisse
  passwordValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;

/**
 *  explicaçào no README
 *
 */
