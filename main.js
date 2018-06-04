(function(){
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight + document.getElementById("controls").clientHeight);
document.body.appendChild(renderer.domElement);
let btn = document.getElementById("startTimer");
let btn2 = document.getElementById("Randomize");


btn.addEventListener("click",function(e){
	let data = document.getElementById("data").value;
	
	readData(parseData(data),document.getElementById("timer").value);
	
});
//let operations = [right(),rightInv(),left(),leftInv(),front(),frontInv(),back(),backInv(),top(),topInv,bottom(),bottomInv()];
btn2.addEventListener("click",function(e){
	var operations = [right,rightInv,left,leftInv,front,frontInv,back,backInv,top,topInv,bottom,bottomInv];
	for(var i = 0; i < 30; i++){
		let op = Math.floor(Math.random() * 12);
		console.log(op)
		operations[op]()
	}

	
});


var controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.update();

camera.position.z = -11;


//Create 3d array to store object data
var cube = [
	//front
	[
		[0,0,0],
		[0,0,0],
		[0,0,0]
	],
	//back
	[
		[1,1,1],
		[1,1,1],
		[1,1,1]
	],
	//left
	[
		[2,2,2],
		[2,2,2],
		[2,2,2]
	],
	//right
	[
		[3,3,3],
		[3,3,3],
		[3,3,3]
	],
	//top
	[
		[4,4,4],
		[4,4,4],
		[4,4,4]
	],
	//bottom
	[
		[5,5,5],
		[5,5,5],
		[5,5,5]
	]
]
var xPos = 0;
var yPos = 0;
var zPos = 0;
var centerPosZ = 0;
for(var i = 0; i < cube.length; i++){

	if (i === 0){
		var x = 1;
		var y = 1;
		var z = .1;
		var mat = 0x00ff00;

	}
	if(i === 1){
		var x = 1;
		var y = 1;
		var z = .1;
		var mat = 0x0000ff;
		
	}
	if(i === 2){
		var x = .1;
		var y = 1;
		var z = 1;
		var mat = 0xffffff;
		
	}
	if(i === 3){
		var x = .1;
		var y = 1;
		var z = 1;
		var mat = 0xffff00;
		
	}
	if(i === 4){
		var x = 1;
		var y = .1;
		var z = 1;
		var mat = 0xff0000;
		
	}
	if(i === 5){
		var x = 1;
		var y = .1;
		var z = 1;
		var mat = 0xffa500;
		
	}

	for(var j = 0; j < cube[i].length; j++){

		for(var k = 0; k < cube[i][j].length;k++){
			
			var geometry = new THREE.BoxGeometry(x,y,z);
			var material = new THREE.MeshBasicMaterial({color:mat});
			var cubed = new THREE.Mesh(geometry,material);
			// different positions for equal positions (top-left [0][0] to bottom right [2][2])
			if(i === 0){
				cubed.position.set(xPos,yPos,zPos - 4)
				
			}
			if(i === 1){
				cubed.position.set(-xPos - 3,yPos,zPos + 1)
				
			}
			if(i === 2){
				cubed.position.set(zPos + 1,yPos,xPos)
				
				
			}			
			if(i === 3){
				cubed.position.set(zPos - 4,yPos,-xPos - 3)
				
				
			}
			if(i === 4){
				cubed.position.set(xPos,zPos + 1,yPos)
				
				
				
			}			
			if(i === 5){
				cubed.position.set(xPos,zPos - 4,-yPos - 3)
				
			}
			if(i < 3){
				
				var geometry = new THREE.BoxGeometry(1.5,1.5,1.5);
				var material = new THREE.MeshBasicMaterial({color:0x000000});
				var center = new THREE.Mesh(geometry,material);
				center.position.set(xPos,yPos,centerPosZ );
				scene.add(center);
			}
			scene.add(cubed); 
			cube[i][j][k] = cubed;
			xPos -= 1.5;
			
			
		}
		xPos = 0;
		yPos -= 1.5;
		
		
	}
	yPos = 0;
	xPos = 0;
	centerPosZ -= 1.5;
	
	
}
function right(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[0][i][2].material;
			cube[0][i][2].material = cube[5][i][2].material;
			cube[5][i][2].material = cube[1][i][0].material;
			cube[1][i][0].material = cube[4][i][2].material;
			cube[4][i][2].material = temp;
			
		}
		/*Some faces need array to be reversed to work properly.
		since we are not changing array positions 
		we cannot use array.reverse(), instead manually switch them*/
		let tmp = cube[5][0][2].material;
		let tmp2 = cube[1][0][0].material;
		cube[5][0][2].material = cube[5][2][2].material;
		cube[5][2][2].material = tmp;
		cube[1][0][0].material = cube[1][2][0].material;
		cube[1][2][0].material = tmp2;
		
		
		for(var i = 0; i < cube[3].length / 2; i++){
			for(var x = i; x < cube[3].length - i - 1; x++){
				let temp = cube[3][i][x].material;
				cube[3][i][x].material = cube[3][cube[3].length - x - 1][i].material;
				cube[3][cube[3].length - x - 1][i].material = cube[3][cube[3].length - i - 1][cube[3].length - x - 1].material;
				cube[3][cube[3].length - i - 1][cube[3].length - x - 1].material = cube[3][x][cube[3].length - i - 1].material;
				cube[3][x][cube[3].length - i - 1].material = temp;
				
			}
			
		}
		
	}
	function rightInv(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[0][i][2].material;
			cube[0][i][2].material = cube[4][i][2].material;
			cube[4][i][2].material = cube[1][i][0].material;
			cube[1][i][0].material = cube[5][i][2].material;
			cube[5][i][2].material = temp;
		}

		let tmp = cube[4][0][2].material;
		let tmp2 = cube[1][0][0].material;
		cube[4][0][2].material = cube[4][2][2].material;
		cube[4][2][2].material = tmp;
		cube[1][0][0].material = cube[1][2][0].material;
		cube[1][2][0].material = tmp2;
		
		
		for(var i = 0; i < cube[3].length / 2; i++){
			for(var x = i; x < cube[3].length - i - 1; x++){
				let temp = cube[3][i][x].material;
				cube[3][i][x].material = cube[3][x][cube[3].length - i - 1].material;
				cube[3][x][cube[3].length - i - 1].material = cube[3][cube[3].length - i - 1][cube[3].length - x - 1].material;
				cube[3][cube[3].length - i - 1][cube[3].length - x - 1].material = cube[3][cube[3].length - x - 1][i].material;
				cube[3][cube[3].length - x - 1][i].material = temp;
				
			}
			
		}
		
	}
	
	function leftInv(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[0][i][0].material;
			cube[0][i][0].material = cube[5][i][0].material;
			cube[5][i][0].material = cube[1][i][2].material;
			cube[1][i][2].material = cube[4][i][0].material;
			cube[4][i][0].material = temp;
			
		}
		let tmp = cube[5][0][0].material;
		let tmp2 = cube[1][0][2].material;
		cube[5][0][0].material = cube[5][2][0].material;
		cube[5][2][0].material = tmp;
		cube[1][0][2].material = cube[1][2][2].material;
		cube[1][2][2].material = tmp2;
		
		
		
		
		
		for(var i = 0; i < cube[2].length / 2; i++){
			for(var x = i; x < cube[2].length - i - 1; x++){
				let temp = cube[2][i][x].material;
				cube[2][i][x].material = cube[2][x][cube[2].length - i - 1].material;
				cube[2][x][cube[3].length - i - 1].material = cube[2][cube[2].length - i - 1][cube[2].length - x - 1].material;
				cube[2][cube[2].length - i - 1][cube[2].length - x - 1].material = cube[2][cube[2].length - x - 1][i].material;
				cube[2][cube[2].length - x - 1][i].material = temp;
				
			}
			
		}
		
	}
	function left(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[0][i][0].material;
			cube[0][i][0].material = cube[4][i][0].material;
			cube[4][i][0].material = cube[1][i][2].material;
			cube[1][i][2].material = cube[5][i][0].material;
			cube[5][i][0].material = temp;
		}
		
		let tmp = cube[4][0][0].material;
		let tmp2 = cube[1][0][2].material;
		cube[4][0][0].material = cube[4][2][0].material;
		cube[4][2][0].material = tmp;
		cube[1][0][2].material = cube[1][2][2].material;
		cube[1][2][2].material = tmp2;
		
		
		for(var i = 0; i < cube[2].length / 2; i++){
			for(var x = i; x < cube[2].length - i - 1; x++){
				let temp = cube[2][i][x].material;
				cube[2][i][x].material = cube[2][cube[2].length - x - 1][i].material;
				cube[2][cube[2].length - x - 1][i].material = cube[2][cube[2].length - i - 1][cube[2].length - x - 1].material;
				cube[2][cube[2].length - i - 1][cube[2].length - x - 1].material = cube[2][x][cube[2].length - i - 1].material;
				cube[2][x][cube[2].length - i - 1].material = temp;
				
			}
			
		}
		
	}
	
	function backInv(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[4][0][i].material;
			cube[4][0][i].material = cube[2][i][0].material;
			cube[2][i][0].material = cube[5][2][i].material;
			cube[5][2][i].material = cube[3][i][2].material;
			cube[3][i][2].material = temp;
			
		}
		let tmp = cube[4][0][0].material;
		let tmp2 = cube[5][2][0].material;
		cube[4][0][0].material = cube[4][0][2].material;
		cube[4][0][2].material = tmp;
		cube[5][2][0].material = cube[5][2][2].material;
		cube[5][2][2].material = tmp2;

		for(var i = 0; i < cube[1].length / 2; i++){
			for(var x = i; x < cube[1].length - i - 1; x++){
				let temp = cube[1][i][x].material;
				cube[1][i][x].material = cube[1][x][cube[1].length - i - 1].material;
				cube[1][x][cube[1].length - i - 1].material = cube[1][cube[1].length - i - 1][cube[1].length - x - 1].material;
				cube[1][cube[1].length - i - 1][cube[1].length - x - 1].material = cube[1][cube[1].length - x - 1][i].material;
				cube[1][cube[1].length - x - 1][i].material = temp;
				
			}
			
		}
		
		
	}
	function back(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[4][0][i].material;
			cube[4][0][i].material = cube[3][i][2].material;
			cube[3][i][2].material = cube[5][2][i].material;
			cube[5][2][i].material = cube[2][i][0].material;
			cube[2][i][0].material = temp;
		}
		let tmp = cube[2][0][0].material;
		let tmp2 = cube[3][0][2].material;
		cube[2][0][0].material = cube[2][2][0].material;
		cube[2][2][0].material = tmp;
		cube[3][0][2].material = cube[3][2][2].material;
		cube[3][2][2].material = tmp2;
		
		for(var i = 0; i < cube[1].length / 2; i++){
			for(var x = i; x < cube[1].length - i - 1; x++){
				let temp = cube[1][i][x].material;
				cube[1][i][x].material = cube[1][cube[1].length - x - 1][i].material;
				cube[1][cube[1].length - x - 1][i].material = cube[1][cube[1].length - i - 1][cube[1].length - x - 1].material;
				cube[1][cube[1].length - i - 1][cube[1].length - x - 1].material = cube[1][x][cube[1].length - i - 1].material;
				cube[1][x][cube[1].length - i - 1].material = temp;
				
			}
			
		}
		
	}
	
	function front(){
		for(var i = 0; i < cube[0].length; i++){
			inv = i == 2 ? 0 : 2;
			inv = (i == 0 || i == 2) ? inv : 1
			let temp = cube[4][2][i].material;
			cube[4][2][i].material = cube[2][i][2].material;
			cube[2][i][2].material = cube[5][0][i].material;
			cube[5][0][i].material = cube[3][i][0].material;
			cube[3][i][0].material = temp;
			
		}
		let tmp = cube[4][2][0].material;
		let tmp2 = cube[5][0][0].material;
		cube[4][2][0].material = cube[4][2][2].material;
		cube[4][2][2].material = tmp;
		cube[5][0][0].material = cube[5][0][2].material;
		cube[5][0][2].material = tmp2;
		
		
		for(var i = 0; i < cube[0].length / 2; i++){
			for(var x = i; x < cube[0].length - i - 1; x++){
				let temp = cube[0][i][x].material;
				cube[0][i][x].material = cube[0][cube[0].length - x - 1][i].material;
				cube[0][cube[0].length - x - 1][i].material = cube[0][cube[0].length - i - 1][cube[0].length - x - 1].material;
				cube[0][cube[0].length - i - 1][cube[0].length - x - 1].material = cube[0][x][cube[0].length - i - 1].material;
				cube[0][x][cube[0].length - i - 1].material = temp;
				
			}
			
		}
		
	}
	function frontInv(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[4][2][i].material;
			cube[4][2][i].material = cube[3][i][0].material;
			cube[3][i][0].material = cube[5][0][i].material;
			cube[5][0][i].material = cube[2][i][2].material;
			cube[2][i][2].material = temp;
		}
		let tmp = cube[2][0][2].material;
		let tmp2 = cube[3][0][0].material;
		cube[2][0][2].material = cube[2][2][2].material;
		cube[2][2][2].material = tmp;
		cube[3][0][0].material = cube[3][2][0].material;
		cube[3][2][0].material = tmp2;
		for(var i = 0; i < cube[0].length / 2; i++){
			for(var x = i; x < cube[0].length - i - 1; x++){
				let temp = cube[0][i][x].material;
				cube[0][i][x].material = cube[0][x][cube[0].length - i - 1].material;
				cube[0][x][cube[0].length - i - 1].material = cube[0][cube[0].length - i - 1][cube[0].length - x - 1].material;
				cube[0][cube[0].length - i - 1][cube[0].length - x - 1].material = cube[0][cube[0].length - x - 1][i].material;
				cube[0][cube[0].length - x - 1][i].material = temp;
				
			}
			
		}
		
	}
	function top(){
		for(var i = 0; i < cube[0].length; i++){
			
			let temp = cube[0][0][i].material;
			cube[0][0][i].material = cube[3][0][i].material;
			cube[3][0][i].material = cube[1][0][i].material;
			cube[1][0][i].material = cube[2][0][i].material;
			cube[2][0][i].material = temp;
			
		}
		for(var i = 0; i < cube[4].length / 2; i++){
			for(var x = i; x < cube[4].length - i - 1; x++){
				let temp = cube[4][i][x].material;
				cube[4][i][x].material = cube[4][cube[4].length - x - 1][i].material;
				cube[4][cube[4].length - x - 1][i].material = cube[4][cube[4].length - i - 1][cube[4].length - x - 1].material;
				cube[4][cube[4].length - i - 1][cube[4].length - x - 1].material = cube[4][x][cube[4].length - i - 1].material;
				cube[4][x][cube[4].length - i - 1].material = temp;
				
			}
			
		}
		
	}
	function topInv(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[0][0][i].material;
			cube[0][0][i].material = cube[2][0][i].material;
			cube[2][0][i].material = cube[1][0][i].material;
			cube[1][0][i].material = cube[3][0][i].material;
			cube[3][0][i].material = temp;
		}
		for(var i = 0; i < cube[4].length / 2; i++){
			for(var x = i; x < cube[4].length - i - 1; x++){
				let temp = cube[4][i][x].material;
				cube[4][i][x].material = cube[4][x][cube[4].length - i - 1].material;
				cube[4][x][cube[4].length - i - 1].material = cube[4][cube[4].length - i - 1][cube[4].length - x - 1].material;
				cube[4][cube[4].length - i - 1][cube[4].length - x - 1].material = cube[4][cube[4].length - x - 1][i].material;
				cube[4][cube[4].length - x - 1][i].material = temp;
				
			}
			
		}
		
	}
	function bottomInv(){
		for(var i = 0; i < cube[0].length; i++){
			
			let temp = cube[0][2][i].material;
			cube[0][2][i].material = cube[3][2][i].material;
			cube[3][2][i].material = cube[1][2][i].material;
			cube[1][2][i].material = cube[2][2][i].material;
			cube[2][2][i].material = temp;
			
		}

		for(var i = 0; i < cube[5].length / 2; i++){
			for(var x = i; x < cube[5].length - i - 1; x++){
				let temp = cube[5][i][x].material;
				cube[5][i][x].material = cube[5][x][cube[5].length - i - 1].material;
				cube[5][x][cube[5].length - i - 1].material = cube[5][cube[5].length - i - 1][cube[5].length - x - 1].material;
				cube[5][cube[5].length - i - 1][cube[5].length - x - 1].material = cube[5][cube[5].length - x - 1][i].material;
				cube[5][cube[5].length - x - 1][i].material = temp;
				
			}
			
		}
	}
	function bottom(){
		for(var i = 0; i < cube[0].length; i++){
			let temp = cube[0][cube[0].length - 1][i].material;
			cube[0][cube[0].length - 1][i].material = cube[2][cube[0].length - 1][i].material;
			cube[2][cube[0].length - 1][i].material = cube[1][cube[0].length - 1][i].material;
			cube[1][cube[0].length - 1][i].material = cube[3][cube[0].length - 1][i].material;
			cube[3][cube[0].length - 1][i].material = temp;
		}
		for(var i = 0; i < cube[5].length / 2; i++){
			for(var x = i; x < cube[5].length - i - 1; x++){
				let temp = cube[5][i][x].material;
				cube[5][i][x].material = cube[5][cube[5].length - x - 1][i].material;
				cube[5][cube[5].length - x - 1][i].material = cube[5][cube[5].length - i - 1][cube[5].length - x - 1].material;
				cube[5][cube[5].length - i - 1][cube[5].length - x - 1].material = cube[5][x][cube[5].length - i - 1].material;
				cube[5][x][cube[5].length - i - 1].material = temp;
				
			}
			
		}
		
	}
	





