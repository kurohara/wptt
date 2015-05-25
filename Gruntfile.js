/*global module:false*/
module.exports = function(grunt) {
  var path = require('path');
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    wpttenv: grunt.file.readJSON('wpttenv.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    jade: {
      default: {
        options: {
          modifiers: [ 'phpjade' ],
          pretty: true, 
          usestrip: true,
          client: false,
          data: {
            theme: { name: '<%= pkg.name ?>' },
          },
        },
        files: [
          {
            cwd: path.resolve('.'), 
            src: '<%= wpttenv.jadedir %>/headerfooter.jade',
            dest: '<%= wpttenv.prebuilt %>/headerfooter.php'
          },
          {
            expand: true,
            cwd: path.resolve('.'), 
            src: [ '<%= wpttenv.jadedir %>/*.jade', '!<%= wpttenv.jadedir %>/headerfooter.jade' ],
            dest: '<%= wpttenv.themedir %>',
            ext: '.php',
          }
        ]
      }
    },
    stylus: {
      files:[
        {
          src: '<%= wpttenv.styldir %>/*.styl',
          dest: '<%= wpttenv.themedir %>'
        }
      ]
    },
    splitfile: {
      headerfooter: {
        options: {
          separator: /<!-- separator mark for splitter tool -->/ ,
          prefix: [ 'header', 'footer' ]
        },
        src: [ '<%= wpttenv.prebuilt %>/headerfooter.php' ],
        dest: '<%= wpttenv.themedir %>'
      }
    },
    pot: {
      options: {
          text_domain: '<%= pkg.name %>', //Your text domain. Produces my-text-domain.pot
          dest: 'languages/', //directory to place the pot file
          keywords: [ //WordPress localisation functions
            '__:1',
            '_e:1',
            '_x:1,2c',
            'esc_html__:1',
            'esc_html_e:1',
            'esc_html_x:1,2c',
            'esc_attr__:1', 
            'esc_attr_e:1', 
            'esc_attr_x:1,2c', 
            '_ex:1,2c',
            '_n:1,2', 
            '_nx:1,2,4c',
            '_n_noop:1,2',
            '_nx_noop:1,2,3c'
           ],
      },
      files:{
          src:  [ '**/*.php' ], //Parse all php files
          expand: true,
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jade-mod');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-split-file');
  grunt.loadNpmTasks('grunt-pot');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('setup', function() {
    var wpttenv = grunt.config('wpttenv');
    var inq = require('inquirer');
    var done = this.async();
    inq.prompt([ 
      {
        name: 'themedir',
        default: wpttenv.themedir,
        type: 'input',
        message: 'Where to place the compiled theme files? ',
      },
      {
        name: 'srcdir',
        default: wpttenv.srcdir,
        type: 'input',
        message: 'Where is the source code directory? ',
      }
    ], function(answer) {
console.log("answer['themedir'] = " + answer['themedir']);
      done();
    });
  });

};
