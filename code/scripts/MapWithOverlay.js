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

function MapWithOverlay(mapElement, initialLatLong, drawingFunction)
{
    var self = this;

    var map = L.map(mapElement, {zoomControl: false}).setView(initialLatLong, 19);

    // Add the zoom control buttons to the top right of the page.
    new L.Control.Zoom({ position: 'topright' })
        .addTo(map);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        })
        .addTo(map);

    L.canvasOverlay()
        .drawing(drawingFunction)
        .addTo(map);

    // ----------------------
    //    Public methods
    // ----------------------
    
    // Converts logitude into tile positions based on the zoomLevel.
    // Explained here: http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Pseudo-code
    this.lonToTile = function (longitude)
    {
       return ((longitude + 180) / 360) * Math.pow(2, tileZoom);
    }

    // Converts latitude into tile positions based on the zoomLevel.
    // Explained here: http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Pseudo-code
    this.latToTile = function (latitude)
    {     
       return (1 - Math.log(Math.tan(latitude * Math.PI/180) + 1 / Math.cos(latitude * Math.PI/180)) / Math.PI) /2 * Math.pow(2, tileZoom);
    }
    
    return map;
}


function sameLocation(loc1, loc2)
{
    return (loc1.latitude == loc2.latitude && loc1.longitude == loc2.longitude);
}

// Check for an intersection between the line segments a1-----a2 and b1-----b2.
// Return the intersection location, or null.
function segmentsIntersectionPoint(point_a1, point_a2, point_b1, point_b2)
{   
    var Ax,Bx,Cx,Ay,By,Cy,d,e,f,num;
    var x1lo,x1hi,y1lo,y1hi;

    Ax = point_a2.longitude - point_a1.longitude;
    Bx = point_b1.longitude - point_b2.longitude;

    // Cheap X bound box test:
    if (Ax < 0)
    {
        x1lo = point_a2.longitude;
        x1hi = point_a1.longitude;
    }
    else
    {
        x1hi = point_a2.longitude;
        x1lo = point_a1.longitude;
    }
    
    if (Bx > 0)
    {
        if (x1hi < point_b2.longitude || point_b1.longitude < x1lo) return null;
    }
    else
    {
        if (x1hi < point_b1.longitude || point_b2.longitude < x1lo) return null;
    }

    Ay = point_a2.latitude - point_a1.latitude;
    By = point_b1.latitude - point_b2.latitude;

    // Cheap Y bound box test:
    if (Ay < 0)
    {
        y1lo = point_a2.latitude;
        y1hi = point_a1.latitude;
    }
    else
    {
        y1hi = point_a2.latitude;
        y1lo = point_a1.latitude;
    }
    
    if (By > 0)
    {
        if (y1hi < point_b2.latitude || point_b1.latitude < y1lo) return null;
    }
    else
    {
        if (y1hi < point_b1.latitude || point_b2.latitude < y1lo) return null;
    }

    Cx = point_a1.longitude - point_b1.longitude;
    Cy = point_a1.latitude - point_b1.latitude;
    // alpha numerator:
    d = By*Cx - Bx*Cy;
    // Both denominator:
    f = Ay*Bx - Ax*By;
    // alpha tests:
    if (f > 0)
    {
        if (d < 0 || d > f) return null;
    }
    else
    {
        if (d > 0 || d < f) return null;
    }

    // beta numerator:
    e = Ax*Cy - Ay*Cx;       
    // beta tests:
    if (f > 0)
    {
        if (e < 0 || e > f) return null;
    }
    else
    {
        if (e > 0 || e < f) return null;
    }

    // It is parallel if f value is 0:
    if (f == 0) return null;
    
    /**
         1------2
                |
                |
                3    Don't count as intersection
     */
    if(sameLocation(point_a1, point_b1)) return null;
    if(sameLocation(point_a1, point_b2)) return null;
    if(sameLocation(point_a2, point_b1)) return null;
    if(sameLocation(point_a2, point_b2)) return null;
    
    // Numerator:
    var num = d*Ax;
    // X-intersection:
    var intersectX = point_a1.longitude + (num) / f;

    num = d*Ay;
    // Y-Intersection:
    var intersectY = point_a1.latitude + (num) / f;

    var intersectionPoint = {latitude: intersectY, longitude: intersectX};
    return intersectionPoint;
}
