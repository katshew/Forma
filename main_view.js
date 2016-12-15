

/* main_view.js
 *
 * A starter code for am example composite application demonstrating: TextWidgets, ImageWidgets, 
 * VideoWidgets, JavaScriptWidgets, BookWidget, ItemsFlowWidget.
 * Also demonstrates creating a marker sensor widget and styling using CSS.
 * 
 * 
 * Solution is written by Jasmine Davis, August 2015
 * Updated by Orit Shaer, October 2015
 */


/*

marker code 0: cat
marker code 1: heart
marker code 2: snail
marker code 3: ice cream
marker code 4: trapezoid
marker code 5: 
marker code 6: lightbulb
marker code 7: rectangle
marker code 8: teacup
marker code 9: 
marker code 10: elephant
marker code 11: 
marker code 12:
marker code 13: 
marker code 14: 
marker code 15: 
marker code 17: 
marker code 18: 
marker code 19: 
marker code 20: 
marker code 21: 
marker code 22:
marker code 23: star
marker code 24:
marker code 25:
marker code 26:
marker code 27:
marker code 28:
marker code 29: cloud
marker code 30: square
marker code 31: circle

*/

var root = $.app.mainLayer();

var background = createBackground("images/background.png");
//var delete_button = 
clear();
// delete_button.onSingleTap(function () { 
// 	removeAll(); 
// });

root.addChild(background);
console.log("******************background****************");

//creating a marker sensor
markerSensor();

//Add a stylesheet to the app
$.app.addStyleFilename("styles.css");

/*
 * Supplementary data structures
 */

// Data used to determine location of iterative pattern
var y_dim = root.height()/4;
var x_dim = root.width()/5;

var quadrant_locations = [
	[[0,0],        [x_dim,0],        [x_dim*2,0],        [x_dim*3,0],        [x_dim*4,0],       ],
	[[0,y_dim],    [x_dim,y_dim],    [x_dim*2,y_dim],    [x_dim*3,y_dim],    [x_dim*4, y_dim],  ],
	[[0,y_dim*2],  [x_dim,y_dim*2],  [x_dim*2,y_dim*2],  [x_dim*3,y_dim*2],  [x_dim*4,y_dim*2], ],
	[[0,y_dim*3],  [x_dim,y_dim*3],  [x_dim*2,y_dim*3],  [x_dim*3,y_dim*3],  [x_dim*4,y_dim*3], ]
	];

// Store all shapes. Used as hashmap where absolute position of initial marker is used as key, and 
// all corresponding shape widgets are stored as the value in the form of an array
var shape_collection = {};

var key_queue = []; 

//
var default_shape_size = 80;

// fix rotation bt 90 degrees
var rotation_offset = 1.57;

var max_shapes = 15;
/*
* Utility functions
*/

//Creates and returns a customized widget for the application background
//that contains an ImageWidget.
function createBackground (background) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setWidth(root.width());
	w.setHeight(root.height());
	w.setFixed();
	w.setAutoRaiseToTop(false);

	w.image = new MultiWidgets.ImageWidget();

	if (w.image.load(background)) {
	    w.image.setWidth(w.width());
	    w.image.setHeight(w.height());
    	w.image.setFixed();
    	w.image.setAutoRaiseToTop(false);
    	w.addChild(w.image);
    	w.image.raiseToTop();
	}
	return w;
}

// returns the x coordinate of some input x relative to the quadrant it was placed in
function getRelativeX(absolute_x) {
	var x;
	// 1st quadrant
	if(absolute_x < quadrant_locations[0][1][0]) {
		x = absolute_x;
	}
	// 2nd quadrant
	else if(absolute_x < quadrant_locations[0][2][0]){
		x = absolute_x - quadrant_locations[0][1][0];
	}
	// 3rd quadrant
	else if(absolute_x < quadrant_locations[0][3][0]){
		x = absolute_x - quadrant_locations[0][2][0];
	}
	//  4th quadrant
	else if(absolute_x < quadrant_locations[0][4][0]){
		x = absolute_x - quadrant_locations[0][3][0];
	}
	// 5th quadrant
	else if(absolute_x < root.width()){
		x = absolute_x - quadrant_locations[0][4][0];
	}
	// not in a valid quadrant
	else return;
	return x;

}

// returns the y coordinate of some input y relative to the quadrant it was placed in
function getRelativeY(absolute_y) {
	var y;
	// 1st quadrant
	if(absolute_y < quadrant_locations[1][0][1]) {
		y = absolute_y;
	}
	// 2nd quadrant
	else if(absolute_y < quadrant_locations[2][0][1]){
		y = absolute_y - quadrant_locations[1][0][1];
	}
	// 3rd quadrant
	else if(absolute_y < quadrant_locations[3][0][1]){
		y = absolute_y - quadrant_locations[2][0][1];
	}
	// 4th quadrant
	else if(absolute_y < root.height()){
		y = absolute_y - quadrant_locations[3][0][1];
	}
	// not in a valid quadrant
	else return;
	return y;
}

