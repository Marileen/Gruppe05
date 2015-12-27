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
    var responseTypeAware = 'responseType' in request;

    request.open('GET', url, true);
    if (responseTypeAware) {
        request.responseType = 'text';
    }
    request.setRequestHeader("Content-Type", "text");
    request.send();
    return request;
}