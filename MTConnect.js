/*	MTConnect.js
 *	A simple module for retrieving MTConnect data.
 *	This is a quick-and-dirty module that may be expanded in the future.
 *
 *	Dependencies:
 *	jQuery	http://jquery.com/
 *
 *	Copyright © 2012 Phil Coltrane
 *	Released under the MIT license
 */


(function($){
	
	var methods = {
	
		/*	Returns the result of a /probe request.
		 *	options:
		 *		url:	The base URL of the MTConnect agent.
		 *	returns:	XML data returned by the agent, or null on failure.
		 */
		probe: function(options){
			var settings = $.extend({
				url: 'http://agent.mtconnect.org'
			}, options);
			
			var url = settings.url + '/probe';
			return $.MTConnect('fetch', url);
		},

		/*	Returns the result of a /current request.
		 *	options:
		 *		url:	The base URL of the MTConnect agent.
		 *		at:		Optional. A sequence number. The most current values on or before this sequence number will be provided.
		 *		path:	Optional. An XPath expression specifying the components and/or data items to include.
		 *		interval:	Reserved for future use.
		 *	returns: XML data returned by the agent, or null on failure.
		 */		
		current: function(options){
			var settings = $.extend({
				url: 'http://agent.mtconnect.org',
				at: null,
				interval: null,
				path: null
				//TODO: support interval parameter
			}, options);		
			
			var url = settings.url + '/current';
			
			var querystring = '';
			if( settings.at!==null ){
				querystring += 'at='+settings.at;
			}
			if( settings.path!==null ){
				querystring += 'path='+settings.path;
			}
			if( querystring.length>0 ){
				url += '?' + querystring;
			}
			
			return $.MTConnect('fetch', url);
		},
		
		/*	Returns the result of a /sample request.
		 *	options:
		 *		url:	The base URL of the MTConnect agent.
		 *		from:	Optional. The starting sequence number.
		 *		count:	Optional. The maximum number of data items to return.
		 *		path:	Optional. An XPath expression specifying the components and/or data items to include.
		 *		interval:	Reserved for future use.
		 *	returns: XML data returned by the agent, or null on failure.
		 */				
		sample: function(options){
			var settings = $.extend({
				url: 'http://agent.mtconnect.org',
				from: null,
				count: null,
				path: null,
				interval: null
				//TODO: support 'interval' parameter
			}, options);
			
			var url = settings.url + '/sample';
			var querystring = '';
			if( settings.from!==null ){
				querystring += 'from='+settings.from;
			}
			if( settings.count!==null ){
				querystring += 'count='+settings.count;
			}
			if( settings.path !==null ){
				querystring += 'path='+settings.path;
			}
			if( querystring.length>0 ){
				url += '?' + querystring;
			}
			
			return $.MTConnect('fetch', url);
		},
		
		/*	Returns the result of an /asset request.
		 *	options:
		 *		url:	The base URL of the MTConnect agent.
		 *	returns: XML data returned by the agent, or null on failure.
		 */		
		asset: function(options){
			var settings = $.extend({
				url: 'http://agent.mtconnect.org'
			}, options);
			
			var url = settings.url + '/asset';
			return $.MTConnect('fetch', url);
		},
		
		/*	Requests the given URL.
		 *	options:
		 *		url:	The URL to request.
		 *	returns: XML data returned by the agent, or null on failure.
		 */		
		fetch: function(url){
			var ret = null;
			$.ajax({
				url: url,
				async: false,
				success: function(data, textStatus, jqXHR){
					ret = data;
				},
				error: function(jqXHR, textStatus, errorThrown){
					$.error('Unable to fetch "' + url + '": ' + errorThrown);
					ret = null;
				}
			});
			
			return ret;		
		},
		
		/* Reads the next sequence number out of an MTConnectStreams document.
		 * data:	An MTConnectStreams XML document.
		 * returns:	The nextSequence number.
		 */
		 next: function(data){
			try{
				var header = $(data).find('Header').attr('nextSequence');
				return $.isNumeric(header) ? header : null;
			}
			catch(e){
				return null;
			}
		 }
	};
	
	/*	Usage:
	 *		var probe = $.MTConnect('probe', {url:'http://agent.mtconnect.org'});
	 * 		var current = $.MTConnect('current', {url:'http://agent.mtconnect.org'});
	 *		var sample = $.MTConnect('sample', {url:'http://agent.mtconnect.org'});
	 *		var asset = $.MTConnect('asset', {url:'http://agent.mtconnect.org'});
	 *		var nextSequence = $.MTConnect('next', current);
	 */
	$.MTConnect = function(method){
	
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} 
		else if(typeof method === 'object' || ! method){
			return methods.probe.apply( this, arguments );
		}
		else{
			$.error('Method ' +  method + ' does not exist on jQuery.MTConnect');
		}
	};

})(jQuery);