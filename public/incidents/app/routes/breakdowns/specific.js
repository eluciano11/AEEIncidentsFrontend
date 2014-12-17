import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return Ember.$.getJSON(
			'http://aeeapi.herokuapp.com/api/pueblo_especifico.json?pueblo=' + params.town_name.toLowerCase());
	}
});
