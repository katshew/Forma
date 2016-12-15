

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
var default_shape_size = 50;

var background = createBackground("Media/background.jpg");

root.addChild(background);
console.log("******************background****************");

//creating a marker sensor
markerSensor();

//Add a stylesheet to the app
$.app.addStyleFilename("styles.css");

var y_dim = root.height()/4;
var x_dim = root.width()/5;

var quadrant_locations = [
	[[0,0],        [x_dim,0],        [x_dim*2,0],        [x_dim*3,0],        [x_dim*4,0],       ],
	[[0,y_dim],    [x_dim,y_dim],    [x_dim*2,y_dim],    [x_dim*3,y_dim],    [x_dim*4, y_dim],  ],
	[[0,y_dim*2],  [x_dim,y_dim*2],  [x_dim*2,y_dim*2],  [x_dim*3,y_dim*2],  [x_dim*4,y_dim*2], ],
	[[0,y_dim*3],  [x_dim,y_dim*3],  [x_dim*2,y_dim*3],  [x_dim*3,y_dim*3],  [x_dim*4,y_dim*3], ]
	];

/*
* Utility functions
*/

function timeout(shape_collection){
	return 0;
//remove images widgets by iterating over shape_collection
}

function getRelativeX(absolute_x) {
	var x;
	if(absolute_x < x_dim) {
		x = x_dim-absolute_x;
	}

	else if(absolute_x < x_dim*2){
		x = x_dim*2-absolute_x;
	}

	else if(absolute_x < x_dim*3){
		x = x_dim*3-absolute_x;
	}

	else if(absolute_x < x_dim*4){
		x = x_dim*4-absolute_x;
	}

	else if(absolute_x < x_dim*5){
		x = x_dim*5-absolute_x;
	}
	else return;
	return x;

}

function getRelativeY(absolute_y) {
	var y;
	if(absolute_y < y_dim) {
		y = y_dim-absolute_y;
	}

	else if(absolute_y < y_dim*2){
		y = y_dim*2-absolute_y;
	}

	else if(absolute_y < y_dim*3){
		y = y_dim*3-absolute_y;
	}

	else if(absolute_y < y_dim*4){
		y = y_dim*4-absolute_y;
	}

	else return;

	return y;
}

function placeAll(x, y, code, time, rotation){
	//instantiate shape collection and place all shapes as image widgets

	console.log(quadrant_locations.length);
	console.log(quadrant_locations[0].length);

	for(row = 0; row < quadrant_locations.length; row++) {
    	for (col = 0; col < quadrant_locations[0].length; col++) {
    		var shape_widget =  createShape(x+quadrant_locations[row][col][0], y+quadrant_locations[row][col][1], default_shape_size, default_shape_size, rotation, code)
    		root.addChild(shape_widget);
    	}          
    }
}

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

// add rotation 
function createShape(x, y, sizeX, sizeY, rotation, code) {
	console.log("create shape called. x: " + x + " y: " + y);
	var w = new MultiWidgets.JavaScriptWidget();

	w.setLocation(x, y);
	w.setWidth(sizeX);
	w.setHeight(sizeY);
	w.setDepth(10000000);
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
		image_name = "ice cream.png";
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
	console.log("finished switch. image name: " + image_name);

	if (w.img.load("images/"+image_name)) {
	    w.img.addOperator(new MultiWidgets.StayInsideParentOperator());
    	w.img.setLocation(x,y);
    	w.img.setWidth(sizeX);
	    w.img.setHeight(sizeY);
	    w.img.setRotation(rotation);
	    w.addChild(w.img);
    	w.img.raiseToTop();
	}


	return w;
}

function printTestText(marker) {
	console.log("**************** \n"
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
			//console.log("\nwhere to place x: " + x+(quadrant_locations[0][0][0]));
    		//console.log("where to place y: " + y+(quadrant_locations[0][0][1]));
			//var shape = createShape(marker.centerLocation().x, marker.centerLocation().y, default_shape_size, default_shape_size, marker.rotation(), marker.code());
			//root.addChild(shape);
			//console.log(quadrant_locations[0]);
			//console.log(quadrant_locations[0][0]);

			placeAll(marker.centerLocation().x, marker.centerLocation().y, marker.code(), 0, marker.rotation());
		}
	});

	root.addChild(markerSensor);
	markerSensor.raiseToTop();
}


