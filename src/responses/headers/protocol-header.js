export default class ProtocolHeader{
    constructor(xmlElem){
        this.xmlElement = xmlElem

        if(!xmlElem || ! xmlElem.getAttribute) throw new Error('Header element not valid.')

        // Extract common attributes
        this.creationTime = Date.parse(xmlElem.getAttribute('creationTime'))
        this.sender = xmlElem.getAttribute('sender')
        this.instanceId = Number(xmlElem.getAttribute('instanceId'))
        this.version = xmlElem.getAttribute('version')
    }
}