function Agent(options){
	
	this.options = $.extend({}, this.options, options);
	
}

Agent.dataItems = function(document){
	var $document = $(document);
	if($document.find('MTConnectDevices').length>0){
		return $document.find('DataItem');
	}
	else{
		return $document.find('Samples,Events,Condition').children();
	}
};

Agent.header = function(document, attribute){
	return $($(document).find('Header')).attr(attribute);
}

Agent.instanceId = function(document){
	return Agent.header(document, 'instanceId');
};

Agent.creationTime = function(document){
	return Agent.header(document, 'creationTime');
};

Agent.nextSequence = function(document){
	return Agent.header(document, 'nextSequence');
};

Agent.lastSequence = function(document){
	return Agent.header(document, 'lastSequence');
};

Agent.prototype = {

	options: {
		proxy: null,
		url: 'agent.mtconnect.org',
		interval: 1000,
		count: 5000
	},
	
	documents: {
		devices: null,
		streams: null,
		errors: null
	},
	
	// lookup of name/id -> element[]
	dataItems: {},

	// issues an async probe request that will raise a devices or an errors event on completion
	probe: function(options, callback){
		var me = this;
		var $me = $(this);
		var url;
		
		if(options && options.device)
			url = this.createUrl(options.device);
		else
			url = this.createUrl();
	
		$.ajax({
			type: 'GET',
			url: url,
			cache: false,
			timeout: 10000,
			dataType: 'xml',
			success: function(data, textStatus, jqXHR){
				var docRoot = $(data).children(':first')[0].nodeName;
				if(docRoot === 'MTConnectDevices'){
					me.documents.devices = data;
					$me.trigger('devices', data);
					if(callback) callback(null, data);
				}
				else{
					me.documents.errors = data;
					$me.trigger('errors', data);
					if(callback) callback(data, null);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				me.documents.errors = errorThrown;
				$me.trigger('errors', errorThrown);
				if(callback) callback(errorThrown, null);
			}
		});
		
		return me;
	},
	
	// issues an async current request that will raise a streams or an errors event on completion
	current: function(options, callback){
		var me = this;
		var $me = $(this);
		
		var params = {};
		if(options){
			if(options.at) params.at = options.at;
			if(options.path) params.path = options.path;
		}
		var url = this.createUrl('current', params);	
	
		$.ajax({
			type: 'GET',
			url: url,
			cache: false,
			timeout: 10000,
			dataType: 'xml',
			success: function(data, textStatus, jqXHR){
				var docRoot = $(data).children(':first')[0].nodeName;
				if(docRoot === 'MTConnectStreams'){
					me.documents.streams = data;
					$me.trigger('streams', data);
					if(callback) callback(null, data);
				}
				else{
					me.documents.errors = data;
					$me.trigger('errors', data);
					if(callback) callback(data, null);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				me.documents.errors = errorThrown;
				$me.trigger('errors', errorThrown);
				
				if(callback) callback(errorThrown, null);
			}
		});	
		
		return me;
	},
	
	// issues an async sample request that will raise a streams or an errors event on completion
	sample: function(options, callback){
		var me = this;
		var $me = $(this);
		
		var params = {};
		if(options){
			if(options.from) params.from = options.from;
			if(options.count) params.count = options.count;
			if(options.path) params.path = options.path;
		}
		var url = this.createUrl('sample', params);	
	
		$.ajax({
			type: 'GET',
			url: url,
			cache: false,
			timeout: 10000,
			dataType: 'xml',
			success: function(data, textStatus, jqXHR){
				var docRoot = $(data).children(':first')[0].nodeName;
				if(docRoot === 'MTConnectStreams'){
					me.documents.streams = data;
					$me.trigger('streams', data);
					if(callback) callback(null, data);
				}
				else{
					me.documents.errors = data;
					$me.trigger('errors', data);
					if(callback) callback(data, null);
				}
			},
			error: function(jqXHR, textStatus, errorThrown){
				me.documents.errors = errorThrown;
				$me.trigger('errors', errorThrown);
				
				if(callback) callback(errorThrown, null);
			}
		});		
		
		return me;
	},

	// begins automatic monitoring: probe, current, then samples periodically
	monitor: function(options){
		var me = this;
		var $me = $(this);
		
		var interval = (options && options.interval) ? options.interval : this.options.interval;
		var count = (options && options.count) ? options.count : 5000;
		
		this.probe(null, function(error, data){
			if(error) return;
			
			me.current(null, function(error, data){
				if(error) return;
				
				var nextSequence = Agent.nextSequence(data);
				var lastSequence = Agent.lastSequence(data);
				
				var mon = function(){
					me.sample({from: nextSequence, count:count}, function(error, data){
						nextSequence = Agent.nextSequence(data);
						lastSequence = Agent.lastSequence(data);
						
						if(lastSequence+1>=nextSequence){
							setTimeout(mon, interval);
						}
						else{
							mon();
						}
						
					});
				}
				
				mon(mon);
			});
		});
	},
	
	createUrl: function(resource, params){
		var ret = this.options.proxy ? this.options.proxy : '';
		
		ret += this.options.url.substring(0, 'http://'.length)=='http://' ? this.options.url : 'http://' + this.options.url;
		
		if(resource) ret += '/' + resource;
		
		if(params){
			var qs = [];
			for(var i in params){
				qs.push((i + '=' + encodeURIComponent(params[i])));
			}
			ret += '?' + qs.join('&');
		}
	
		if( !(ret.substring(0, 'http://'.length)=='http://') ) ret = 'http://' & ret;
		
		return ret;
	}

}


