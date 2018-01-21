import {default as AssetsResponse} from './assets-response'
import {default as DevicesResponse} from './devices-response'
import {default as ErrorResponse} from './error-response'
import {default as StreamsResponse} from './streams-response'

export default function CreateProtocolResponse(xmlDoc){
    if(!xmlDoc || !xmlDoc.documentElement || !xmlDoc.documentElement.tagName){
        throw new Error('Document is not a valid document.')
    }

    let documentTag = xmlDoc.documentElement.tagName

    if (documentTag === 'MTConnectDevices'){
        return new DevicesResponse(xmlDoc)
    }
    else if(documentTag === 'MTConnectStreams'){
        return new StreamsResponse(xmlDoc)
    }
    else if(documentTag === 'MTConnectAssets'){
        return new AssetsResponse(xmlDoc)
    }
    else if(documentTag === 'MTConnectError'){
        return new ErrorResponse(xmlDoc)
    }
    else{
        throw new Error('Document is not a recognized MTConnect document.')
    }
}
