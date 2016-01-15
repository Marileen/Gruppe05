
function makeAjaxPostRequest(url, data)
{
    var request = new XMLHttpRequest();

    request.open('POST', url, true);

    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);
    return request;

};

function makeAjaxGetRequest(url)
{
    var request = new XMLHttpRequest();
    var responseTypeAware = 'responseType' in request;

    request.open('GET', url, true);
    if (responseTypeAware) {
        request.responseType = 'text';
    }
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
    return request;
};

var QueryString = function () {  //use: QueryString.id
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

function getEventData (success)
{
    //Event Daten holen anhand der Event ID
    eventID = 'id=' + QueryString.id;

    eventRequest = makeAjaxPostRequest('event-detail.php', eventID);

    eventRequest.onreadystatechange = function ()
    { //Call a function when the state changes.


        if (eventRequest.readyState == 4 && eventRequest.status == 200) {
            console.log("Response Event Daten: " + eventRequest.responseText);

            var entries = {};

            entries = JSON.parse(eventRequest.responseText);

            //return entries;
            success(entries);
        }


    }
}