'use strict';
const angular = require('angular');

require('bootstrap-tour');

export default angular.module('webarmatureApp.tour', [])
  .directive('tour', function() {
    function link(scope) {
      scope.tourTemplate
        = '<div class=\'popover tour\'>'
        + '<div class=\'arrow\'></div>'
        + '<h3 class=\'popover-title\'></h3>'
        + '<div class=\'popover-content\'></div>'
        + '<div class=\'popover-navigation\'>'
        + '<button class=\'btn btn-default\' data-role=\'prev\'>« </button>'
        + '<span data-role=\'separator\'>|</span>'
        + '<button class=\'btn btn-default\' data-role=\'next\'> »</button>'
        + '<button class=\'btn btn-default\' data-role=\'end\'>X</button>'
        + '</div>'
        + '</div>';

      // eslint-disable-next-line no-undef
      scope.tour = new Tour({
        name: 'mapTour',
        template: scope.tourTemplate,
        steps: [
          {
            element: '#howTab',
            title: 'Bienvenue',
            content: 'Laissez-nous vous guider au travers de votre première visite.'
          },
          {
            element: '#howTab',
            title: 'Aide',
            content: 'Ceci est l\'onglet pour l\'aide. Pour avoir plus d\'informations sur le fonctionnement des différentes sections, consultez cet onglet.',
            onShow() {
              if(!$('#how').hasClass('active') || $('#sidebarDirective').hasClass('collapsed')) {
                $('#howTab')[0].click();
              }
            }
          },
          {
            element: '#mapTab',
            title: 'Maps',
            content: 'Ceci est la vue pour les différentes cartes. Dans cet onglet vous pouvez choisir quelles cartes seront affichées.',
            onShow() {
              if(!$('#mapPane').hasClass('active') || $('#sidebarDirective').hasClass('collapsed')) {
                $('#mapTab')[0].click();
              }
            }
          },
          {
            element: '.sidebarButton:first',
            title: 'Catégorie',
            content: 'Choississez la catégorie que vous souhaitez visionner.',
            onShow() {
              if(!$('.sidebarButton:first').hasClass('selected')) {
                $('.sidebarButton:first').click();
                $('.sidebarButton:eq(1)').click();
              }
            }
          },
          {
            element: 'input[type=radio]:eq(1)',
            title: 'Sélection de carte',
            content: 'Puis sélectionnez la carte que vous souhaitez visionner.',
            smartplacement: false,
            placement: 'bottom',
            onShow() {
              $('input[type=radio]:eq(1)').bootstrapSwitch('state', true);
            },
            onNext() {
              $('input[type=radio]:eq(0)').bootstrapSwitch('state', true);
            }
          },
          /*{
            element: '#printTab',
            title: 'Impression',
            content: 'Ceci est l\'onglet pour l\'impression. Pour imprimer les cartes affichés à l\'écran consultez cette page.',
            onShow() {
              if(!$('#printPane').hasClass('active') || $('#sidebarDirective').hasClass('collapsed')) {
                $('#printTab')[0].click();
              }
            },
            onNext() {
              $('#mapsArea').click();
            }
          },*/
          {
            element: '.leaflet-control-zoom:first',
            title: 'Zoom',
            content: 'Ceci est le zoom. Vous pouvez cliquez cet élément pour agrandir ou rétrécir la carte.',
            smartplacement: false,
            placement: 'left'
          },
          {
            element: '.leaflet-control-attribution:first',
            title: 'Source',
            content: 'Ceci est la source pour chacune des cartes. Nous remercions nos partenaires.',
            smartplacement: false,
            placement: 'top'
          },
          {
            element: '#navbarCollapse',
            title: 'Apprenez en plus',
            content: 'Choississez les autres onglets pour en apprendre plus sur le projet!',
            smartplacement: false,
            placement: 'bottom'
          }
        ]
      }).init();

      scope.restartTour = function() {
        scope.tour.restart();
        scope.tour.next();
      };

      scope.startTour = function() {
        scope.tour.start();
      };

      scope.startTour();

      scope.$on('$destroy', function() {
        scope.tour.end();
      });
    }

    return {
      restrict: 'EA',
      scope: {},
      template: require('./tour.html'),
      link,
      controller: 'tourController'
    };
  })
  .controller('tourController', ['$scope', function() {

  }])
  .name;
