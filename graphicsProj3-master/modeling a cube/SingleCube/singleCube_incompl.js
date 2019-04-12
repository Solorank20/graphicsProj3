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

var turnStile;

var nintyDegrees = Math.PI/2;
var turnStileSize = 160;
var groundSize = 800;
var blockWidth = 40;
var firstCubeMesh;
var leftWall;
var rightWall;
var all;

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
	document.addEventListener("keydown", onDocumentKeyDown, true);
	scene = new THREE.Scene();

	viewLength = 500;
	aspRat = canvasWidth/canvasHeight;


	camera = new THREE.PerspectiveCamera(45, aspRat, .1 , 1500)
	camera.position.set(00,400,600);
	camera.lookAt(0,0,0);
 	scene.add(camera);
}

function draw(){
	initGeom();
	buildGround();
	buildFirstCube();
	buildTurnStile();
	buildWall(0);
	buildWall(1);

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
	 faces = [new THREE.Face3(0,1,2), new THREE.Face3(0,2,3),
		 new THREE.Face3(0,1,4), new THREE.Face3(1,5,4),
		 new THREE.Face3(1,5,6), new THREE.Face3(6,2,1),
		 new THREE.Face3(0,4,7), new THREE.Face3(7,3,0),
		 new THREE.Face3(3,2,6), new THREE.Face3(7,3,6),
		 new THREE.Face3(4,5,6), new THREE.Face3(4,6,7)];

	// Create an array of colors. Each side of the cube should have one color.
 colors = [new THREE.Color(0xD4EDF4),new THREE.Color(0xE2F2D5),new THREE.Color(0xf9fbba),
							new THREE.Color(0xf6c2c2),new THREE.Color(0xebebeb),new THREE.Color(0xece6e3)];
}

function buildFirstCube(){

	// Create a new THREE.Geometry and assigns it to the geom global variable
  var firstCube = new THREE.Geometry();
	// Assign the array of vertices to geom's vertices property
	firstCube.vertices = vertices;
	// Assign the array of faces to geom's faces property
	firstCube.faces = faces;
	// Set the color property of the faces array with color's setRGB method
	var colorIndex =0;
	for(var i = 0; i < firstCube.faces.length; i+=2){
		var face = firstCube.faces[i];
        face.color = colors[colorIndex];
        face = firstCube.faces[i + 1];
        face.color = colors[colorIndex];
        colorIndex+= 1;
	}
	var cubeMat = new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors, side: THREE.DoubleSide})
	firstCubeMesh = new THREE.Mesh(firstCube, cubeMat);
	firstCubeMesh.position.set(-260,blockWidth/2,0);


	// Create a new meesh based on the face color and assign the mesh to the
	//	global variable tempGeom
}

function buildWall(side){
		if(side ==0){
			var leftWall = new THREE.Object3D();
			var moveCubex = 0;
			var moveCubey = 0;
  	for(var j = 0; j <4 ; j++){
				for(var i = 0; i < 5; i++){
						var cube = firstCubeMesh.clone();
						cube.position.set(-240 + moveCubex, blockWidth/2 + moveCubey, 0);
						if((i %2 == 0 && j % 2 != 0) || (j == 0 || j==2) && i %2 != 0){
							cube.rotation.y = nintyDegrees;
							cube.rotation.x = nintyDegrees;
						}
						leftWall.add(cube);
						moveCubex += blockWidth;

					}
					moveCubex =0;
					moveCubey += blockWidth;
				}
			scene.add(leftWall)
		}else{
			var rightWall = new THREE.Object3D();
			var moveCubex = 0;
			var moveCubey = 0;
		for(var j = 0; j <4 ; j++){
				for(var i = 0; i < 5; i++){
						var cube = firstCubeMesh.clone();
						cube.position.set(240 - moveCubex, blockWidth/2 + moveCubey, 0);
						if((i %2 == 0 && j % 2 != 0) || (j == 0 || j==2) && i %2 != 0){
							cube.rotation.y = nintyDegrees;
							cube.rotation.x = nintyDegrees;
						}
						rightWall.add(cube);
						moveCubex += blockWidth;
					}
					moveCubex =0;
					moveCubey += blockWidth;
				}
		scene.add(rightWall);
	}
}

function buildTurnStile(){
	turnStile = new THREE.Object3D();

	//build middle pole.
	var cylGeom = new THREE.CylinderGeometry(5,5,170,5);
	var cylMat = new THREE.MeshBasicMaterial({color: 0x000000});
	var cylinder = new THREE.Mesh(cylGeom, cylMat);
	cylinder.position.set(0,85,0);

	//build first wall
	var turnGeo = new THREE.BoxGeometry( 10, turnStileSize, blockWidth*2 );
  var turnMat = new THREE.MeshBasicMaterial( {color: 0xC0C0C0} );
  var turnWall = new THREE.Mesh( turnGeo, turnMat );
	turnWall.position.set(0,turnStileSize/2 + 5 ,0);

	//clone second wall from first and rotate
	var turnWall2 = turnWall.clone();
	turnWall2.rotation.y = nintyDegrees
	turnStile.add(turnWall);
	turnStile.add(turnWall2);
	scene.add(turnStile);
	scene.add(cylinder);
}
/*
*Function for building ground and adding it to the scene.
*/
function buildGround(){

	var planeGeo = new THREE.PlaneGeometry(groundSize,groundSize);
	var planMat = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide})
	var plane = new THREE.Mesh(planeGeo, planMat);
	plane.rotation.x = nintyDegrees;
	scene.add(plane);


}
function onDocumentKeyDown(event){
	if(event.keyCode == 81){
		turnStile.rotation.y += .04;
		renderScene();
	}else if (key == 'r') {

	}
}
function renderScene(){

 	renderer.render(scene, camera);

}
