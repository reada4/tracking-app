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

// TODO: Add ability to delete a saved route.


// RoutesListPageController Constructor
function RoutesListPageController ()
{
    // Save this so we can refer to public attributes and methods.
    var self = this;

    // Load browser's local storage data (HTML 5 feature)
    function loadLocalStorageData()
    {
        // The array to get all keys of local storage items:
        var keys = [];
        
        // Get all keys:
        for(var i=0; i < localStorage.length; i++)
        {
           keys.push(localStorage.key(i));
        }

        // Get all objects (routes) from local storage:
        for(var i=0; i < keys.length; i++)
        {
            var obj = localStorage.getItem(keys[i]);
            try
            {
                var route = JSON.parse(obj);
                if ((route.dateCreated !== undefined) && (route.locations !== undefined))
                {
                    // If this is a route object, then add it to the Routes list.
                    Routes.push(route);
                }
            }
            catch(e)
            {
                // Silently ignore items stored in local storage that aren't JSON.
            }
        }
        // It seems that the local storage specification does NOT enforce an ordering standard.
        // However, in Chrome, local storage is read back in alpha numeric order of the keys.
        // Example: 0's ... 1's ... a's then b's etc.)
        
        // This reverse method may be needed to keep the most recent routes at the top depending
        // on how the keys are defined by students.
        //Routes.reverse();
        
        // Refresh the list of previously collected routes
        self.refreshRouteList();
    }

    // PUBLIC METHODS

    this.initialise = function ()
    {    
        // Load browser's local storage data (HTML 5 feature)
        loadLocalStorageData();
        
        // Hide the jQuery mobile loading spinner if it's displayed.
        $.mobile.loading("hide");
    }

    // Refresh the list of previously collected routes
    this.refreshRouteList = function ()
    {
        // Remove previous routes from list
        $( "#results-list" ).empty();

        if (Routes.length > 0)
        {

            // Add routes to list.
            for (var i = Routes.length - 1; i >= 0; --i)
            {
                $( "#results-list" ).append(
                    "<li onclick='viewRoutePageController.initialiseWithOptions({" +
                        "instance: \"viewRoutePageController\"," +
                        "pageId: \"view-route-page\"," +
                        "routeIndex: " + i + 
                    "})'><a href=''>" + Routes[i].dateCreated + "</a></li>");
            }

            // Add header to exiting routes list if there are any.
            $( "#results-list" ).prepend("<li data-role=\"list-divider\">Saved routes:</li>");
        }
        
        // Row to record a new route.
        $( "#results-list" ).prepend("<li onclick='newRoutePageController.initialiseWithOptions({" +
            "instance: \"newRoutePageController\"," +
            "pageId: \"new-route-page\"" +
        "})'><a href=''>Record new route</a></li>");

        // Refresh list to add css styling or create list if does not yet exist
        if ( $('#results-list').hasClass('ui-listview'))
        {
            $('#results-list').listview('refresh');
        } 
        else
        {
            $('#results-list').trigger('create');
        }
    };

};
