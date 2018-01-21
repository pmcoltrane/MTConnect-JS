import {default as ProtocolHeader} from './protocol-header'

export default class AssetsHeader extends ProtocolHeader{
    constructor(xmlElem){
        super(xmlElem)

        // Extract Assets attributes
        this.assetBufferSize = Number(xmlElem.getAttribute('assetBufferSize'))
        this.assetCount = Number(xmlElem.getAttribute('assetCount'))
    }
}