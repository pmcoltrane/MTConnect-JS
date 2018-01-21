import {default as DevicesHeader} from './headers/devices-header'
import {default as ProtocolResponse} from './protocol-response'

export default class DevicesResponse extends ProtocolResponse{
    constructor(xmlDoc){
        super(xmlDoc)

        let headerElem = xmlDoc.getElementsByTagName('Header')[0]
        this.header = new DevicesHeader(headerElem)
    }
}
