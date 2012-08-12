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
		 *		at:		Reserved for future use.
		 *		path:	Reserved for future use.
		 *		interval:	Reserved for future use.
		 *	returns: XML data returned by the agent, or null on failure.
		 */		
		current: function(options){
			var settings = $.extend({
				url: 'http://agent.mtconnect.org',
				at: null,
				interval: null,
				path: null
				//TODO: support 'at', 'path', interval parameters
			}, options);		
			
			var url = settings.url + '/current';
			return $.MTConnect('fetch', url);
		},
		
		/*	Returns the result of a /sample request.
		 *	options:
		 *		url:	The base URL of the MTConnect agent.
		 *		from:	Reserved for future use.
		 *		count:	Reserved for future use.
		 *		path:	Reserved for future use.
		 *	returns: XML data returned by the agent, or null on failure.
		 */				
		sample: function(options){
			var settings = $.extend({
				url: 'http://agent.mtconnect.org'
				//TODO: support 'from', 'count', 'path' parameters
			}, options);
			
			var url = settings.url + '/sample';
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
		}
	};
	
	/*	Usage:
	 *		var probe = $.MTConnect('probe', {url:'http://agent.mtconnect.org'});
	 * 		var current = $.MTConnect('current', {url:'http://agent.mtconnect.org'});
	 *		var sample = $.MTConnect('sample', {url:'http://agent.mtconnect.org'});
	 *		var asset = $.MTConnect('asset', {url:'http://agent.mtconnect.org'});
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