import ProtocolRequest from './ProtocolRequest'

export default class AssetRequest extends ProtocolRequest{

    constructor(baseUrl, options){
        super(baseUrl)
        this._options = options
    }

    async execute(){
        let url = this.buildUrl(
            ['asset'], 
            this._options
        )
        return this.send(url)
    }

}