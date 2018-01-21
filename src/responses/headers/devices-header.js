import {default as ProtocolHeader} from './protocol-header'

export default class DevicesHeader extends ProtocolHeader{
    constructor(xmlElem){
        super(xmlElem)

        // Extract Devices attributes
        this.assetBufferSize = Number(xmlElem.getAttribute('assetBufferSize'))
        this.assetCount = Number(xmlElem.getAttribute('assetCount'))
        this.bufferSize = Number(xmlElem.getAttribute('bufferSize'))

    }
}