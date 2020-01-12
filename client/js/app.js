// all of our js will be coded here!
let canvas = document.querySelector('.canvas');
let context = canvas.getContext('2d');

// load images
let bg = new Image();
let bird = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bg.src = "../img/bg.png";
bird.src = "../img/bird.png";
fg.src = "../img/fg.png";
pipeNorth.src = "../img/pipeNorth.png";
pipeSouth.src = "../img/pipeSouth.png";

let gap = 80;
let constant = pipeNorth.height + gap;

// make our bird position dynamic
let bX = 10;
let bY = 200;
let gravity = 1;
let score = 0;

// never ending continous pipes as game goes on
let pipe = [];
pipe[0] = {
	x : canvas.width,  //when animation starts we want pipes to start from end of canvas
	y : 0
};

// implement our bird movement when any key is pressed
window.addEventListener('keydown',moveUp);

function moveUp(){
	bY -= 25;
};


// we call the onload event that allows us to perform an event after the window has loaded
window.onload = function draw(){
	// draw images on canvas
	context.drawImage(bg,0,0); //
	for(var i = 0; i<pipe.length;i++){
		context.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
		context.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);


		// moves from right to left of canvas
		pipe[i].x--;
		// we now want more pipes one after the other
		// also the pipes must be of different length
		if(pipe[i].x === 100){//180 is dist from x-axis
			pipe.push({ //push allows us to add elements at the end of our array
				x :canvas.width,
				y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
			});
		} 
		// we are making the height dynamic hence pipeNorth.height
		// if we dont - pipeNorth.height there will be times the gap would be nullified
		// by - pipeNorth.height the pipeNorth also becomes dynamic due to our constant from above
		
		//we now check for collisions 
		if((bX+bird.width >= pipe[i].x && bX <= pipeNorth.width + pipe[i].x) && (bY <=pipeNorth.height+pipe[i].y || bY+bird.height >= pipe[i].y+constant)
		||(bY+bird.height >= canvas.height-fg.height)){
			location.reload(); //reloads current url
		} 
		
		// get our scores
		if(pipe[i].x === 5){ //bird has already passed
			score ++;
		}

	}

	context.drawImage(fg,0,canvas.height-fg.height);
	context.drawImage(bird,bX,bY);

	bY += gravity;


	context.font = "20px Verdana";
	context.fillText("Score:"+score,0,canvas.height-20);


	requestAnimationFrame(draw); //tells the browser you wish to perform an animation
	// and for it to call a specific func which will update the anim
};	
