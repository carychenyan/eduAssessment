module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    //���Ŀ¼
    clean: {
      all: ['dist/html/**', 'dist/*.*'],
      image: 'dist/html/images',
      css: 'dist/html/css',
      html: 'dist/html/**/*'
    },

    copy: {
      src: {
        files: [
          {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/html'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: 'src', src: ['images/*','images/*/*'], dest: 'dist/html'}
        ]
      },
      js: {
        files: [
          {expand: true, cwd: 'src', src: ['js/*.js'], dest: 'dist/html'}
        ]
      },
      css: {
        files: [
          {expand: true, cwd: 'src', src: ['style/*.css'], dest: 'dist/html'}
        ]
      }
    },

    // �ļ��ϲ�
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      js: {
        src: [
          "src/js/*.js"
        ],
        dest: "dist/html/js/app.js"
      },
      css:{
        src: [
          "src/css/*.css"
        ],
        dest: "dist/html/css/main.css"
      }
    },

    //ѹ��JS
    uglify: {
      prod: {
        options: {
          mangle: {
            except: ['require', 'exports', 'module', 'window']
          },
          compress: {
            global_defs: {
              PROD: true
            },
            dead_code: true,
            pure_funcs: [
              "console.log",
              "console.info"
            ]
          }
        },

        files: [{
            expand: true,
            cwd: 'dist/html',
            src: ['js/*.js', '!js/*.min.js'],
            dest: 'dist/html'
        }]
      }
    },

    //ѹ��CSS
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/html',
            src: ['style/*.css'],
            dest: 'dist/html'
          }
        ]
      }
    },

    //ѹ��ͼƬ
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true, cwd: 'dist/html', src: ['images/*.{png,jpg,jpeg,gif,webp,svg}','images/*/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/html'}
        ]
      }
    },

    // ����html��css��js ����ϲ�����
    usemin: {
      html: 'dist/html/*.html'
    },

    //ѹ��HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
        ]
      }
    }

  });


  grunt.registerTask('prod', [
      'copy',                 //�����ļ�
      //'concat',               //�ϲ��ļ�
      'imagemin',             //ͼƬѹ��
      'cssmin',               //CSSѹ��
      'uglify'               //JSѹ��
      //'usemin',               //HTML����
     // 'htmlmin'               //HTMLѹ��
  ]);

  grunt.registerTask('publish', ['clean', 'prod']);
};