var Zinc = require("zincjs");
var assert = require('chai').assert;
var expect = require('chai').expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<body><div id="container" styles="width:1024px;height:1024px"></div></body>`);
const container = dom.window.document.querySelector("#container");
global.window = dom.window;
global.document = dom.window.document;

var preRenderCallback = function() {
  return function() {
    it('PreRenderCallbackFunction',function() 
      {assert.isTrue(true, 'PreRenderCallbackFunction is successfully called');}
    );
  }
}


function checkRenderer() {
  describe('Renderer()', function(){
    it('Renderer is a valid constructor', function(){
      assert.isFunction(Zinc.Renderer, 'Zinc.Renderer is a valid constructor'); 
    });
    var renderer = new Zinc.Renderer(container, window);
    it('Renderer creates an object', function(){
      assert.isObject(renderer, 'Zinc.Renderer creates an object'); 
    });
    describe('Local Variables()', function(){
      it('playAnimation', function(){
        assert.equal(renderer.playAnimation, true, 'playAnimation equals `true`');
      });
    })
    describe('Methods()', function(){
      var parameters = {};
      var context = require("gl")(1024, 1024);
      parameters['context'] = context;
      var returnValue = renderer.initialiseVisualisation(parameters);
      it('initialiseVisualisation', function(){
        assert.isUndefined(returnValue, 'initialiseVisualisation is successfully called');
      });
      it('getCurrentScene', function(){
        assert.isObject(renderer.getCurrentScene(), 'getCurrentScene returns an object');
      });
      var scene = renderer.createScene("Test1");
      it('createScene', function(){
        assert.isObject(scene, 'createScene returns an object');
      });
      it('getSceneByName', function(){
        assert.isObject(renderer.getSceneByName("Test1"), 'getSceneByName returns an object');
      });
      it('setCurrentScene', function(){
        assert.isUndefined(renderer.setCurrentScene(scene), 'setCurrentScene is successfully called');
      });
      it('resetView', function(){
        assert.isUndefined(renderer.resetView(), 'resetView is successfully called');
      });
      it('viewAll', function(){
        assert.isUndefined(renderer.viewAll(), 'viewAll is successfully called');
      });
      it('updateDirectionalLight', function(){
        assert.isUndefined(renderer.updateDirectionalLight(), 'updateDirectionalLight is successfully called');
      });
      it('getPlayRate', function(){
        assert.equal(renderer.getPlayRate(), 500, 'getPlayRate succesfully returns the correct value');
      });
      var callbackId =  renderer.addPreRenderCallbackFunction(preRenderCallback());
      it('addPreRenderCallbackFunction', function(){
        assert.isNumber(callbackId, 'addPreRenderCallbackFunction succesfully returns the correct value');
      });

      it('setPlayRate', function(){
        assert.isUndefined(renderer.setPlayRate(300), 'setPlayRate succesfully returns the correct value');
      });
      it('getCurrentTime', function(){
        assert.equal(renderer.getCurrentTime(), 0, 'getCurrentTime succesfully returns the correct value');
      });
      it('setMorphsTime', function(){
        assert.isUndefined(renderer.setMorphsTime(300), 'setMorphsTime succesfully returns the correct value');
      });
      var  returnValue2 = renderer.render();
      it('render', function(){
        assert.isUndefined(returnValue2, 'render succesfully returns the correct value');
      });
      it('removePreRenderCallbackFunction', function(){
        assert.isUndefined(renderer.removePreRenderCallbackFunction(callbackId),
            'removePreRenderCallbackFunction succesfully is successfully called');
      });
      it('getThreeJSRenderer', function(){
        assert.isObject(renderer.getThreeJSRenderer(), 'getThreeJSRenderer returns an object');
      });
      var scene2 = renderer.createScene("Test2");
      it('isSceneActive', function() {
        assert.isFalse(renderer.isSceneActive(scene2), 'isSceneActive succcessfully returns fail value');
      });
      it('addActiveScene', function() {
        assert.isUndefined(renderer.addActiveScene(scene2), 'addActiveScene is successfully called');
      });
      it('isSceneActive', function() {
        assert.isTrue(renderer.isSceneActive(scene2), 'isSceneActive successfully returns correct value');
      });
      it('removeActiveScene', function() {
        assert.isUndefined(renderer.removeActiveScene(scene2), 'removeActiveScene is successfully called');
      });
      it('isSceneActive', function() {
        assert.isFalse(renderer.isSceneActive(scene2), 'isSceneActive succcessfully returns fail value');
      });
      it('clearAllActiveScene', function() {
        assert.isUndefined(renderer.clearAllActiveScene(), 'clearAllActiveScene is successfully called');
      });
      it('clearAllActiveScene', function() {
        assert.isUndefined(renderer.clearAllActiveScene(), 'clearAllActiveScene is successfully called');
      });
      it('transitionScene', function() {
        assert.isUndefined(renderer.transitionScene(scene2, 3000), 'transitionScene is successfully called');
      });
    })
  })
}


function checkZincObject() {
  it('Zinc is a valid object', function(){
    assert.isObject(Zinc, 'Zinc is an object'); 
  });
  checkRenderer();
}

if (0) {
  this.Geometry = require('./geometry').Geometry;
  this.Glyph = require('./glyph').Glyph;
  this.Glyphset = require('./glyphset').Glyphset;
  this.Renderer = require('./renderer').Renderer;
  this.Scene = require('./scene').Scene;
  
  this.Viewport = require('./controls').Viewport;
  this.CameraControls = require('./controls').CameraControls;
  this.SmoothCameraTransition = require('./controls').SmoothCameraTransition;
  this.RayCaster = require('./controls').RayCaster;
  this.CameraAutoTumble = require('./controls').CameraAutoTumble;
  this.loadExternalFile = require('./utilities').loadExternalFile;
  this.loadExternalFiles = require('./utilities').loadExternalFiles;
  this.StereoEffect = require('./controls').StereoEffect;
}

describe('Zinc', function(){
  checkZincObject();
})
