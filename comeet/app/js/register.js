/*
 *    perform a post request to url and send data (json)
 *
 * */

function makeAjaxPostRequest (url, data) {
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(data));

    return request;
}

//RechnungsRequest = makeAjaxPostRequest('/new-user.php', gerichteItems);
//
//RechnungsRequest.onreadystatechange = function() { //Call a function when the state changes.
//    if(RechnungsRequest.readyState == 4 && RechnungsRequest.status == 200) {
//
//        console.log("r " + RechnungsRequest.response);
//        console.log("r t: " + RechnungsRequest.responseText);
//        document.querySelector('.Rechnung .inner').innerHTML = RechnungsRequest.responseText;
//
//    }
//}


function initRegistration ()
{
    
    console.log("Registration init");
    
    if (document.querySelector('#register')) {
        document.querySelector('#register').addEventListener('click', function (e)
        {
            //Formulardaten

            e.preventDefault();
        });
    }
}


window.addEventListener('load', initRegistration);
