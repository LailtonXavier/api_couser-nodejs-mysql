import Sequelize, { Model } from 'sequelize';

// esse é uma classe estaranha, do proprio sequelize
export default class Aluno extends Model {
  static init(sequelize) {
    // pra chamar o init do pai
    super.init({
      // pegando os campos do migrate-Alunos
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 caracteres',
          },
        },
      },

      lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Sobrenome precisa ter entre 3 e 255 caracteres',
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },

      age: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Idade precisa ser um numero inteiro',
          },
        },
      },

      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Peso precisar ser numero inteiro ou de ponto flutuante',
          },
        },
      },

      height: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Altura precisar ser inteiro ou ponto flutuante',
          },
        },
      },

    }, {
      sequelize,
    });
    return this;
  }

  // um aluno tem muitas fotos e qual o seu foreignkey id
  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}
