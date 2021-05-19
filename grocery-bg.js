browser.runtime.onMessage.addListener(notify);

function onStartedDownload(id) {
  console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
  console.log(`Download failed: ${error}`);
}

var downloadUrl = "https://www.pay-less.com/mypurchases/api/v1/receipt/details";

var request = {};
var str_json = JSON.stringify(request);

function notify(message) {
  console.log('check these receipts');
  console.log(message.receipts);
  receiptsObj = JSON.parse(message.receipts);
  console.log(receiptsObj);
  request = {enhancedReceiptRequests:[]};
  for(i = 0; i < receiptsObj.length; i++){
    receiptsObj[i].receiptId.shoppingContextDivision = receiptsObj[i].receiptId.divisionNumber;
    receiptsObj[i].receiptId.shoppingContextStore = receiptsObj[i].receiptId.storeNumber;
    request.enhancedReceiptRequests.push(receiptsObj[i].receiptId);
    if(request.enhancedReceiptRequests.length % 5 === 0){
      //this logic is garbage and missing some of the receipts. todo: write in batches to indexeddb, later (on-request/demand) export indexeddb contents to downloaded json file
      console.log(request);
      str_json = JSON.stringify(request);

      var downloading = browser.downloads.download({
        url : downloadUrl,
        filename : 'order-details.json',
        body: str_json,
        headers: [{name:"Content-Type",value:"application/json"}],
        conflictAction : 'uniquify',
        method: "POST"
      });
      console.log(str_json);
      downloading.then(onStartedDownload, onFailed);
      request = {enhancedReceiptRequests:[]};
    }
  }
}
