App = Ember.Application.create();

//Router
App.Router.map(function() {
    this.resource('breakdowns', function(){
        this.route('specific', {path: 'specific/:town_name'});
    });
});

//Routes
App.BreakdownsRoute = Ember.Route.extend({
    beforeModel: function(){
        Ember.$('body').addClass('loading');
    },
    model: function(){
        return Ember.$.getJSON('http://aeeapi.herokuapp.com/api/lista.json');
    },
    afterModel: function(){
        Ember.$('body').removeClass('loading');
    }
});

App.BreakdownsSpecificRoute = Ember.Route.extend({
    model: function(params){
        return Ember.$.getJSON('http://aeeapi.herokuapp.com/api/pueblo_especifico.json?pueblo=' + params.town_name);
    }
});

//Views
App.BreakdownsView = Ember.View.extend({
    didInsertElement: function(){
        //This is for when the page loads
        var window_size = $(window).height();
        document.getElementById('dynamic-resize').style.height = window_size + 'px';
        generateMap();
    }
});

//Controllers
App.BreakdownsController = Ember.ArrayController.extend({
    lastTown : '',
    actions:{
        highlightMap: function(data){
            //If there is a previos town selected change it's color.
            var previouslyActiveTown = this.get('lastTown');

            if(previouslyActiveTown){
                $(previouslyActiveTown).attr('class', 'map-not-active');
            }

            var town = data.toLowerCase().split(' ');
            var elementId = '';
            if(town.length < 1){
                elementId = "#map-" + town[0];
                jQuery(elementId).attr('class', 'map-active');
                this.set('lastTown', elementId);
            }else{
                var newTownId = '';

                for(var i = 0; i < town.length; i++)
                    newTownId += town[i] + '_';

                if(newTownId.charAt((newTownId.length - 1)) === '_')
                    newTownId = newTownId.substring(0, (newTownId.length - 1));

                elementId = '#map-' + newTownId;
                jQuery(elementId).attr('class', 'map-active');
                this.set('lastTown', elementId);
            }

            this.transitionToRoute('breakdowns.specific', data.toLowerCase());
        }
    }
});