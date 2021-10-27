import multer from 'multer';
import { extname, resolve } from 'path';

// vai vir um numero aleatorio entre 20k
const randomNumb = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // checar se image: png , jpg
  fileFilter: (req, file, cb) => {
    // estamos pegaondo o erro do primeiro parametro
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisa ser .PNG ou .JPG'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomNumb()}${extname(file.originalname)}`);
    },
  }),
};
