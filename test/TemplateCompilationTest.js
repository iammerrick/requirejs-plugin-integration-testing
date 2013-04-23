define(function() {
  describe('TemplateCompilation', function() {
    it('should properly optimize my templates during the build', function(done) {
      
      var loader = requirejs.config({
        baseUrl: '../',
        paths: {
          'handlebars': 'handlebars.runtime'
        },
        shim: {
          'handlebars' : {
            exports: 'Handlebars'
          }
        },
        context: 'unique'
      });

      requirejs.optimize({
        baseUrl: '../',
        mainConfigFile: '../config.js',
        name: 'test/TemplateCompilationModule',
        optimize: 'none',
        out: function(out) {
          (undefined, eval)(out); // Indirect eval runs against global scope.
          
          loader(['template!hello.handlebars'], function(hello) {
            var jesse = hello({
              name: 'Jesse'
            });

            expect(jesse).to.equal('Hello, Jesse. You look great today!\n');
            done();
          });
        }
      });
    });
  });
});
