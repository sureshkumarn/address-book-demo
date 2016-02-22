// Address Book Functionalities
var addressbook = function(){

	var edit_info = function(){
		var initial_data = {
			'firstname':'',
			'lastname':'',
			'mobile':'',
			'home':'',
			'email':'',
			'work':'',
			'_id':''
		}
		var save_initial_state = function(details){
			//console.log(details);
			$('*[data-item]',details).each(function(){
				var k = $(this).attr('data-item');
				initial_data[k] = $(this).text();
				$(this).attr('contenteditable','true');
			});
			initial_data._id=$(details).attr('data-_id')||'';
		}
		var update_contact = function(data){
			if(data){
				$('.cnt_detail *[data-item]').removeClass('dotted');
			} else{
				// Todo : display error in updating
			}
		}
		var validate_info = function(details){

		}
		// Attach event
		$('.cnt-edit').on('click',function(event){
			if($(this).text()==='Edit'){
				var cnt_detail = $('.cnt-detail');
				// Save current data
				save_initial_state($(this).parents('.cnt-detail'));
				$('.cnt-detail *[data-item]').addClass('dotted');
				$(this).text('Save');
			} else if($(this).text()==='Save'){
				var validation = true;
				//var validation = validate_info($(this).parents('.cnt-detail'));
				save_initial_state($(this).parents('.cnt-detail'));

				if(validation)
				$.post('/update-contact',initial_data,function(data){
					update_contact(data);
				});
				else {
					$('.info').html('Few Details are missing/have error. Please correct them.');
				}
			}
			event.preventDefault();
		});
		// process event
		// display event
	}

	var _load_details_panel = function(){
		var dd = '',
			cnt_details = {
				'_id':"",
				'firstname':'',
				'lastname':'',
				'mobile':'',
				'home':'',
				'email':'',
				'work':''
			},
			cnt_details = $('.cnt-detail');
		$('.cnt-list').on('click','a',function(event){
			dd = $(this).parents('dd');
			$('*[data-item]',dd).each(function(key){
				a = $(this).attr('data-item');
				k = '*[data-item='+a+']';
				$(k,cnt_details).text($(this).attr('data-value')).removeClass('dotted');
			});
			$(cnt_details).attr('data-_id',$(dd).attr('data-value'));
			$(cnt_details).show();
			$('.cnt-edit',cnt_details).text('Edit');
			event.preventDefault();
		});
	}

	var _display_contacts = function(contacts,list,index){
		var dl_str = '',
			li_str = '',
			temp_str = '',
			c_char = '',
			firstletter = '',
			s = "";
		//todo : sort the contacts
		contacts.sort(function(a,b){
			var v1 = a.firstname[0].toLowerCase();
			var v2 = b.firstname[0].toLowerCase();
			if (v1 < v2) {
    			return 1;
			}
			else if (v1 > v2) {
    			return -1;
			}
			return 0;
		});
		for (var i = contacts.length - 1; i >= 0; i--) {
			firstletter = contacts[i].firstname[0].toString().toUpperCase();
			if(c_char!==firstletter){
				s+='<dt id="'+firstletter+'">'+firstletter+'</dt>';
				li_str += '<li><a href="#'+firstletter+'">'+firstletter+'</a></li>';
				c_char = firstletter;
			}
			s += '<dd data-item="_id" data-value="'+contacts[i]._id+'"><a href=""><span data-item="firstname" data-value="'+contacts[i].firstname+'">'+contacts[i].firstname+'</span>&nbsp;<span data-item="lastname" data-value="'+contacts[i].lastname+'">'+contacts[i].lastname+'</span></a><input type="hidden" data-item="mobile" data-value="'+contacts[i].mobile+'"><input type="hidden" data-item="home" data-value="'+contacts[i].home+'"><input type="hidden" data-item="email" data-value="'+contacts[i].email+'"><input type="hidden" data-item="work" data-value="'+contacts[i].work+'"></dd>';
		}
		$(index).html(li_str);
		$(list).html(s);
	}

	var _fetch_contacts = function(q){
		var q = q || '';
		$.get('/contacts?q='+q,function(data){
			data = JSON.parse(data);
			_display_contacts(data,$('.cnt-list')[0],$('.cnt-index')[0]);
		});
	}

	var list_contacts = function(){
		//fetch contacts
		_fetch_contacts();
		_load_details_panel();
	}

	/*
		Adds a contact
	*/
	var add_contact = function(){
		var details = $('.cnt-detail')[0];

		// Attach events
		$('.nlist-header a[href="/add-contact"]').on('click',function(event){
			$('*[data-item]',details).each(function(){
				$(this).html('').attr('contenteditable','true').addClass('dotted');
			});
			$('.cnt-edit').html('Save');
			$('.cnt-detail').attr('data-_id','').show();
			event.preventDefault();
		});
	}
	/*
		search functionality
	*/
	var search_contacts = function(){
		var q = '';
		$('input[name=cnt-name]').on('keyup',function(event){
			if(event.which==13){
				q = $(this).val();
				_fetch_contacts(q);
			}
		});
	}

	var init = function(){
		list_contacts();
		edit_info();
		add_contact();
		search_contacts();
	}
	return{
		init:init,
		add_contact:add_contact,
		edit_info:edit_info,
		list_contacts:list_contacts,
		search_contacts:search_contacts
	}
}

$(document).ready(function(){
	var ab = new addressbook();
	ab.init();
	$('.cnt-detail').hide();
	$('.close').on('click',function(e){
		$('.cnt-detail').hide();
		e.preventDefault();
	})
});