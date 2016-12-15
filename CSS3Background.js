/* Copyright (C) 2007-2013 Multi Touch Oy, Finland, http://www.multitaction.com
 *
 * This file is part of MultiTouch Cornerstone.
 *
 * All rights reserved. You may use this file only for purposes for which you
 * have a specific, written permission from Multi Touch Oy.
 *
 */

/** @example CSS3Background.js
This example shows how to use backgrounds defined in 
<a href="http://www.w3.org/TR/css3-background/">CSS3</a>.

@image html CSS3Background-screenshot.png Screenshot of the CSS3Background example

The main program in this example is written in JavaScript. 
First we add additional stylesheet for the application:

@snippet CSS3Background.js Set stylesheet

After that we create five @ref MultiWidgets::TextWidget "MultiWidgets::TextWidgets" 
to the application's  main layer and assign IDs to them:

@snippet CSS3Background.js Init Loop

The positions, rotations, font configurations and backgrounds of the widgets
are defined in the @c styles.css. First we define general properties of @ref
MultiWidgets::TextWidget "TextWidget". We define two separate backgrounds
clipped into different regions of <a
href="http://www.w3.org/TR/CSS2/box.html">box</a>.  We also resize the widgets
to be exactly the size of the displayed text:

@snippet styles.css General

When the object is grabbed we want to make it transparent. For this
we use Cornerstone built-in pseudo-state @c active. Custom pseudo-states 
are supported with functions 
@ref Stylish::Styleable::setPseudoClass "Stylish::Styleable::setPseudoClass"
and 
@ref Stylish::Styleable::pseudoClass "Stylish::Styleable::pseudoClass".

@snippet styles.css Pseudo state

Some of the general properties of widgets are overriden 
with the id selectors. Also the texts of the widgets are specified here.

@snippet styles.css Id2 properties

Background image can be removed by using specifier @c none.

@snippet styles.css Id3 properties

Also the repeating pattern of background images can be overriden.

@snippet styles.css Id4 properties

The full source code is shown below:

@c styles.css :
@include styles.css

@c CSS3Background.js :
*/

/// [Set stylesheet]
$.app.addStyleFilename("styles.css");
/// [Set stylesheet]

/// [Init Loop]
for(var i = 1; i <= 5; ++i) {
  var text = new MultiWidgets.TextWidget();
  text.setCSSId("w"+i);
  $.app.mainLayer().addChild(text);
}
/// [Init Loop]

/* 
 * Example of Alternative Way to Add TextWidgets with limited or no use of CSS file.
 */
	var root = $.app.mainLayer(); 
	var w6 = new MultiWidgets.TextWidget();
	w6.setCSSId("w6"); // setCSSId() is necessary if you would like to make modifications through CSS

	w6.setWidth(650); //width of text
	w6.setHeight(60); //height of text
	w6.setLocation((root.width()*0.33), 50); //setLocation(x coordinate,y coordinate);
	w6.setBackgroundColor(1,1,1,0.5);
	w6.setFontSize(50);
	w6.setText("TextWidget without CSS file");
	w6.setStrokeWidth(4);
	//w6.setFixed(); //controls if widget is moveable
	w6.setAllowRotation(true); //controls if widget can be rotated
	w6.setFontFamily(["Trebuchet MS", "Verdana"]);
	w6.setColor(0,1,1,1);
	w6.style.paddingleft="5px 10px 5px";
	root.addChild(w6); //equivalent of $.app.mainLayer().addChild(w6)


/* 
 * Adding (single) Images into Application
 */
var img = new MultiWidgets.ImageWidget();
if (img.load("MultiTaction.png")) {
	img.setLocation(root.width()*.33, root.height()*.25);
	img.addOperator(new MultiWidgets.StayInsideParentOperator()); //necessary if you don't want image to 'fall' off screen
	img.resizeToFit(new Nimble.SizeF(256, 256));
	//img.setAllowRotation(false); //controls if image can be rotated
	//img.setFixed(); //controls if image is moveable
	img.setCSSId("img1");
	root.addChild(img);
}

var img2 = new MultiWidgets.ImageWidget();
if (img2.load("boom.png")) {
	img2.setLocation(root.width()*.50, root.height()*.75);
	//img2.addOperator(new MultiWidgets.StayInsideParentOperator()); //necessary if you don't want image to 'fall' off screen
	img2.resizeToFit(new Nimble.SizeF(178, 179));
	//img2.setAllowRotation(false);
 	//img2.setFixed();
	img2.setCSSId("img2");
	root.addChild(img2);
}


// var img = new MultiWidgets.ImageWidget();
// if (img.load("image path")) {
// 	img.setLocation( x coordinate, y coordinate);
// 	img.addOperator(new MultiWidgets.StayInsideParentOperator()); //necessary if you don't want image to 'fall' off screen
// 	img.resizeToFit(new Nimble.SizeF( height, width ));
// 	img.setAllowRotation(false); //controls if image can be rotated
// 	img.setFixed(); //controls if image is moveable
// 	img.setCSSId("img1");
// 	root.addChild(img);
// }


/*
 * Adding a Video into Application
 */
var vid = new MultiWidgets.VideoWidget();
if (vid.load(".mp4 file")) {
	vid.resizeToFit(new Nimble.SizeF(400, 400));
	vid.setLocation(50, 50);
	//vid.setFixed();
	vid.displayControls(true); //controls if play/pause buttons appear
	vid.setAudioEnabled(true);
	vid.setPreviewPos(3, true); //sets preview image to 3 second spot in video
	vid.setCSSId("vid1");
	root.addChild(vid);
}

