import Ember from 'ember';

export default Ember.ArrayController.extend({
    actions:{
        highlightMap: function(data){
            var town = data.toLowerCase().split(' ');

            if(town.length < 1){
                jQuer(('#map-' + town[0])).attr('class', 'map-active');
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
