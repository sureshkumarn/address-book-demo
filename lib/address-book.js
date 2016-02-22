// Address Book Controller
var model = require('../models/address-book-model').address_book_model();
var controller = {};

controller.generic_callback = function(req,res){
	console.log('hola');
}
controller.update_contact = function(req,res){
	var update_callback = function(result){
		if(result){
			res.status(200).send(JSON.stringify(result));
		} else {
			res.status(200).send(JSON.stringify(0));
		}
		//console.log(result);
	}
	// Update Contact information if no contact id is present add it to db
	var params = req.body;
	model.update_contact(params,update_callback);
	//console.log(model);
	//console.log(req.body.post);
}

controller.fetch_contacts = function(req,res){
	var fetch_callback = function(result){
		if(result){
			res.status(200).send(JSON.stringify(result));
		} else {
			res.status(200).send(JSON.stringify(0));
		}
	}
	// Load contact list
	var params = req.query.q || '';
	model.fetch_contacts(params,fetch_callback);
	//res.status(200).send('hola!!!');
}

controller.delete_contact = function(req,res){
	// delete contact
}

module.exports = controller; 
