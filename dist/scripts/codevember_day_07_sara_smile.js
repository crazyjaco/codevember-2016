// Largely based on Lauren MacCarthy's OpenVisConf 
// 	demo of drawing with your nose.
// https://gist.github.com/lmccart/2273a047874939ad8ad1
var ctracker;
function setup() {
        // setup camera capture
        var videoInput = createCapture(VIDEO);
        videoInput.size(400, 300);
        videoInput.position(0, 0);
        
		// setup smile image
		smileImage = loadImage('./images/Smile.png'); 
	
        // setup canvas
        var cnv = createCanvas(400, 300);
        cnv.parent('sara-smile');
        cnv.position(0, 0);
        // setup tracker
        ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput.elt);
        noStroke();
}

function draw() {
	clear();
	// get array of face marker positions [x, y] format
	var positions = ctracker.getCurrentPosition();
	// Positions
	// 47 - Middle top of upper lip
	// 57 - Middle bottom of lower lip
	// 44 - Left corner of mouth
	// 50 - Right corner of mouth
	imgHeight = getDistance(positions[47], positions[57]);
	imgWidth = getDistance(positions[44], positions[50]);
	// image( imageName, x, y, width, height);
	image(smileImage, 0, 0, imgWidth, imgHeight);
	
	for (var i=0; i<positions.length; i++) {
		// set the color of the ellipse based on position on screen
		fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
		// draw ellipse at each position point
		ellipse(positions[i][0], positions[i][1], 8, 8);
	}
}

function getDistance(coord1, coord2) {
	// Distance between two coordinate pairs = pythagorean theorum
	// (x1 - x2)^2 + (y1 - y2)^2 = distance^2
	return Math.sqrt( Math.pow((coord1[0] - coord2[0]), 2) + Math.pow((coord1[1] - coord2[1]), 2) );
}