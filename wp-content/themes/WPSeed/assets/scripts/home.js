  'use strict';

 window.USER_IS_TOUCHING = false;

  window.addEventListener('touchstart', function onFirstTouch() {
  // we could use a class
  document.body.classList.add('user-is-touching');
  // or set some global variable
  window.USER_IS_TOUCHING = true;

  // we only need to know once that a human touched the screen, so we can stop listening now
  window.removeEventListener('touchstart', onFirstTouch, false);
}, false);

  var container = document.getElementById('container');

document.addEventListener('DOMContentLoaded', function() {

  //THREE JS CONFIG PRELOADING
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 3000);

// add controls for the camera
  var controls = new THREE.OrbitControls(camera, game );
  //controls.target.set(0, 0, 0 );
  //controls.minDistance = 500;
  //if is mobile
  // if (window.USER_IS_TOUCHING) {
  //     controls.minDistance = 1500;
  //     controls.minPolarAngle = -Math.PI / 2; // radians
  //     controls.maxPolarAngle = Math.PI / 2; // radians
  // } else{
        controls.minDistance = 0;
        controls.minPolarAngle = 0; // radians
        controls.maxPolarAngle = Math.PI; // radians
  // }


  controls.maxDistance = 1500;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.enableDamping = true;
  // controls.minPolarAngle = 0.8;
  // controls.maxPolarAngle = 2.4;
  controls.dampingFactor = 0.1;
  controls.rotateSpeed = 0.02;

  // var controls = new THREE.OrbitControls( camera );
  var distance = 1100;
  var raycaster;
  var projector;
  var game = new THREE.WebGLRenderer({
    antialias: true
  });
  var light;
  var light_two;
  var lightAmbient;
  var Asteroids = [];
  var min = 0;
  var max = 1;
  var asteroidContainer = [];
  var getRandomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  var textureManager = new THREE.LoadingManager();
    textureManager.onProgress = function ( item, loaded, total ) {
        // this gets called after any item has been loaded
        //alert('prog');
    };
    textureManager.onLoad = function () {
        // all textures are loaded
      //  alert('done');
    };

  function init() {
    game.setSize(window.innerWidth, window.innerHeight);
    game.setClearColor(0x000000, 0.1);
    container.appendChild(game.domElement);
    camera.position.set(0, 0, distance);
    // controls.update();
    scene.add(camera);

    light = new THREE.PointLight(0xffffff, 1, 4000);
    light.castShadow = true; // default false
    light.position.set(250, 0, 750);


    light_two = new THREE.PointLight(0xffffff, 1, 4000);
    light_two.castShadow = true; // default false
    light_two.position.set(-250, -100, 0);


    lightAmbient = new THREE.AmbientLight(0x404040);
    lightAmbient.castShadow = true; // default false
    lightAmbient.position.set(-100, 800, 800);

    scene.add(light, light_two, lightAmbient);


    function Asteroid(i, Aster) {
      this.ind = i;
      // this.asteroidP = x;
      THREE.Object3D.apply(this, arguments);

      Aster.position.y = getRandomInt(positionMaxY, (positionMinY));
      Aster.position.x = getRandomInt(positionMaxX, (positionMinX));
      Aster.position.z = getRandomInt(-1500, 1500);

      Aster.rotation.y = getRandomInt(positionMaxY, (positionMinY));
      Aster.rotation.x = getRandomInt(positionMaxX, (positionMinX));
      Aster.rotation.z = getRandomInt(-1500, 1500);
      //Aster.rotation.y = 100;
      // for (var j = 0; j < Asteroids.length; j++) {
      //   if (i !== j && this.children[0].intersects(Asteroids[j])) {
      //    console.log('splice');
      //     Asteroids.splice(i, Asteroids[i]);
      //     scene.remove(Asteroids[i]);
      //  }
      // }

      this.add(Aster);
      // var box = new THREE.Box3().setFromObject( particle );
      // console.log( box.min, box.max, box.getSize() );
      scene.add(this);

    }

    Asteroid.prototype = Object.create(THREE.Object3D.prototype);
    Asteroid.prototype.constructor = Asteroid;

    Asteroid.prototype.intersects = function(other) {

      var x1 = this.position.x;
      var y1 = this.position.y;
      var z1 = this.position.z;

      var x2 = other.position.x;
      var y2 = other.position.y;
      var z2 = other.position.z;


      //var d = difference(x1, x2);
      function foo(num1, num2) {
        return (num1 > num2) ? num1 - num2 : num2 - num1
      }
      var d = foo(x1, x2);
      var dh = foo(y1, y2);
      var dz = foo(z1, z2);
      //console.log(x1, x2, d);

      if (dh < 100 && d < 100 && dz < 100) {
        return true
      } else {
        return false
      }
    }
    var positionMaxY = -game.domElement.clientHeight / 4;
    var positionMinY = game.domElement.clientHeight / 4;
    var positionMaxX = -game.domElement.clientWidth;
    var positionMinX = game.domElement.clientWidth;


    var asteroidInstance;
    // var foobar = require('./images/asteroid1.JD');
    // var foobar2 = require('./images/asteroid2.JD');
    var foobar = 'wp-content/themes/WPSeed/dist/images/asteroid1.JD';
    var foobar2 = 'wp-content/themes/WPSeed/dist/images/asteroid2.JD';

    var asteroid1 = {
      url: foobar,
      texture: "wp-content/themes/WPSeed/dist/images/Asteroid_Texture1.jpg"
    }
    var asteroid2 = {
      url: foobar2,
      texture: "wp-content/themes/WPSeed/dist/images/Asteroid_Texture2.jpg"
    }
    // var random_boolean = Math.random() >= 0.5;
    // random_boolean ? asteroidInstance = asteroid1 : asteroidInstance = asteroid2;

    for (var i = 0; i < 75; i++) {
      //console.log(asteroidInstance);
      var loader = new THREE.JDLoader();
      loader.load(asteroid1.url, function (data) {
        console.log(asteroidInstance);
          var texture = new THREE.TextureLoader().load(asteroid1.texture);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          var material = new THREE.MeshLambertMaterial({
              map: texture
          , });
            var Aster = new THREE.SkinnedMesh(data.geometries[0], material);
            Aster.scale.x = Aster.scale.y = Aster.scale.z = getRandomInt(10, 100);
            Aster.translation = THREE.GeometryUtils.center(data.geometries[0]);
            Aster.name = 'Aster';
            Aster.rotX = 0.001;
            Aster.rotY = 0.002;
            Aster.rotZ = 0.005;
            var asteroid = new Asteroid(i, Aster);
            Asteroids.push(asteroid);
      });
    }
    for (var i = 0; i < 75; i++) {
      //console.log(asteroidInstance);
      var loader = new THREE.JDLoader(textureManager);
      loader.load(asteroid2.url, function (data) {
        console.log(asteroidInstance);
          var texture = new THREE.TextureLoader().load(asteroid2.texture);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1, 1);
          var material = new THREE.MeshLambertMaterial({
              map: texture
          , });
            var Aster = new THREE.SkinnedMesh(data.geometries[0], material);
            Aster.scale.x = Aster.scale.y = Aster.scale.z = getRandomInt(10, 100);
            Aster.translation = THREE.GeometryUtils.center(data.geometries[0]);
            Aster.name = 'Aster';
            Aster.rotX = 0.001;
            Aster.rotY = 0.002;
            Aster.rotZ = 0.005;
            var asteroid = new Asteroid(i, Aster);
            Asteroids.push(asteroid);
      });
    }
    var color = new THREE.Color(0x00ff00);
    //let fogDust = new THREE.FogExp2(0xefd1b5, 0.0015, 400);
    //scene.fog = fogDust;
  }

  init();
  animate();

  function animate() {
    requestAnimationFrame(animate);
    render();
  };

  function render() {
    var timer = 0.00001 * Date.now();
    var amplitude = 0.1;
    var angle = 1;

    for (var i = 0; i < Asteroids.length; i++) {
      var object = Asteroids[i];

      object.children[0].rotation.x += object.children[0].rotX;
      object.children[0].rotation.y += object.children[0].rotY;
      object.children[0].rotation.z += object.children[0].rotZ;

      if (object.position.x > game.domElement.clientWidth / 2) {
        //object.position.x = 0;
      }
      if (object.position.z > 900) {
        //object.position.z = 0;
      }
    }
    controls.update();
   controls.autoRotate = true;
    controls.autoRotateSpeed = 0.005;
    game.render(scene, camera);
  }

  function onWindowResize() {
    camera.aspect = (window.innerWidth) / (window.innerHeight);
    game.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
  };

  window.addEventListener('resize', onWindowResize, false);

}, false);
