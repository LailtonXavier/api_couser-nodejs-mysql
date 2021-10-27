import User from '../models/User';

class UserController {
  // create user
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);

      const { id, name, email } = novoUser;

      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // index = retorna todos = depois de criar Vai em Routes
  async index(req, res) {
    try {
      // atytibutes serve para a gente escolher quais campo queremos
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

      return res.json(users);
    } catch (e) {
      return res.json(null);
      // se cair no catch o program quebrou, returno valor nulo
    }
  }

  // show = pegando pelo id
  async show(req, res) {
    try {
      // pegando pela a primatyKey do user
      // const { id } = req.params;
      const user = await User.findByPk(req.params.id);

      // mostrar so quem eu quero
      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // update = vai ser uma mistura
  async update(req, res) {
    try {
      // pegando o id de meu token
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(401).json({
          errors: ['Usuario não existe'],
        });
      }

      // oq a pessoa mandar eu atualizo
      const novosDados = await user.update(req.body);
      const { id, name, email } = novosDados;
      return res.json({ id, name, email });
    } catch (e) {
      // com esse tratamento vemos o erro
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuarion não existe'],
        });
      }

      // so com isso ele vai ser apagador na base de dados
      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  //
}
export default new UserController();

/**
 *
// index = sempre q mexer com a base de dados usamos Async
// pq retorna um promise e precismos esperar oq esta sendo retornado
// da base de daados

      isso estava tanto no `UserContreoller` pra test
      {
        name: 'Jose',
        email: 'jose@gmail.com',
        password: '123456',
      }
    ]

 */
