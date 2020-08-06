import { LightningElement } from 'lwc'; 
import { track } from 'lwc'; 
import getFeeds from "@salesforce/apex/RequestProcessor.getFeeds";
export default class LwcMakeCallout extends LightningElement {
    @track receivedMessage = [];
    hasRendered = false;
   
    getFeeds() {
        getFeeds().then(response=>{
            this.receivedMessage = JSON.parse(response);
            for(var i = 0; i < this.receivedMessage.feed.length; i++){
                this.receivedMessage.feed[i].like = 0;
                this.receivedMessage.feed[i].comment = 0;
                this.receivedMessage.feed[i].share = 0;
            }
            console.log(this.receivedMessage);
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

    handleClick(event) {
       
        var id = parseInt(event.target.name);
        var label = event.target.label;
        
        if(label === "Like")
            this.receivedMessage.feed[id-1].like++;
        if(label === "Comment")
            this.receivedMessage.feed[id-1].comment++;
        if(label === "Share")
            this.receivedMessage.feed[id-1].share++;
        
    }
}
