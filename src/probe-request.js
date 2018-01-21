import ProtocolRequest from './protocol-request.js'

export default class ProbeRequest extends ProtocolRequest {

    constructor(baseUrl, deviceName) {
        super(baseUrl)
        this._deviceName = deviceName
    }

    get deviceName() { return this._deviceName }
    set deviceName(value) { this._deviceName = value }

    async execute() {
        let url = this.buildUrl([this.deviceName])
        return this.send(url)
    }

}