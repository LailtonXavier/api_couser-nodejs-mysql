import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto'); // pegando ja o nome

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
        const foto = await Foto.create({ originalname, filename, aluno_id });

        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
    });
  }
}

export default new PhotoController();
