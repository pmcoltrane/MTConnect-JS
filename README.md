#MTConnect-JS

This repository is a work-in-progress collection of basic jQuery plugins related to MTConnect client development. At the moment, the implementation is very basic, and includes:

* MTConnect.js - a jQuery plugin for fetching data from an MTConnect agent.
* MTConnect.html - a demo page for the above.
* MTConnectMonitor.js - a jQuery plugin for displaying current status from an MTConnect agent.
* MTConnectMonitor.html - a demo page for the above.

Information about MTConnect, including standards documents, may be found at the [MTConnect Institute website](http://mtconnect.org). I am not affiliated with them.

Due to the same-origin policy, AJAX applications cannot access an MTConnect agent across domain boundaries. One of two things must be done:
1. These scripts must be served from the same domain as the MTConnect agent, OR;
2. The MTConnect agent must include an appropriate Access-Control-Allow-Origin HTTP header.
If neither of these conditions are met, the applications will not operate.