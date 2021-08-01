// TODO: Modify this function

// convert Decimal to base64
function string10to64(num) {
  var order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  var base = order.length;
  var str = "", r;
  while (num) {
    r = num % base
    num -= r;
    num /= base;
    str = order.charAt(r) + str;
  }
  return str;
}
// convert base64 to Decimal
function string64to10(str) {
  var order = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
  var base = order.length;
  var num = 0, r;
  while (str.length) {
    r = order.indexOf(str.charAt(0));
    str = str.substr(1);
    num *= base;
    num += r;
  }
  return num;
}
// convert time to   format
function timetrans(date) {
  var Y = date.getFullYear().toString();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
  return Y + M + D ;
}

// append "0" to the start of the string if not enough numbers
function repeat(str, num) {
  if (num <= 0) {
    return "";
  } else {
    var newstr = "";
    for (var i = 0; i < num; i++) {
      newstr += str;
    }
    return newstr;
  }
}
// delete appended numbers
function repeatRecover(string) {
  for (var i = 0; i < string.length; i++) {
    if (string[i] === "0") {
      continue
    }
    var index = i;
    break
  }
  return parseInt(string.substring(index))
}

function generateShortCode(storeId, transactionId) {
  // Logic goes here
  var sId = (storeId.toString().length < 3 ? repeat("0",3-storeId.toString().length) + storeId.toString() : storeId.toString());
  var tId = (transactionId.toString().length < 4 ? repeat("0", 4 - transactionId.toString().length) + transactionId.toString() : transactionId.toString())
  var myDate = new Date();
  var date = timetrans(myDate)
  id = date + sId + tId
  ans = string10to64(id)
  return ans
}

// TODO: Modify this function
function decodeShortCode(shortCode) {
  // Logic goes here
  shortCode = string64to10(shortCode).toString()
  var date = shortCode.substring(0, 8);
  var sid = shortCode.substring(8, 11);
  var tid = shortCode.substring(11, 15);
  var nDate = new Date();
  nDate.setFullYear( date.substring(0, 4), repeatRecover(date.substring(4, 6))-1, repeatRecover(date.substring(6, 8)))
  return {
    storeId: repeatRecover(sid), // store id goes here,
    shopDate: nDate, // the date the customer shopped,
    transactionId: repeatRecover(tid) // transaction id goes here
  };
}

function clean(){
  document.getElementById("test-results").innerHTML="";
}
// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}