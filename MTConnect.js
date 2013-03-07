var MTConnect = function(options){
	this.options = $.extend({
		agent: 'http://agent.mtconnect.org',
		proxy: null
	}, options);
	
	// Private functionality
	var createUrl = function(options, resource, params){
		var url = '';
		
		// Create url, with proxy if provided
		if(options.proxy) url += options.proxy;
		url += options.agent;
		
		// Append resource name
		if(resource) url += '/' + resource;
		
		// If we have any parameters, add those to the querystring
		var qs = []
		if(params){
			url += '?'
			for(var i in params){
				qs.push(i + '=' + params[i]);
			}
			url += qs.join('&');
		}

		return url;
	};
	
	var fetchXmlDocumentFromUrl = function(url){
		return $.ajax({
			type: 'GET',
			url: url,
			async: false,
			cache: false,
			dataType: 'xml'
		}).responseText;
	};
	
	// Public interface
	this.probe = function(){
		var url = createUrl(this.options);
		return fetchXmlDocumentFromUrl(url);
	};
	
	this.current = function(options){
		var params = {};
		options = $.extend({}, this.options, options);
		if(options.at) params.at = options.at;
		if(options.path) params.path = options.path;
		
		var url = createUrl(options, 'current', params);
		
		return fetchXmlDocumentFromUrl(url);
	};
	
	this.sample = function(options){
		var params = {};
		options = $.extend({}, this.options, options);
		if(options.from) params.from = options.from;
		if(options.path) params.path = options.path;
		if(options.count) params.count = options.count;
		
		var url = createUrl(options, 'sample', params);
		
		return fetchXmlDocumentFromUrl(url);
	};
	
};

MTConnect.devices = function(doc){
	return $(doc).find('Device');
};

MTConnect.header = function(doc){
	return $(doc).find('Header');
};

MTConnect.dataItems = function(doc){
	var $doc = $(doc);
	if($doc.filter('MTConnectDevices').length>0){
		return $doc.find('DataItem');
	}
	else{
		return $doc.find('Samples,Events,Condition').children();
	}
};