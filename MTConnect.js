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
		if(params){
			url += '?'
			for(var i in params){
				url += i + '=' + params[i];
			}
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
	
	this.current = function(){
		var params = {};
		if(this.options.at) params.at = this.options.at;
		if(this.options.path) params.path = this.options.path;
		
		var url = createUrl(this.options, 'current', params);
		
		return fetchXmlDocumentFromUrl(url);
	};
	
	this.sample = function(){
		var params = {};
		if(this.options.from) params.from = this.options.from;
		if(this.options.path) params.path = this.options.path;
		if(this.options.count) params.count = this.options.count;
		
		var url = createUrl(this.options, 'sample', params);
		
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