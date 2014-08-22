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
      }
    },
    clean: {
      dist: ['dist/']
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
        src: ['src/module.js', 'src/**/*.js'],
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
    }
  });

  grunt.registerTask('default', [
    'jshint:all'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'clean:dist',
    'concat:dist',
    'uglify:dist',
    'compass:dist',
    'autoprefixer:dist',
    'usebanner:dist'
  ]);
};
