/**
 * Created by albertlwohletz on 2/7/15.
 */

// Init JQuery Elements
$(function() {
    $( ".resizable" ).resizable();

    // Overlay close button
    $('.close-button').click(function() {
    	$(this).parent().hide();
	});
});

$(function(){
	// Qualities Functios
	$('.add-qualities').click(function(){
		$('.qualities').show();
	});
	$('.quality-item').click(function(e){
		desc = 'Karma: ' + $( this ).val() + '</br>' + $( this ).attr('description')
		$('.quality-description').html(desc);
		$('.quality-item').removeClass('active');
		$(this).addClass('active');
	});	
});

var attributes={
	'bod': {'base': 1, 'aug': 1},
	'agi': {'base': 1, 'aug': 1},
	'rea': {'base': 1, 'aug': 1},
	'str': {'base': 1, 'aug': 1},
	'cha': {'base': 1, 'aug': 1},
	'int': {'base': 1, 'aug': 1},
	'log': {'base': 1, 'aug': 1},
	'wil': {'base': 1, 'aug': 1},
	'edg': {'base': 1},
	'mag': {'base': 1, 'aug': 1},
	'res': {'base': 1, 'aug': 1}
}

var summary_data={
	'priorities_spent': 0,
	'priorities_available': 16,
	'attributes_spent': 0,
	'attributes_available': 16,
	'skills_spent': 0,
	'skills_available': 16,
	'skill_groups_spent': 0,
	'skill_groups_available': 10,
	'karma': 25,
	'attributes': attributes,
	'qualities': [],
	'skills': [],
	'race': '',
}



function update_attributes(key, value){
	summary_data[key] = value;
	$('#summary-primary-attributes').html(summary_data['attributes_spent'] + ' of ' + summary_data['attributes_available']);

	if (summary_data['attributes_spent'] > summary_data['attributes_available']){
		$('#summary-primary-attributes').parent().addClass('danger');		
		$('#summary-primary-attributes').parent().removeClass('success');		
	} else if (summary_data['attributes_spent'] == summary_data['attributes_available']) {
		$('#summary-primary-attributes').parent().addClass('success');		
		$('#summary-primary-attributes').parent().removeClass('danger');		
	} else {
		$('#summary-primary-attributes').parent().removeClass('danger');		
		$('#summary-primary-attributes').parent().removeClass('success');
	}
}

function update_skills(key, value){
	summary_data[key] = value;

	$('#summary-skills').html(summary_data['skills_spent'] + ' of ' + summary_data['skills_available']);
	$('#summary-groups').html(summary_data['skill_groups_spent'] + ' of ' + summary_data['skill_groups_available']);

	if (summary_data['skills_spent'] > summary_data['attributes_available']){
		$('#summary-skills').parent().addClass('danger');		
		$('#summary-skills').parent().removeClass('success');	
	} else if (summary_data['skills_spent'] == summary_data['attributes_available']){
		$('#summary-skills').parent().addClass('success');		
		$('#summary-skills').parent().removeClass('danger');	
	} else {
		$('#summary-skills').parent().removeClass('danger');	
		$('#summary-skills').parent().removeClass('success');	
	}

	if (summary_data['skill_groups_spent'] > summary_data['skill_groups_available']){
		$('#summary-groups').parent().addClass('danger');		
	} else {
		$('#summary-groups').parent().removeClass('danger');	
	}
}

function get_data(key){
	return data[key];
}

function get_attribute(key){
	return attributes[key];
}
function set_attribute(key, value){
	attributes[key]['base'] = value;
	$('.'+key+'-val').html(value);
}
function increment_base(key, value){
	attributes[key]['base'] += value;
	$('.'+key+'-val').html(value);
}

function change_karma(delta){
	summary_data['karma'] += delta;

	$('#summary-karma').html(summary_data['karma']);

	if (summary_data['karma'] > 0) {
		$('#summary-karma').parent().removeClass('danger');
		$('#summary-karma').parent().removeClass('success');
	} else if (summary_data['karma'] == 0){
		$('#summary-karma').parent().removeClass('danger');
		$('#summary-karma').parent().addClass('success');
	} else {
		$('#summary-karma').parent().addClass('danger');
		$('#summary-karma').parent().removeClass('success');
	}
}

function add_quality(name, karma){
	length = summary_data['qualities'].length;
	summary_data['qualities'][length] = {'name': name, 'karma': karma};
	change_karma(-1 * karma);

	return $('.active-qualities-list').html($('.active-qualities-list').html()+"<li id=quality" + length + " class='list-group-item attached-quality'>"+name+"</li>");
}

function remove_quality(id){
	karma = summary_data["qualities"][id]['karma'];
	summary_data["qualities"][id] = {};
	$('.quality').addClass('hidden');
	change_karma(karma);
}

// Initialize
$(function(){ 
	set_race('human');
});
