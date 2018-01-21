import {default as ProtocolHeader} from './protocol-header'

export default class ErrorHeader extends ProtocolHeader{
    constructor(xmlElem){
        super(xmlElem)
     
        // Extract Error attributes
        this.bufferSize = Number(xmlElem.getAttribute('bufferSize'))
    }
}