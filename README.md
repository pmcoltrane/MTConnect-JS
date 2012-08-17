#MTConnect-JS

## Overview

This is a collection of Javascript and jQuery plugins related to MTConnect client-side development.
It is currently a work-in-progress: only a few very basic examples have been created.

## Contents

* MTConnect.js - a jQuery plugin for fetching data from an MTConnect agent.
* MTConnect.html - a demo page for the above.
* MTConnectMonitor.js - a jQuery plugin for displaying current status from an MTConnect agent.
* MTConnectMonitor.html - a demo page for the above.
* MTConnectHistory.html - history viewer, currently just a stub.
* proxy.php - a very simple proxy script in PHP.

## Usage

AJAX applications in a browser are limited by the same-origin policy. 
As a result, this application cannot request data from an MTConnect agent e.g. from another web server. 
There are two options (that I know of) for working around this limitation; both require intervention at the server-side.

### Option 1 - Proxy

Setup a proxy webserver. 
Proxy the MTConnect data from that server, and serve these Javascript applications from the same server.

### Option 2 - CORS

Configure the MTConnect Agent for CORS (cross-origin resource sharing. 
The MTConnect Agent will need to be set up to include an appropriate Access-Control-Allow-Origin HTTP header.
This tells the web browser to allow cross-domain AJAX requests, and the application will work normally. 

This method works only if you can control the headers sent by the MTConnect agent. 
Additionally, it is not supported by older browsers, including IE7 and below. 
IE8 and above support CORS, but not through the XmlHttpRequest object used by jQuery. 

## Further Information

Information about MTConnect, including standards documents, may be found at the [MTConnect Institute website](http://mtconnect.org).