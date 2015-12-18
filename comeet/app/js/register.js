/*
 *    perform a post request to url and send data (json)
 *
 * */

function initRegistration()
{

    console.log("Registration init");

    if (document.querySelector('#register')) {
        document.querySelector('#register').addEventListener('click', function (e)
        {
            e.preventDefault();

            //Formulardaten holen
            var data = "";
            var inputFields = document.querySelectorAll('[data-component="register"] input');
            Array.prototype.forEach.call(inputFields, function (elem)
            {
                data = data + elem.name + "=" + elem.value + "&";
            });

            console.log(data);

            //Formulardaten senden
            RegistrationRequest = makeAjaxPostRequest('new-user.php', data);


            RegistrationRequest.onreadystatechange = function ()
            { //Call a function when the state changes.

                if (RegistrationRequest.readyState == 4 && RegistrationRequest.status == 200)
                {

                    console.log(RegistrationRequest.responseText);

                    if (RegistrationRequest.responseText.indexOf('success') > -1)
                    {
                        console.log('neuer User eingefügt');
                        window.location.href = '05_profile.html';
                    }

                }
            }


        });
    }
}


window.addEventListener('load', initRegistration);
