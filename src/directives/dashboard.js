'use strict';

angular.module('wb.angularDashboard.directives')
  .directive('dashboard', function () {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {},
      templateUrl: 'templates/dashboard.html',
      controller: 'angularDashboardCtrl'
    };
  });
