# MTConnect-JS

## Overview

MTConnect-JS is a library for accessing data from an MTConnect agent via Javascript in the browser.
If the library is not served from the same origin as the agent, the agent must allow CORS requests, or the browser will block requests.

(The library is being rewritten in modern Javascript, and to remove the JQuery dependencies. Some functionality may have changed or be unavailable during this process.)

## Installation

> git clone https://github.com/pmcoltrane/MTConnect-JS.git

## Build

> npm run build

NPM will run webpack, and create a `dist/bundle.js` that can be included in an HTML &lt;script&gt; tag.

## Usage

For usage, see the examples under the `example` folder.

## Further Information

Information about MTConnect, including standards documents, may be found at the [MTConnect Institute website](http://mtconnect.org).
