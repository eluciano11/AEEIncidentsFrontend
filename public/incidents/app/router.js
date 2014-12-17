import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('breakdowns', function(){
		this.route('specific', {path: 'specific/:town_name'});
	});
});

export default Router;
