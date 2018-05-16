const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="container" styles="width:1024px;height:1024px"></div></body>`);
global.window = dom.window;
global.document = dom.window.document;

window.console = global.console;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.XMLHttpRequest = require("local-xmlhttprequest").XMLHttpRequest;
