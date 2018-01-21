import {default as ProtocolHeader} from './protocol-header'

export default class StreamsHeader extends ProtocolHeader{
    constructor(xmlElem){
        super(xmlElem)

        // Extract Streams attributes
        this.bufferSize = Number(xmlElem.getAttribute('bufferSize'))
        this.nextSequence = Number(xmlElem.getAttribute('nextSequence'))
        this.firstSequence = Number(xmlElem.getAttribute('firstSequence'))
        this.lastSequence = Number(xmlElem.getAttribute('lastSequence'))

    }
}