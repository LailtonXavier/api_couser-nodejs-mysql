class HomeController {
  async index(req, res) {
    res.json('Index');
  }
}

export default new HomeController();
// nesse test esse aluno q esta sendo criado deve ser retornado de cara
// é o padrao de API REST cria e retorna logo
