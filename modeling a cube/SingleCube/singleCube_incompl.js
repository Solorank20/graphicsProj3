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
var ground;

var blockWidth = 40;
var tempGeom;

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
	var camera = new THREE.PerspectiveCamera(45, aspRat, .1 , 1000)
	camera.Position.Set(100,200,300);
	camera.look(0,0,0);
 	scene.add(camera);
}

function draw(){

	initGeom();
	buildGround();
	buildCube();

	scene.add( tempGeom );
	scene.add( ground );

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
 var faces = [new Face3(0,1,2), new Face(0,2,3), new Face3(0,1,4)
 							new Face3(1,5,4), new Face3(1,5,6), new Face3(6,2,1)
						  new Face3(0,4,7), new Face3(7,3,0), new Face3(3,2,6)
						  new Face3(7,3,2), new Face3(4,5,6), new Face3(6,7,4)];

	// Create an array of colors. Each side of the cube should have one color.
var colors = [new THREE.color(0x0000ff),new THREE.color(0xD3D3D3),new THREE.color(0xaa3333),
							new THREE.color(0x00ff00),new THREE.color(0x222222),new THREE.color(0xffffff)];
}

function buildCube(){

	// Create a new THREE.Geometry and assigns it to the geom global variable
	tempGeom = new THREE.Geometry();
	// Assign the array of vertices to geom's vertices property
	tempGeom.vertices = vertices;
	// Assign the array of faces to geom's faces property
	tempGeom.faces = faces;
	// Set the color property of the faces array with color's setRGB method
	for(i = 0; i < faces.length; i+2){
		var mesh = new BasicMeshMaterial()
	}
	// Create a new meesh based on the face color and assign the mesh to the
	//	global variable tempGeom

}


function buildGround(){

	// Create a ground for the cube out of PlaneGeometry and assign it the
	// 	global ground variable
	// Position the ground as necessary


}

function renderScene(){

 	renderer.render(scene, camera);

}
