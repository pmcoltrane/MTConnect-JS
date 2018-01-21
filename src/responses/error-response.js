import {default as ErrorHeader} from './headers/error-header'
import {default as ProtocolResponse} from './protocol-response'

export default class ErrorResponse extends ProtocolResponse{
    constructor(xmlDoc){
        super(xmlDoc)

        let headerElem = xmlDoc.getElementsByTagName('Header')[0]
        this.header = new ErrorHeader(headerElem)
    }
}