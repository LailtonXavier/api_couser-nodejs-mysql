"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

// esses n deveria existir
// router.get('/', userController.index);
// router.get('/:id', userController.show); // se liga no params id

// tirando os ids daqui, pq vms pegar o id pelo o token
// tudo esta de acordo com o id do token para fazer essas coisas
router.post('/', _loginRequired2.default, _UserController2.default.store); // criar conta
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;
/**
 *
 */
