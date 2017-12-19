/**
 * Add custom settings to Jasmine.
 */

/*globals jasmine*/

jasmine.VERBOSE = true;

var reporters = require('jasmine-reporters');
var reporter = new reporters.JUnitXmlReporter({
    consolidateAll: false,
    savePath: 'out/',
    filePrefix: 'report'    
});
jasmine.getEnv().addReporter(reporter);
