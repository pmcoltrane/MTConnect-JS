import ProbeRequest from './probe-request'
import CurrentRequest from './current-request'
import SampleRequest from './sample-request'
import AssetRequest from './asset-request'

export default class Agent{

	constructor(baseUrl){
		this.baseUrl = baseUrl
		this.interval = 10000
	}

	async getProbe(deviceName){
		let request = new ProbeRequest(this.baseUrl, this.deviceName)
		return await request.execute()
	}

	async getCurrent(at, path){
		let request = new CurrentRequest(this.baseUrl, {at, path})
		return await request.execute()
	}

	async getSample(from, count, path){
		let request = new SampleRequest(this.baseUrl, {from, count, path})
		return await request.execute()
	}

	async getAsset(){
		let request = new AssetRequest(this.baseUrl)
		return await request.execute()
	}

	start(){
		// current
		// use this to queue up a loop of samples, based on net sequence
	}

	stop(){
		throw new Error('not implemented')
	}

	// TODO: emit events:
	// DevicesReceived
	// StreamsReceived
	// ErrorReceived

}