function draw(){

	controls.update();
	renderer.render(scene,camera);
	requestAnimationFrame(draw);
};
draw();


function parseData(e){
	let items = e.split(" ");

	var queue = new Queue();
	for(var i = 0; i < items.length; i++){
		let reg = /\d+/g;
		let matches = items[i].match(reg);
		let loops = matches ? parseInt(matches) : 1
		var op = items[i].replace(/\d/g,'');
		for(var j = 0; j < loops; j++){
			switch(op){
				case "r":
				queue.enqueue(right)
				break;
				case "r'":
				queue.enqueue(rightInv)
				break;
				case "l":
				queue.enqueue(left)
				break;
				case "l'":
				queue.enqueue(leftInv)
				break;
				case "f":
				queue.enqueue(front)
				break;
				case "f'":
				queue.enqueue(frontInv)
				break;
				case "b":
				queue.enqueue(back)
				break;
				case "b'":
				queue.enqueue(backInv)
				break;
				case "u":
				queue.enqueue(top)
				break;
				case "u'":
				queue.enqueue(topInv)
				break;
				case "d":
				queue.enqueue(bottom)
				break;
				case "d'":
				queue.enqueue(bottomInv)
				break;
				default:
				break;			
				
				
			}
		}
	}
	//solveCube(queue);
	return queue;
}

function readData(que,time){
	let timer = time ? time : 0
	var loopInt = setInterval(function(){solveCube(que,loopInt)},timer)
}

function solveCube(q,id){
	let len = q.length();
	let op = q.first();
	q.dequeue();
	op();
	if(q.length() === 0){
		clearInterval(id)
	}
	console.log("hello?")
}

class Queue{
	constructor(){
		this.arr = [];
	}
	enqueue(el){
		this.arr.push(el);
	}
	dequeue(){
		if (this.arr.length == 0){
			return "array at zero"
			console.log("??")
		}
		this.arr.shift();
	}
	first(){
		if (this.arr.length == 0){
			return "array at zero"
			console.log("??")
		}
		return this.arr[0];
	}
	printQueue(){
		var str = "";
		for(var i = 0; i < this.arr.length; i++){
			str += this.arr[i] + " ";
		}
		return str;
	}
	length(){
		return this.arr.length;
	}
	
}




})();
