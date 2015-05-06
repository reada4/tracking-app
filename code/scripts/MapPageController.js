/*
 *
 * Assignment 2 web app
 * 
 * Copyright (c) 2014-2015  Monash University
 *
 * Written by Michael Wybrow and Nathan Sherburn
 *
 * Original prototype by Xuhui Zhang
 *
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
*/


function MapPageController()
{
    // Save this so we can refer to public attributes and methods.
    var self = this;
    
    var overlayMap = null;
    var canvasOverlay = null;
    var canvas = null;
    var initialised = false;
    var options = {};
    
    // MapControllerDelegate object.
    this.delegate = null;

    // Default position to show prior to GPS lock. 
    var defaultLocation = [-37.9137408, 145.1313718];  // Monash Clayton bus loop.
    //var defaultLocation = [3.063277, 101.59982];       // Monash Sunway campus.

    
    // Initialise the page
    this.initialiseWithOptions = function(opts)
    {
        // Default options if not specified: {}.
        if (typeof(opts) === 'undefined') opts = {};

        options = opts;

        // Switch to the page.
        location.href = "#" + options.pageId;
        
        $("#" + options.pageId).on('pageshow', function(event, ui) {
            // Workaround a bug where the map canvas sometimes doesn't get
            // the correct height: Delay setup of map for a tenth of a second.
            setTimeout(initialiseRouteMap, 100);
        });
    };

    function initialiseRouteMap()
    {
        // If the new route map has not yet been created, create it.
        if (!overlayMap)
        {
            overlayMap = new MapWithOverlay(options.pageId + "-map", defaultLocation, drawOverlay);
        }
        else
        {
            // Centre on initialLocation
            overlayMap.panTo(defaultLocation);
        }

        if (self.delegate)
        {
            initialised = true;
            var controls = [];
            
            if (self.delegate.hasOwnProperty("mapPageInitialisedWithOptions") &&
                typeof(self.delegate.mapPageInitialisedWithOptions) == 'function')
            {
                self.delegate.mapPageInitialisedWithOptions(self, options);
            }
            else
            {
                console.log("mapPageInitialisedWithOptions() delegate method not defined.");
            }
            

            if (self.delegate.hasOwnProperty("mapPageButtonControls") &&
                typeof(self.delegate.mapPageButtonControls) == 'function')
            {
                controls = self.delegate.mapPageButtonControls();
                
                if ((typeof(controls) != 'object') || (controls.constructor !== Array))
                {
                    console.log("mapPageButtonControls() did not return an array.");
                    controls = [];
                }
        
                if (controls.length == 0)
                {
                    console.log("mapPageButtonControls(): Button description array is empty.");
                }
            }
            else
            {
                console.log("mapPageButtonControls() delegate method not defined.");
            }
            
            var controlsDiv = document.getElementById(options.pageId + "-controls");
            var controlsHTML = '<div data-role="controlgroup" data-type="horizontal" data-mini="true" class="group">';           
            for (var i  = 0; i < controls.length; ++i)
            {
                var control = controls[i];
                
                if (control.hasOwnProperty('title') == false)
                {
                    console.log("mapPageButtonControls: Button description at array index " +
                                i + " missing 'title' property.");
                }

                controlsHTML += '<input type="button" class="no-highlight" data-role="button" ';
                if (control.id)
                {
                    controlsHTML += 'id="' + control.id + '" ';
                }
                controlsHTML += 'value="' + control.title + '" onclick="' + options.instance + '.buttonTapped(' + i + ')">';
            }
            controlsHTML += '</div>';
            controlsDiv.innerHTML = controlsHTML;
            $("#" + options.pageId).enhanceWithin();
        }
    }

    function drawOverlay(overlay, params)
    {
        canvasOverlay = overlay
        canvas = params.canvas;
        
        self.repaintOverlay();
    }

    this.canvasPointFromLocation = function(latitude, longitude)
    {
        return canvasOverlay._map.latLngToContainerPoint([latitude, longitude]);
    };

    this.repaintOverlay = function()
    {
        context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (self.delegate && initialised)
        {
            if (self.delegate.hasOwnProperty("mapPageDrawOverlay") &&
                typeof(self.delegate.mapPageDrawOverlay) == 'function')
            {
                self.delegate.mapPageDrawOverlay(context);
            }
            else
            {
                console.log("mapPageDrawOverlay() delegate method not defined.");
            }
            
        }
    };

    this.buttonTapped = function(buttonIndex)
    {
        // Fix jquery mobile focus bug where focus gets stuck on buttons when disabled
        $.mobile.activePage.focus();


        if (self.delegate)
        {
            if (self.delegate.hasOwnProperty("mapPageButtonTapped") &&
                typeof(self.delegate.mapPageButtonTapped) == 'function')
            {
                self.delegate.mapPageButtonTapped(buttonIndex);
            }
            else
            {
                console.log("mapPageButtonTapped() delegate method not defined.");
            }
        }
    }
    
    this.done = function()
    {
        // Fix jquery mobile focus bug where focus gets stuck on buttons when disabled
        $.mobile.activePage.focus();

        var shouldReturnToRoutesList = true;
        if (self.delegate)
        {
            if (self.delegate.hasOwnProperty("mapPageShouldReturnFromDoneButtonTap") &&
                typeof(self.delegate.mapPageShouldReturnFromDoneButtonTap) == 'function')
            {
                shouldReturnToRoutesList = self.delegate.mapPageShouldReturnFromDoneButtonTap();
            }
            else
            {
                console.log("mapPageShouldReturnFromDoneButtonTap() delegate method not defined.");
            }
        }
        
        if (shouldReturnToRoutesList)
        {
            initialised = false;
            
            // show the history page (the first page) and hide the current page:
            location.href = "#routes-list-page";
            routesListPageController.refreshRouteList();
        }
    };

    this.panToLocation = function(latitude, longitude)
    {
        overlayMap.panTo([latitude, longitude]);
    };

    this.getZoom = function ()
    {
        return overlayMap.getZoom();
    }

    self.displayMessage = function(message)
    {
        if (typeof(message) == 'number')
        {
            // If argument is a number, convert to a string.
            message = message.toString();
        }

        if (typeof(message) != 'string')
        {
            console.log("displayMessage: Argument is not a string.");
            return;
        }

        if (message.length == 0)
        {
            console.log("displayMessage: Given an empty string.");
            return;
        }

        $("#" + options.pageId).cftoaster({
            content: message
        });
    };
}

