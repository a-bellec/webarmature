'use strict';
const angular = require('angular');
const L = require('leaflet');
require('leaflet-sidebar-v2');

require('bootstrap-switch');

export default angular.module('webarmatureApp.sidebar', [])
  .directive('sidebar', function() {
    function link(scope, element) {
      //Wait for map to load properly before setting up sidebar
      setTimeout(function() {
        let sidebarId = element.attr('id');
        L.control.sidebar(sidebarId).addTo(scope.map);
      }, 0);

      //Add style to accordion button when opening them
      //And remove style from other accordion buttons
      scope.addSelected = function(event) {
        if(!angular.element(event.target).hasClass('selected')) {
          $('.sidebarButton').each(function() {
            $(this).removeClass('selected');
          });
          angular.element(event.target).addClass('selected');
        } else {
          angular.element(event.target).removeClass('selected');
        }
      };

      scope.changeTownBorders = function() {
        if(scope.showTownBorders) {
          scope.addTownBorders();
        } else {
          scope.removeTownBorders();
        }
      };

      $('input[type=radio]').on('switchChange.bootstrapSwitch', function() {
        if(this.checked) {
          //Create the new layer
          let layerName = this.value;
          let attribution = this.alt;
          let groupId = $(this).closest('div[id]')
            .attr('id');
          let itemName = this.name;

          scope.changeLayer(layerName, attribution, groupId, itemName);
        }
      });

      //Close sidebarDirective when clicking outside of it
      $('#mapsArea').click(function(event) {
        if(!$(event.target).closest(`#${scope.mapId}sidebar`).length) {
          let sidebar = $(`#${scope.mapId}sidebar`);
          if(!sidebar.hasClass('collapsed')) {
            sidebar.addClass('collapsed');
            sidebar.find('li')
              .each(function() {
                $(this).removeClass('active');
              });
            $().addClass('collapsed');
          }
        }
      });

      //Make it possible to scroll in the sidebar
      let sidebar = $('sidebar');
      sidebar.on('wheel', function(event) {
        event.stopPropagation();
      });

      //Don't zoom on double click
      sidebar.on('dblclick', function(event) {
        event.stopPropagation();
      });

      scope.statTrigger = false;
      scope.legendTrigger = true;

      scope.townNames = [
        'LA MULATIERE',
        'Bron',
        'Oullins',
        'Genay',
        'caluire et Cuire',
        'Dardilly',
        'Ecully',
        'Saint romain au mont d\'or',
        'Quincieux',
        'Lyon (4eme ar.)',
        'Feyzin',
        'Francheville',
        'Venissieux',
        'Lyon (6eme ar.)',
        'Montanay',
        'Charbonnière les bains',
        'Saint Genis les ollières',
        'Lyon (2eme ar.)',
        'Irigny',
        'Saint germain au mont d\'or',
        'Givors',
        'Saint Didier au mont d\'or',
        'Lissieu',
        'Lyon (8eme ar.)',
        'Sathonay camp',
        'Vernaison',
        'Limonest',
        'Vaulx en velin',
        'La tour de Salvagny',
        'Sathonay village',
        'Pierre Bénite',
        'Saint Genis laval',
        'Lyon (9eme ar.)',
        'Lyon (7eme ar.)',
        'Fontaines saint martin',
        'Couzon au mont d\'or',
        'Fontaines sur Saone',
        'Lyon (5eme ar.)',
        'Neuville sur Saone',
        'Lyon (1eme ar.)',
        'Villeurbanne',
        'Albigny sur saone',
        'Corbas',
        'Charly',
        'Rillieux la pape',
        'Poleymieux au mont d\'or',
        'Jonage',
        'Chassieu',
        'Sauint Priest',
        'Champagne au mont d\'or',
        'Mions',
        'Grigny',
        'Lyon (3eme ar.)',
        'Curis au mont d\'or',
        'Saint cyr au mont d\'or',
        'Solaize',
        'Collonges au mont d\'or',
        'Tassin la demi lune',
        'Rochetaillée sur Saone',
        'Décines charpieu',
        'Saint fons',
        'Sainte Foy les Lyon',
        'Marcy l\'étoile',
        'Meyzieu',
        'Cailloux sur fontaines',
        'Fleurieu sur Saone',
        'Craponne'
      ];

      scope.selectedTown = "Villeurbanne";

    }
    return {
      restrict: 'E',
      transclude: true,
      template: require('./sidebar.html'),
      link,
      controller: 'sidebarController'
    };
  })
  .controller('sidebarController', ['$scope', '$timeout', function($scope, $timeout) {
    //Dirty hack to make bootstrap switch work if there is more than one use of the directive on the page
    $timeout(function() {
      $('.bs').bootstrapSwitch('state', false);
    }, 0);
  }])
  .name;
