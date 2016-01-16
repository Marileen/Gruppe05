/*global module:true */


module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 8050,
          open: 'http://127.0.0.1:8050/index.html',
          base: ['.tmp', 'app'],
          livereload: true
        }
      }
    },

    watch: {
      less: {
        files: ['app/styles/**/*.less'],
        tasks: ['less:dev']
      },
      hbs: {
        files: ['app/**/*.hbs'],
        tasks: ['compile-handlebars']
      },
      css: {
        files: ['.tmp/styles/*.css'],
        tasks: []
      },
      js: {
        files: ['app/js/**/*'],
        tasks: [ 'copy:js' ]
      },
      php: {
        files: ['app/php/**/*'],
        tasks: [ 'copy:php' ]
      },
      assets: {
        files: ['app/assets/**/*'],
        tasks: [ 'copy:assets' ]
      }
    },

    copy: {
      js: {
        files: [
          { expand: true, cwd: 'app/', src: [ 'js/*' ], dest: '.tmp/' },
        ]
      },
      assets: {
        files: [
          { expand: true, cwd: 'app/', src: [ 'assets/**/*' ], dest: '.tmp/' },
        ]
      },
      php: {
        files: [
          { expand: true, cwd: 'app/php/', src: [ '*.php', '!config.*' ], dest: '.tmp/' },
          { expand: true, cwd: 'app/php/', src: [ 'config.local.php' ], dest: '.tmp/', rename: function() { return '.tmp/config.php' } },
        ]
      }
    },

    less: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          '.tmp/styles/style.css': 'app/styles/style.less'
        }
      }
    },

    'compile-handlebars': {
      dev: {
        files: [{
          expand: true,
          cwd: 'app',
          src: '**/*.hbs',
          dest: '.tmp/',
          ext: '.html'
        }],
        templateData: {},
        partials: 'app/partials/**/*.hbs'
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', [
    'less:dev',
    'compile-handlebars:dev',
    'connect',
    'watch'
  ]);


};
