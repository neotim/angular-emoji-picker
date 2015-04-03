module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: [
          'src/js/*.js',
          'src/js/**/*.js'
        ],
        dest: 'dist/js/emoji-picker.js'
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          flatten: true,
          src: ['src/img/*'],
          dest: 'dist/img/',
          filter: 'isFile'
        }, {
          expand: true,
          flatten: true,
          src: ['src/css/emoji-picker.css'],
          dest: 'dist/css/',
          filter: 'isFile'
        }]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      build: {
        files: {
          'dist/js/emoji-picker.min.js': ['dist/js/emoji-picker.js']
        },
        options: {
          mangle: false // prevent changes to your variable and function names.
        }
      }
    },

    watch: {
      dev: {
        files: [
          'Gruntfile.js',
          'src/css/**/*.css',
          'src/js/**/*.js',
          'example/index.html'
        ],
        tasks: ['install'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('install', [
    'concat',
    'copy',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['watch:dev']);
};
