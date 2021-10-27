"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single('foto'); // pegando ja o nome

class PhotoController {
  // store pq vamos receber um POST
  store(req, res) {
    return upload(req, res, async (err) => {
      // se tem algum erro mostra algo
      // errors: [err] aqui vimos oq tem dentro p usar
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        // pegando os nomes da foto
        const { originalname, filename } = req.file;
        // pegando o id do body que sera enviado
        const { aluno_id } = req.body;

        // criando no banco
        const foto = await _Foto2.default.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
    });
  }
}

exports. default = new PhotoController();
