/* jshint globalstrict: true */
/* global module, require */
'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    meta: {
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*\n\t<%= meta.pkg.name %> v<%= meta.pkg.version %> - <%= grunt.template.today(\'dd.mm.yyyy\') %>\n\t<%= meta.pkg.homepage %>\n\n<%= grunt.file.read(\'LICENSE\') %>*/'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        ignores: [
          'dist/'
        ]
      },
      all: [
        'Gruntfile.js',
        'src/**/*.js'
      ]
    },
    uglify: {
      dist: {
        files: {
          'dist/angular-dashboard.min.js': 'dist/angular-dashboard.js'
        }
      },
      distInclTpls: {
        files: {
          'dist/angular-dashboard-tpls.min.js': 'dist/angular-dashboard-tpls.js'
        }
      }
    },
    clean: {
      dist: ['dist/'],
      tmp: ['.tmp/']
    },
    usebanner: {
      dist: {
        options: {
          position: 'top',
          banner: '<%= meta.banner %>'
        },
        files: {
          src: ['dist/**/*.+(js|css)']
        }
      }
    },
    concat: {
      dist: {
        src: ['src/module.js', 'src/**/*.js', '.tmp/templates.js'],
        dest: 'dist/angular-dashboard.js'
      }
    },
    compass: {
      options: {
        require: [
          'breakpoint'
        ],
        sassDir: 'src/'
      },
      dist: {
        options: {
          cssDir: '.tmp/',
          outputStyle: 'compressed'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        src: '.tmp/style.css',
        dest: 'dist/style.css'
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: '0.0.0.0',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/assets',
                connect.static('./dist')
              ),
              connect.static('./example')
            ];
          }
        }
      }
    },
    watch: {
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'example/**/*',
          'dist/**/*.+(js|css)'
        ]
      },
      compass: {
        files: [
          'src/**/*.scss'
        ],
        tasks: [
          'compass:dist',
          'autoprefixer:dist'
        ]
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep:example']
      }
    },
    wiredep: {
      example: {
        src: [
          'example/**/*.html'
        ],
        ignorePath:  /\.\.\//,
        dependencies: true,
        devDependencies: true
      }
    },
    ngtemplates:  {
      'wb.angularDashboard': {
        src: 'templates/**/*.html',
        dest: '.tmp/templates.js'
      }
    }
  });

  grunt.registerTask('default', [
    'jshint:all'
  ]);

  grunt.registerTask('serve', [
    'build',
    'wiredep:example',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'clean',
    'ngtemplates',
    'concat:dist',
    'uglify:dist',
    'compass:dist',
    'autoprefixer:dist',
    'usebanner:dist'
  ]);
};