// creates a shape in the same position in every quadrant given an x, y, code, and rotation. Adds all these shapes to a hashmap
//    indexed on the original x location to avoid bug where many of the same widget will spawn in the same location
function placeAll(x, y, code, time, rotation){
	//instantiate shape collection and place all shapes as image widgets

	if ((Math.round(x)-1 in shape_collection) || (Math.round(x)+1 in shape_collection) || (Math.round(x) in shape_collection)) {
		console.log("already a shape in this location");
		return;
	}
	// for hashmap
	var key = Math.round(x);
	// array that will be populated with shape widgets
	var all_shapes = [];

	// get location relative to quadrant
	x = getRelativeX(x);
	y = getRelativeY(y);

	for(row = 0; row < quadrant_locations.length; row++) {
    	for (col = 0; col < quadrant_locations[0].length; col++) {
    		// create shape widget based on the input marketr code
    		var shape_widget =  createShape(x+quadrant_locations[row][col][0], y+quadrant_locations[row][col][1], default_shape_size, default_shape_size, rotation + rotation_offset, code)
    		all_shapes.push(shape_widget);
    		root.addChild(shape_widget);
    	}          
    }
    // adding all shapes to shape_collection dictionary based on original marker location
    key_queue.push(key);
    shape_collection[key] = all_shapes;
}

// create a shape widget containing an image widget. Could add more shapes if images are uploaded to correct ./images
// folder and made to correspond with a code 
function createShape(x, y, sizeX, sizeY, rotation, code) {
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.setCSSId("image");
	w.setDepth(1);
	w.setFixed();
	w.img = new MultiWidgets.ImageWidget();

	var image_name = "";

	switch (code) {

	case 0: 
		image_name = "cat.png";
		break;
	case 1: 
		image_name = "heart.png";
		break;
	case 2: 
		image_name = "snail.png";
		break;
	case 3: 
		image_name = "icecream.png";
	//	w.setWidth(sizeX*2);
	// 	w.setHeight(sizeY*3);
		break;		
	case 4: 
		image_name = "trapezoid.png";
		break;
	case 5: 
		break;
	case 6: 
		image_name = "lightbulb.png";
		break;
	case 7: 
		image_name = "rectangle.png";
		break;
	case 8: 
		image_name = "teacup.png";
		break;
	case 9:
			break; 
	case 10: 
		image_name = "elephant.png";
		break;
	case 11:
		break; 
	case 12:
		break;
	case 13: 
		break;
	case 14: 
		break;
	case 15: 
		break;
	case 17: 
		break;
	case 18: 		
		break;
	case 19: 
		break;
	case 20: 
		break;
	case 21: 
		break;
	case 22:
		break;
	case 23: 
		image_name = "star.png";
		break;
	case 24:
		break;
	case 25:
		break;
	case 26:
		break;
	case 27:
		break;
	case 28:
		break;
	case 29: 
		image_name = "cloud.png";
		break;
	case 30: 
		image_name = "square.png";
		break;
	case 31: 
		image_name = "circle.png";
		break;
	}

	if (w.img.load("images/"+image_name)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	//w.img.setWidth(sizeX);
	    //w.img.setHeight(sizeY);
	    w.img.setRotation(rotation);
	    w.addChild(w.img);
    	w.img.raiseToTop();
	}
	return w;
}

//remove widgets from the shape collection once number of shapes on screen has exceeded the max_shapes constant 
function removeShapes(){
	//remove images widgets by iterating over shape_collection
	if (key_queue.length > max_shapes) {		
		var key_to_remove = key_queue.splice(0, 1);
		for (i = 0; i < shape_collection[key_to_remove].length; i++) {
			root.removeChild(shape_collection[key_to_remove][i]);
		} 
		delete shape_collection[key_to_remove];
	}
}

function removeAll() {
	for (var key_to_remove in shape_collection) { 
		for (i = 0; i < shape_collection[key_to_remove].length; i++) {
				root.removeChild(shape_collection[key_to_remove][i]);
		} 
			delete shape_collection[key_to_remove];
	}
}

// clear all shapes from the board
function clear() {
	var w = new MultiWidgets.JavaScriptWidget();

	w.onSingleTap(function() {
		console.log("clear button was tapped");
		removeAll();
	});
	w.setWidth(30);
	w.setHeight(30);
	w.setLocation(root.width()-40, 5)
	w.setFixed();
	w.setAutoRaiseToTop(true);
	w.setCSSId("image");

	w.image = new MultiWidgets.ImageWidget();

	if (w.image.load("images/delete.png")) {
	    w.image.setWidth(w.width());
	    w.image.setHeight(w.height());
    	w.image.setFixed();
    	w.addChild(w.image);
    	w.image.raiseToTop();
	}
	root.addChild(w);
	return w;
}

// print test information to the console
function printTestText(marker) {
	console.log("\n\n**************** \n"
					+ "marker " + marker.code() + " was placed." 
					+ "\nx: "+ marker.centerLocation().x  
					+ "\ny: "+marker.centerLocation().y  
					+ "\nrelative y: " + getRelativeY(marker.centerLocation().y)
					+ "\nrelative x: " + getRelativeX(marker.centerLocation().x)
					+ "\nrotation: " + marker.rotation()
	);
}

/*
*
* Marker functions
*/

function markerSensor() {
	//
	console.log("in markerSensor");
	var markerSensor = new MultiWidgets.JavaScriptWidget();
	markerSensor.setLocation(0,0);
	markerSensor.setHeight(root.height());
	markerSensor.setWidth(root.width());
	markerSensor.setFixed();
	markerSensor.setBackgroundColor(0.01,0.01,0.01,0.01);

	markerSensor.onMarkerDown(function(idString) {
		var idInt = parseInt(idString);
		var gm = $.app.grabManager();
		var marker = gm.findMarker(idInt);

		if (marker.code() <=31) {
			printTestText(marker);
			placeAll(marker.centerLocation().x, marker.centerLocation().y, marker.code(), 0, marker.rotation());
		}
		if (key_queue.length > max_shapes) {
			removeShapes();
		}
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}


