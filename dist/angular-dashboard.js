/*
	angular-dashboard v0.0.0 - 23.08.2014
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
'use strict';

angular.module('wb.angularDashboard.controllers', []);
angular.module('wb.angularDashboard.directives', []);

angular.module('wb.angularDashboard', [
  'wb.angularDashboard.controllers',
  'wb.angularDashboard.directives'
]);

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
