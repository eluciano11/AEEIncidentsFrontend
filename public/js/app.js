App = Ember.Application.create();

//Router
App.Router.map(function() {
    this.resource('breakdowns', function(){
        this.route('specific', {path: 'specific/:town_name'});
    });
});

//Routes
App.BreakdownsRoute = Ember.Route.extend({
    model: function(){
        return Ember.$.getJSON('http://aeeapi.herokuapp.com/api/lista.json');
    }

});

App.BreakdownsSpecificRoute = Ember.Route.extend({
    model: function(params){
        return Ember.$.getJSON('http://aeeapi.herokuapp.com/api/pueblo_especifico.json?pueblo=' + params.town_name);
    }
});

//Controllers
App.BreakdownsController = Ember.ArrayController.extend({
    actions:{
        highlightMap: function(data){
            var town = data.toLowerCase().split(' ');

            if(town.length < 1){
                jQuery(('#map-' + town[0])).attr('class', 'map-active');
            }else{
                var newTownId = '';

                for(var i = 0; i < town.length; i++)
                    newTownId += town[i] + '_';

                if(newTownId.charAt((newTownId.length - 1)) === '_')
                    newTownId = newTownId.substring(0, (newTownId.length - 1));

                jQuery(('#map-' + newTownId)).attr('class', 'map-active');
            }

            this.transitionToRoute('breakdowns.specific', data.toLowerCase());
        }
    }
});
