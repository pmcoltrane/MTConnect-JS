import {default as AssetsHeader} from './headers/assets-header'
import {default as ProtocolResponse} from './protocol-response'

export default class AssetsResponse extends ProtocolResponse{
    constructor(xmlDoc){
        super(xmlDoc)

        let headerElem = xmlDoc.getElementsByTagName('Header')[0]
        this.header = new AssetsHeader(headerElem)
    }
}
