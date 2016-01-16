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
          base: ['.tmp', 'dev'],
          livereload: true
        }
      }
    },

    watch: {
      less: {
        files: ['dev/styles/**/*.less'],
        tasks: ['less:dev']
      },
      hbs: {
        files: ['dev/**/*.hbs'],
        tasks: ['compile-handlebars']
      },
      css: {
        files: ['.tmp/styles/*.css'],
        tasks: []
      },
      js: {
        files: ['dev/js/**/*'],
        tasks: [ 'copy:js' ]
      },
      php: {
        files: ['dev/php/**/*'],
        tasks: [ 'copy:php' ]
      },
      assets: {
        files: ['dev/assets/**/*'],
        tasks: [ 'copy:assets' ]
      }
    },

    copy: {
      js: {
        files: [
          { expand: true, cwd: 'dev/', src: [ 'js/*' ], dest: '.tmp/' },
        ]
      },
      assets: {
        files: [
          { expand: true, cwd: 'dev/', src: [ 'assets/**/*' ], dest: '.tmp/' },
        ]
      },
      php: {
        files: [
            { expand: true, cwd: 'dev/php/', src: [ '*.php'], dest: '.tmp/' }
            /*
          { expand: true, cwd: 'dev/php/', src: [ '*.php', '!config.*' ], dest: '.tmp/' },
          { expand: true, cwd: 'dev/php/', src: [ 'config.local.php' ], dest: '.tmp/', rename: function() { return '.tmp/config.php' } },
          */
        ]
      }
    },

    less: {
      dev: {
        options: {
          sourceMap: true
        },
        files: {
          '.tmp/styles/style.css': 'dev/styles/style.less'
        }
      }
    },

    'compile-handlebars': {
      dev: {
        files: [{
          expand: true,
          cwd: 'dev',
          src: '**/*.hbs',
          dest: '.tmp/',
          ext: '.html'
        }],
        templateData: {},
        partials: 'dev/partials/**/*.hbs'
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
