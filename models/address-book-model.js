// 
var mongo = require('./init-db'),
	assert = require('assert');

var address_book_model = function(){
	var update_contact = function(params,callback){
		var return_flag = 0;
		// validate fields and do upsert
		var temp_params = {};
		for(key in params){
			if((key!=='_id') && (params[key]==='')){
				params[key]='dummy';
			}
			if(key!=='_id'){
				temp_params[key] = params[key];
			}
		}
		if(params['_id']!==''){
			console.log('updating contact');
			params['_id'] = new mongo.myObject(params['_id']);
			mongo.myCollection.updateOne({'_id':params['_id']},{$set:temp_params},function(err,suc){
				assert.equal(null,err,'Unable to update');
            	if(suc.result.n===1){
            		console.log('update successful');
                	callback(suc.result.n);
            	}
                else callback(return_flag);
			});
		} else {
			console.log('inserting contact');
			mongo.myCollection.insertOne(temp_params,function(err,suc){
				//console.log(err);
				//console.log(suc);
				assert.equal(null,err,'Unable to insert');
            	if(suc.insertedCount===1)
                	callback(suc.ops);
                else callback(return_flag);
			});
		}
	}

	var fetch_contacts = function(params,callback){
		var return_flag = 0;
		var params = params || {};
		if(Object.keys(params).length==0){
			mongo.myCollection.find(params).toArray(function(err,docs){
				assert.equal(null,err,'Unable to fetch');
	        	if(docs.length>=1)
	            	callback(docs);
	            else callback(return_flag);
			});
		} else {
			var regex_obj = new RegExp(params,"i");
			params = {
				$or:[{firstname:regex_obj},{lastname:regex_obj}]
			};
			mongo.myCollection.find(params).toArray(function(err,docs){
				assert.equal(null,err,'Unable to search');
	        	if(docs.length>=1)
	            	callback(docs);
	            else callback(return_flag);
			});
		}
	}

	return{
		update_contact:update_contact,
		fetch_contacts:fetch_contacts
	}
}
module.exports={
	address_book_model:address_book_model
}