console.log('grocery export hello world');
var request = {};
var str_json = JSON.stringify(request);

console.log('grocery export request prepared');

//logging purposes only
var xhr = new XMLHttpRequest();
xhr.open("POST", 'https://www.pay-less.com/mypurchases/api/v1/receipt/details', true);
//Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/json");
console.log('grocery export headers prepared');
xhr.onreadystatechange = function() { // Call a function when the state changes
    console.log('grocery request attempted');
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
	console.log('pay-less request sent and received');
	console.log(this.responseText);
    }
}
console.log('grocery sending ajax request');
xhr.send(str_json);

//meat and potatoes
var receiptsUrl = "https://www.pay-less.com/mypurchases/api/v1/receipt/summary/by-user-id";

var xhr = new XMLHttpRequest();
xhr.open("GET", receiptsUrl, true);
//Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/json");
console.log('grocery export headers prepared');
xhr.onreadystatechange = function() { // Call a function when the state changes
    console.log('grocery request attempted');
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        console.log('pay-less request sent and received');
	browser.runtime.sendMessage({"receipts":this.responseText});
        console.log(this.responseText);
    }
}
console.log('grocery sending ajax request');
xhr.send();
