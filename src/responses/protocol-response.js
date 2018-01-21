export default class ProtocolResponse{
    constructor(xmlDoc){
        this.xmlDocument = xmlDoc
        this.documentType = xmlDoc.documentElement.tagName
        this.isError = false
    }

}




