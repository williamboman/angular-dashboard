(function (angular) {
  'use strict';

  angular.module('wb.angularDashboard.controllers')
    .controller('angularDashboardCtrl', function ($scope) {
      var sections = $scope.sections = [];

      this.addSection = function (section) {
        if( !sections.length ) {
          section.active = true;
        } else {
          section.active = false;
        }
        sections.push(section);
      };

      this.selectSection = function (selectedSection) {
        angular.forEach(sections, function (section) {
          if( section.active && selectedSection !== section ) {
            section.active = false;
          } else if( !section.active && selectedSection === section ) {
            section.active = true;
          }
        });
      };
    });
})(window.angular);
