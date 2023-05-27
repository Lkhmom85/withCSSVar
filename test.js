var fs = require('fs'),
    vm = require('node:vm'),
    jsdom = require('jsdom').JSDOM,
    dom = new jsdom(fs.readFileSync('./test/index.html', 'utf-8').replace(/script/mg, 'template')),
    ctx = vm.createContext(dom.window),
    withCSSVar = vm.runInContext(
        fs.readFileSync('./withCSSVar.js', 'utf-8').replace('export default',''), 
        ctx
    ),
    cssVars = withCSSVar(),
    _hasErrors = false,
    error = msg => {
        _hasErrors = true;
        console.error(`\x1b[91m${msg}`);
    },
    success = msg => {
        console.log(`\x1b[32m${msg}`);
    },
    assert = (assertion, test) => !test && error(assertion);

// TEST suite:
assert(
    'before changing it backgroundColor should be #ccc', 
    cssVars.backgroundColor === '#ccc'
)
cssVars.backgroundColor = 'red'
assert(
    'after changing it background color should be red', 
    withCSSVar().backgroundColor === 'red'
)
assert(
    'background color of section#two should be #faa', 
    withCSSVar('section#two').backgroundColor === '#faa'
)
assert(
    'not existing variables should return empty strings', 
    withCSSVar().notExists === ''
)

// Test results:
if (_hasErrors) error('SOME TEST FAILED.') && process.exit(-1)
success('ALL TESTS PASS.') && process.exit(0)
