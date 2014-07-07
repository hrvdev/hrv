module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      cesium: {
        src: [
          'static/js/cesium/intro.js',
          'static/js/cesium/utils.js',
          'static/js/cesium/*.js',
          'static/js/cesium/outro.js'
        ],
        dest: 'static/js/cesium.js'
      },
      ui: {
        src: [
          'static/js/ui/intro.js',
          'static/js/ui/*.js',
          'static/js/ui/outro.js'
        ],
        dest: 'static/js/ui.js'
      }
    },

    // uglify: {
    //   options: {
    //     compress: {
    //       drop_console: true
    //     }
    //   },
    //   feed: {
    //     files: {
    //       'dest/feed.min.js': 'dest/feed.js'
    //     }
    //   }
    // },

    watch: {
      scripts: {
        files: ['static/js/cesium/*.js', 'static/js/ui/*.js'],
        tasks: ['concat']
      }
    }

  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['watch']);
};
