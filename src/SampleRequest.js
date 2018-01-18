import ProtocolRequest from './ProtocolRequest.js'

export default class SampleRequest extends ProtocolRequest {

    constructor(baseUrl, options) {
        super(baseUrl)
        this._options = options || {}
    }

    get from() { return this._options.from }
    set from(value) { this._options.from = value }

    get count() { return this._options.count }
    set count(value) { this._options.count = value }

    get path() { return this._options.path }
    set path(value) { this._options.path = value }

    async execute() {
        let url = this.buildUrl(
            ['sample'],
            this._options
        )
        return this.send(url)
    }

}