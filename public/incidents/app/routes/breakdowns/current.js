import Ember from 'ember';

export default Ember.Route.extend({
	model: function(){
		return Ember.$.getJSON('http://aeeapi.herokuapp.com/api/lista.json');
	}
});
