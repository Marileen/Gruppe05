/*
 *    perform a post request to url and send data (json)
 *
 * */

function makeAjaxPostRequest (url, data) {
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //request.send('name=' + data.name);
    request.send(data);
    return request;
}


function initRegistration ()
{
    
    console.log("Registration init");

    if (document.querySelector('#register')) {
        document.querySelector('#register').addEventListener('click', function (e)
        {
            //Formulardaten holen
            var data ="";
            var inputFields = document.querySelectorAll('[data-component="register"] input');
            Array.prototype.forEach.call(inputFields, function (elem) {
                data = data + elem.name + "=" + elem.value + "&";
            });

            console.log(data);

            //Formulardaten senden
            RegistrationRequest = makeAjaxPostRequest('new-user.php', data);

            RegistrationRequest.onreadystatechange = function()
            { //Call a function when the state changes.
                console.log('readystate has changed');
                if (RegistrationRequest.readyState == 4 && RegistrationRequest.status == 200) {

                    console.log("respsonse " + RegistrationRequest.response);
                    console.log("response text: " + RegistrationRequest.responseText);
                    //document.querySelector('.Rechnung .inner').innerHTML = RegistrationRequest.responseText;

                }
            }

            e.preventDefault();
        });
    }
}


window.addEventListener('load', initRegistration);
