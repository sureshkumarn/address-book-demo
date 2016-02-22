var express = require('express');
var router = express.Router();
var controller = require('../lib/address-book');
//var todo_model = require('../models/todos_model').DB_Con();

//todo_model.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.use('/contacts', controller.fetch_contacts);

router.use('/update-contact', controller.update_contact);

module.exports = router;