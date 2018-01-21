import {default as StreamsHeader} from './headers/streams-header'
import {default as ProtocolResponse} from './protocol-response'

export default class StreamsResponse extends ProtocolResponse{
    constructor(xmlDoc){
        super(xmlDoc)

        let headerElem = xmlDoc.getElementsByTagName('Header')[0]
        this.header = new StreamsHeader(headerElem)
    }
}
