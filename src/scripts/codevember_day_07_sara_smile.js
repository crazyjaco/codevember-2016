// Largely based on Lauren MacCarthy's OpenVisConf 
// 	demo of drawing with your nose.
// https://gist.github.com/lmccart/2273a047874939ad8ad1
var ctracker;

var getDistance = function(coord1, coord2) {
	// Distance between two coordinate pairs = pythagorean theorum
	// (x1 - x2)^2 + (y1 - y2)^2 = distance^2
	return Math.sqrt( Math.pow((coord1[0] - coord2[0]), 2) + Math.pow((coord1[1] - coord2[1]), 2) );
}

var getAngle = function(coord1, coord2) {
	// get angle between two coords
	// http://stackoverflow.com/questions/7586063/how-to-calculate-the-angle-between-a-line-and-the-horizontal-axis
	var deltaX = coord2[0] - coord1[0];
	var deltaY = coord2[1] - coord1[1];
	// Get angle in degrees.
	return atan2(deltaY, deltaX) * 180 / PI
}

var setup = function() {
        // setup camera capture
        var videoInput = createCapture(VIDEO);
        videoInput.size(400, 300);
        videoInput.position(0, 0);
        
		// setup smile image
		smileImage = loadImage('../images/Smile_cropped.png'); 
	
        // setup canvas
        var cnv = createCanvas(400, 300);
        cnv.position(0, 0);
        // setup tracker
        ctracker = new clm.tracker();
        ctracker.init(pModel);
        ctracker.start(videoInput.elt);
        noStroke();
}

var draw = function() {
	clear();
	// get array of face marker positions [x, y] format
	var positions = ctracker.getCurrentPosition();
	// Positions
	// 47 - Middle top of upper lip
	// 53 - Middle bottom of lower lip
	// 44 - Left corner of mouth
	// 50 - Right corner of mouth
	if ( false !== positions ){
		// for (var i=0; i<positions.length; i++) {
		// 	// set the color of the ellipse based on position on screen
		// 	fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
		// 	// draw ellipse at each position point
		// 	ellipse(positions[i][0], positions[i][1], 4, 4);
		// }

		imgHeight = getDistance(positions[47], positions[53]);
		imgWidth = getDistance(positions[44], positions[50]);
		imgAngle = getAngle(positions[44], positions[50]);
		
		// Indicator light - face detected.
		fill(0,255,0);
		ellipse(15,15,30,30);
		// translate to pivot point.
		translate( ( positions[47][0] - (imgWidth / 2) ), 
			( positions[44][1] - (imgHeight /2 ) ) );
		// rotate whatever comes after this.
		rotate(radians(imgAngle));
		//rect(0, 0, imgWidth, imgHeight);
		// image( imageName, x, y, width, height);
		image(smileImage, 0, 0, imgWidth, imgHeight);		
	} else {
		// Indicator light - no face detected.
		fill(255,0,0);
		ellipse(385,285,30,30);
	}
}

