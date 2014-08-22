'use strict';

angular.module('wb.angularDashboard.directives')
  .directive('transcludeDashboardSection', function () {
    return {
      restrict: 'A',
      require: '^dashboard',
      link: function (scope, element, attrs) {
        var section = scope.$eval(attrs.transcludeDashboardSection);

        section.$transcludeFn(section.$parent, function (contents) {
          angular.forEach(contents, function (node) {
            element.append(node);
          });
        });
      }
    };
  });
