
// This file contains some delegate classes for you to extend.

function NewRoutePageControllerDelegate()

{

    //extracting geo location details

    navigator.geolocation.getCurrentPosition(function(position) {

  step1(position.coords.latitude, position.coords.longitude);

});

    // Save 'this' so we can refer to public attributes and methods.

    var self = this;

    //used for updating position as device moves

    var watchID = navigator.geolocation.watchPosition(function(position) {

 step1(position.coords.latitude, position.coords.longitude);

});

    //to add buttons to record and state starting location

    

var ButtonCam =

{  

title : "Start location",

onClick: "var CamHeight = prompt('Height of Camera from the Ground in Metres?')"

};


var ButtonApex =

{

title : "Apex(Top) Angle",

onClick: "measurementAppController.getBeta1()"

};


    // The MapPageController class controls the 'New Route' page.

    // This class provides a couple of useful methods:

    //     displayMessage(message):

    //         Causes a short message string to be displayed on the

    //         page for a brief period.  Useful for showing quick

    //         notifications to the user.

    //     panToLocation(latitude, longitude):

    //         Pans the map to the given latitude and longitude.

    //     repaintOverlay():

    //         Causes the map overlay to be redrawn, triggering a

    //         call to our mapPageDrawOverlay() method.  You might

    //         wish to call this when you update information that

    //         is displayed on the canvas overlay.

    //     canvasPointFromLocation(latitude, longitude):

    //         Given a latitude and longitude, returns the

    //         corresponding point on the canvas overlay.

    //         The return value is an object with an 'x' and a 'y'

    //         property.

    var newRoutePageController = null;

    // NOTE: You should not remove any of the five public methods below.

    // This method is called by the MapPageController when the user

    // has switched to the page and it has been intialised.

    this.mapPageInitialisedWithOptions = function(controller, options)

    {

        console.log("Record Route - mapPageInitialisedWithOptions");

        newRoutePageController = controller;        

    }

    // The MapPageController calls this when loading its page.

    // You should return an array of objects specifying buttons you

    // would like to display at the bottom of the map, e.g.,

    //    {

    //        title:   "Start",

    //        id:      "startButton",  (optional)

    //    }

    // Note: This doesn't support an "onClick" property like in

    // Assignment 1.

    this.mapPageButtonControls = function()

    {

        console.log("Record Route - mapPageButtonControls");

        return [];

    }

    // The MapPageController calls this when user taps on a button

    // specified by mapPageButtonControls().  The buttonIndex will

    // be the index of the button in the aray you returned.

    this.mapPageButtonTapped = function(buttonIndex)

    {

        console.log("Record Route - mapPageButtonTapped(" + buttonIndex + ")");

    }

    // The MapPageController calls this when the canvas needs to be

    // redrawn, such as due to the user panning or zooming the map.

    // It clears the canvas before calling this method.

    // 'context' is an HTML canvas element context.  This is a

    // transparent layer that sits above the map and is redrawn

    // whenever the map is panned or zoomed. It can be used to

 // draw annotations on the map or display other information.

    this.mapPageDrawOverlay = function(context)

    {  

        console.log("Record Route - mapPageDrawOverlay");

    }

    

    // The MapPageController calls this to ask if it should return

    // back to the start screen of the app when the user taps the

    // done button.  If you are not letting the user return, you

    // should probably call displayMessage() to inform them why.

    this.mapPageShouldReturnFromDoneButtonTap = function()

    {

        console.log("Record Route - mapPageShouldReturnFromDoneButtonTap");

        // Let the user return.

        return true;

    }

}


function ViewRoutePageControllerDelegate()

{

    // Save 'this' so we can refer to public attributes and methods.

    var self = this;

    

    // The MapPageController class controls the 'View Route' page.

    // This class provides a couple of useful methods:

    //     displayMessage(message):

    //         Causes a short message string to be displayed on the

    //         page for a brief period.  Useful for showing quick

    //         notifications to the user.

    //     panToLocation(latitude, longitude):

    //         Pans the map to the given latitude and longitude.

    //     repaintOverlay():

    //         Causes the map overlay to be redrawn, triggering a

    //         call to our mapPageDrawOverlay() method.  You might

    //         wish to call this when you update information that

    //         is displayed on the canvas overlay.

    //     canvasPointFromLocation(latitude, longitude):

    //         Given a latitude and longitude, returns the

    //         corresponding point on the canvas overlay.

    //         The return value is an object with an 'x' and a 'y'

    //         property.

    var viewRoutePageController = null;

    

    // The originally recorded route being displayed by the viewRoute page.

    var originalRoute;

    // NOTE: You should not remove any of the five public methods below.

    

    // This method is called by the MapPageController when the user

    // has switched to the page and it has been intialised.  If the

    // MapPageController is displaying an existing route, then options

    // will contain a 'routeIndex' property which gives the index of

    // the selected route in the Routes array.

    this.mapPageInitialisedWithOptions = function(controller, options)

    {

        console.log("View Route - mapPageInitialisedWithOptions");

        viewRoutePageController = controller;

        originalRoute = Routes[options.routeIndex];

    }

    //newRoutePageController.panToLocation()

    //above line uses longitude and latitude arrangements from phone

    

    // The MapPageController calls this when loading its page.

    // You should return an array of objects specifying buttons you

    // would like to display at the bottom of the map, e.g.,

    //    {

    //        title:   "Start",

    //        id:      "startButton",  (optional)

    //    }

    // Note: This doesn't support an "onClick" property like in

    // Assignment 1.

    this.mapPageButtonControls = function()

    {

        console.log("View Route - mapPageButtonControls");

        return [];

    }

    

    // The MapPageController calls this when user taps on a button

    // specified by mapPageButtonControls().  The buttonIndex will

    // be the index of the button in the aray you returned.

    this.mapPageButtonTapped = function(buttonIndex)

    {

        console.log("View Route - mapPageButtonTapped(" + buttonIndex + ")");

    }

    // The MapPageController calls this when the canvas needs to be

    // redrawn, such as due to the user panning or zooming the map.

    // It clears the canvas before calling this method.

    // 'context' is an HTML canvas element context.  This is a

    // transparent layer that sits above the map and is redrawn

    // whenever the map is panned or zoomed. It can be used to

 // draw annotations on the map or display other information.

    this.mapPageDrawOverlay = function(context)

    {  

        console.log("View Route - mapPageDrawOverlay");

    }

    

    // The MapPageController calls this to ask if it should return

    // back to the start screen of the app when the user taps the

    // done button.  If you are not letting the user return, you

    // should probably call displayMessage() to inform them why.

    this.mapPageShouldReturnFromDoneButtonTap = function()

    {

        console.log("viewPage mapShouldReturnFromDoneButtonTap");

        return true;

    }

}