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

// Stores the user's recorded routes.
var Routes = [];

// Send user to the start page on refresh.
location.href = "#routes-list-page";

// Instantiate controllers.
var routesListPageController = new RoutesListPageController();
var newRoutePageController = new MapPageController();
var viewRoutePageController = new MapPageController();

// Setup our delegate to handle newRoute page.
var newRoutePageDelegate = new NewRoutePageControllerDelegate();
newRoutePageController.delegate = newRoutePageDelegate;

// Setup our delegate to handle viewRoute page.
var viewRoutePageDelegate = new ViewRoutePageControllerDelegate();
viewRoutePageController.delegate = viewRoutePageDelegate;

// Initialise start page.
routesListPageController.initialise();
