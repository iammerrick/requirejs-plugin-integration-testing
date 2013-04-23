define(function(require) {
  /**
   * Handlebars template engine - http://handlebarsjs.com
   */
  var Handlebars = require('handlebars');

  /**
   * text.js Dependency - https://github.com/requirejs/text
   */
  var text = require('text');
 
  /**
   * Internal cache of downloaded template strings.
   */ 
  var buildMap = {};
  
  /**
   * Implement the Require.js plugin API.
   */
  return {
 		load: function(name, req, load) {
      text.get(req.toUrl(name), function(templateText) {
        buildMap[name] = templateText;
        load(Handlebars.compile(buildMap[name]));
      });
    },
  
    write: function(pluginName, moduleName, write) {
      var templateText = buildMap[moduleName];
      var output = [];
      var template = moduleName.replace(/\.handlebars$/, '');
    
      output.push('define(\"'+pluginName+'!'+moduleName+'", ["handlebars"], function (Handlebars) { \n');
      output.push('  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};');
      output.push('  templates["' + template + '"] = template(' + Handlebars.precompile(templateText) + ');\n');
      output.push('  return templates["'+template+'"];');
      output.push('});');
      write(output.join(''));
    }
  };
});

