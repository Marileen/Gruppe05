function makeAjaxPostRequest(url, data)
{
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(data);
    return request;
}

function makeAjaxGetRequest(url)
{
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send();
    return request;
}