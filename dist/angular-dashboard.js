/*
	angular-dashboard v0.0.1 - 24.08.2014
	https://github.com/williamboman/angular-dashboard

The MIT License (MIT)

Copyright (c) William Boman <william@redwill.se>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function (angular) {
  'use strict';

  angular.module('wb.angularDashboard.controllers', []);
  angular.module('wb.angularDashboard.directives', []);

  angular.module('wb.angularDashboard', [
    'wb.angularDashboard.controllers',
    'wb.angularDashboard.directives'
  ]);
})(window.angular);

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

(function (angular) {
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
})(window.angular);

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

(function (angular) {
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
})(window.angular);

angular.module('wb.angularDashboard').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/dashboard.html',
    "<div class=\"dashboard-root\" ng-class=\"{'dashboard-menu-toggled': dashboardMenuToggled}\">\n" +
    "  <a class=\"dashboard-menu-toggler\" ng-click=\"dashboardMenuToggled = !dashboardMenuToggled\" ng-class=\"{'active': dashboardMenuToggled}\"><div></div></a>\n" +
    "  <aside class=\"dashboard-menu\">\n" +
    "    <ul class=\"dashboard-menu-list\" ng-transclude></ul>\n" +
    "  </aside>\n" +
    "  <section class=\"dashboard-content\" ng-repeat=\"section in sections\" transclude-dashboard-section=\"section\" ng-class=\"{'active': section.active}\"></section>\n" +
    "</div>\n"
  );


  $templateCache.put('templates/dashboardItem.html',
    "<li class=\"dashboard-menu-list-item\" ng-class=\"{'active': active}\">\n" +
    "  <a ng-click=\"select()\">\n" +
    "    <i class=\"fa fa-2x fa-{{icon}}\" ng-if=\"icon\"></i>\n" +
    "    {{heading}}\n" +
    "  </a>\n" +
    "</li>\n"
  );

}]);
