import ProtocolRequest from './ProtocolRequest.js'

export default class CurrentRequest extends ProtocolRequest {

    constructor(baseUrl, options) {
        super(baseUrl)
        this._options = options || {}
    }

    get at() { return this._options.at }
    set at(value) { this._options.at = value }

    get path() { return this._options.path }
    set path(value) { this._options.path = value }

    async execute() {
        let url = this.buildUrl(
            ['current'],
            this._options
        )
        return this.send(url)
    }

}