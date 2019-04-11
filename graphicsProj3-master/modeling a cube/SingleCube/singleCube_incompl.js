var scene;
var camera;
var renderer;
var canvasWidth;
var canvasHeight;
var aspRat;
var viewLength;

var vertices;
var faces;
var colors;
var cube;
var groundSize = 800;

var blockWidth = 40;
var firstCube;

init();
draw();
renderScene();

function init(){

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setClearColor(0xffffff, 1);

	canvasWidth = window.innerWidth;
	canvasHeight = window.innerHeight;

	renderer.setSize(canvasWidth, canvasHeight);

	document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

	scene = new THREE.Scene();

	viewLength = 500;
	aspRat = canvasWidth/canvasHeight;

	// Create a PerspectiveCamera with a FOV of 45, aspect ratio of aspRat,
	// 		a new plane of 0.1 and a far plane of 1000
	//	Set the camera at 100, 200, 300 and make it look at 0, 0, 0
	// 	Add the camera to the scene
	camera = new THREE.PerspectiveCamera(45, aspRat, .1 , 1500)
	camera.position.set(600,400,600);
	camera.lookAt(0,0,0);
 	scene.add(camera);
}

function draw(){
	initGeom();
	buildGround();
	buildFirstCube();
	buildTurnStile();

}

function initGeom(){

	// Create an array of Vector3 objects that make up the vertices of the cube
	var vArray = [new THREE.Vector3(-blockWidth/2, -blockWidth/2 ,blockWidth/2), new THREE.Vector3(blockWidth/2,-blockWidth/2,blockWidth/2),
		new THREE.Vector3(blockWidth/2,blockWidth/2,blockWidth/2), new THREE.Vector3(-blockWidth/2,blockWidth/2,blockWidth/2),
		new THREE.Vector3(-blockWidth/2, -blockWidth/2 ,-blockWidth/2), new THREE.Vector3(blockWidth/2,-blockWidth/2,-blockWidth/2),
		new THREE.Vector3(blockWidth/2,blockWidth/2,-blockWidth/2), new THREE.Vector3(-blockWidth/2,blockWidth/2,-blockWidth/2)];
	// 		and assigns the array to the vertices global variable.
	vertices = vArray;
	// The cube should have a width of blockWidth and centered exactly at
	//		the origin.


	// Create an array of Face3 objects out of the vertices stored in the array
	//		above and assigns the array to the faces global variable
	 faces = [new THREE.Face3(0,1,2), new THREE.Face3(0,2,3), new THREE.Face3(0,1,4),
 							new THREE.Face3(1,5,4), new THREE.Face3(1,5,6), new THREE.Face3(6,2,1),
						  new THREE.Face3(0,4,7), new THREE.Face3(7,3,0), new THREE.Face3(3,2,6),
						  new THREE.Face3(7,3,2), new THREE.Face3(4,5,6), new THREE.Face3(6,7,4)];

	// Create an array of colors. Each side of the cube should have one color.
var colors = [new THREE.Color(0x0000ff),new THREE.Color(0xD3D3D3),new THREE.Color(0xaa3333),
							new THREE.Color(0x00ff00),new THREE.Color(0x222222),new THREE.Color(0xffffff)];
}

function buildFirstCube(){

	// Create a new THREE.Geometry and assigns it to the geom global variable
  firstCube = new THREE.Geometry();
	// Assign the array of vertices to geom's vertices property
	firstCube.vertices = vertices;
	// Assign the array of faces to geom's faces property
	firstCube.faces = faces;
	// Set the color property of the faces array with color's setRGB method
	var colorIndex;
	for(var i = 0; i < firstCube.faces.length; i+=2){
		var face = firstCube.faces[i];
        face.color = colors[colorIndex];
        face = firstCube.faces[i + 1];
        face.color = colors[colorIndex];
        colorIndex+= 1;
	}
	var cubeMat = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide})
	var mesh = new THREE.Mesh(firstCube,cubeMat);
	mesh.position.set(-groundSize/4,20,0);
	// Create a new meesh based on the face color and assign the mesh to the
	//	global variable tempGeom
	scene.add(mesh);
}

function buildwall(side){

}

function buildTurnStile(){
	var cylGeom = new THREE.CylinderGeometry(5,5,170,5);
	var cylMat = new THREE.MeshBasicMaterial({color: 0x000000});
	var cylinder = new THREE.Mesh(cylGeom, cylMat);
	cylinder.position.set(0,85,0);

	var geometry = new THREE.BoxGeometry( 10, 160, 80 );
  var material = new THREE.MeshBasicMaterial( {color: 0xC0C0C0} );
  var cube = new THREE.Mesh( geometry, material );

	cube.position.set(0,85,0)
	var cube2 = cube.clone();
	cube2.rotation.y =  Math.PI / 2;

  scene.add( cube );
	scene.add(cube2);
	scene.add(cylinder);
}

function buildGround(){

	// Create a ground for the cube out of PlaneGeometry and assign it the
	// 	global ground variable
	// Position the ground as necessary
	var planeGeo = new THREE.PlaneGeometry(groundSize,groundSize);
	var planMat = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide})
	var plane = new THREE.Mesh(planeGeo, planMat);
	plane.rotation.x = Math.PI / 2;
	scene.add(plane);

}

function renderScene(){

 	renderer.render(scene, camera);

}
