
/**
 * prefunction to omit writing text domain argument.
 * ex; 
 *   _e('some text to show', $$$) 
 *    --will be converted to --> _e('some text to show', '#{theme.name}')
 */
function replace_text_domain(input/*, options */) {
  return input.replace(/\$\$+/g, "#{theme.name}");
}

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
          usestrip: true, // option for phpjade
          prefunction: replace_text_domain, // option for phpjade
          pretty: true, 
          client: false,
          data: {
            wpttenv: '<%= wpttenv %>',
            theme: { name: '<%= wpttenv.name %>' },
          },
        },
        files: [
          {
            src: '<%= wpttenv.jadedir %>/headerfooter.jade',
            dest: '<%= wpttenv.tmpdir %>/headerfooter.php'
          },
          {
            expand: true,
            cwd: '<%= wpttenv.jadedir %>', 
            src: [ '*.jade', '!headerfooter.jade' ],
            dest: '<%= wpttenv.themedir %>',
            ext: '.php',
          }
        ]
      }
    },
    stylus: {
      default: {
        options: {
          compress: false,
          define: {
            themename: '<%= wpttenv.name %>',
          },
        },
        files:[
          {
            expand: true,
            cwd: '<%= wpttenv.jadedir %>',
            src: '*.styl',
            dest: '<%= wpttenv.tmpdir %>',
            ext: '.css',
          }
        ]
      }
    },
    splitfile: {
      headerfooter: {
        options: {
          separator: /<!--[ ]+separator mark for splitter tool[ ]*-->/ ,
          prefix: [ 'header', 'footer' ]
        },
        src: [ '<%= wpttenv.tmpdir %>/headerfooter.php' ],
        dest: '<%= wpttenv.themedir %>'
      }
    },
    clean: {
      default: [ '<%= wpttenv.themedir %>/**/*' ],
    },
    copy: {
      prebuilt: {
        files: [
          {
            expand: true,
            cwd: '<%= wpttenv.prebuilt %>',
            src: './**',
            dest: '<%= wpttenv.themedir %>/'
          },
        ],
        options: {
          process: function(contents, filepath) {
            if (filepath.match("functions.php")) {
              return grunt.template.process(contents);
            } else {
              return contents;
            }
          }
        },
      },
      postbuild: {
        files: [
          {
            expand: true,
            cwd: '<%= wpttenv.tmpdir %>',
            src: ['./**/*.css'],
            dest: '<%= wpttenv.themedir %>/',
          },
        ],
        options: {
          process: function(contents, filepath) {
            if (filepath.match(/css$/)) {
              return grunt.template.process(contents);
            } else {
              return contents;
            }
          },
        },
      },
    },
    pot: {
      options: {
          text_domain: '<%= wpttenv.name %>', //Your text domain. Produces my-text-domain.pot
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
          expand: true,
          cwd: '<%= wpttenv.themedir %>',
          src:  [ './**/*.php' ], //Parse all php files
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jade-mod');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-split-file');
  grunt.loadNpmTasks('grunt-pot');

  grunt.registerTask('compile', [ 'jade', 'stylus', 'splitfile' ]);

  // Default task.
  grunt.registerTask('default', [ 'copy:prebuilt', 'compile', 'copy:postbuild' ]);

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
