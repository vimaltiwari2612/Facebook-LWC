import { LightningElement } from 'lwc'; 
import getFeeds from "@salesforce/apex/RequestProcessor.getFeeds";
export default class LwcMakeCallout extends LightningElement {
    receivedMessage = [];
    hasRendered = false;
    
    getFeeds() {
        getFeeds().then(response=>{
            this.receivedMessage = JSON.parse(response);
        }).catch(error=>{
            console.error(error);
        })
    }

    renderedCallback() {
        if(this.hasRendered == false) {
            this.getFeeds();
            this.hasRendered = true;
        }
    }
}