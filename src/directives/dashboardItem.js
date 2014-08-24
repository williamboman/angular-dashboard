(function (angular) {
  'use strict';

  angular.module('wb.angularDashboard.directives')
    .directive('dashboardItem', function () {
      return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
          icon: '@',
          heading: '@'
        },
        require: '^dashboard',
        templateUrl: 'templates/dashboardItem.html',
        compile: function (element, attrs, transclude) {
          return {
            post: function (scope, element, attrs, dashboardCtrl) {
              scope.$transcludeFn = transclude;

              scope.select = function () {
                dashboardCtrl.selectSection(scope);
              };

              dashboardCtrl.addSection(scope);
            }
          };
        }
      };
    });
})(window.angular);
