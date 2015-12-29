/*
 *    Formular Validation
 *    - check if pw and email repeat values are correct
 *    - check if Geburtstag don't exceeds 50 chars
 * */
function checkFields() {

    //check if pw and email repeat values are correct and Geburtstag don't exceeds 50 chars

    var isValidEmail = false;
    var isValidPassword = false;
    var isValidBirthdate = false;

    if (document.getElementById('password').value.toLowerCase() == document.getElementById('passwordRepeat').value.toLowerCase())
    {
        isValidPassword = true;
    }
    if (document.getElementById('email').value.toLowerCase() == document.getElementById('emailRepeat').value.toLowerCase())
    {
        isValidEmail = true;
    }
    if (document.getElementById('bday').value.length < 51)
    {
        isValidBirthdate = true;
    }

    console.log("pw: " +isValidPassword);
    console.log("mail: " +isValidEmail);
    console.log("bday: " +isValidBirthdate);

    return isValidPassword && isValidEmail && isValidBirthdate;

};

/*
 *    Neuen User registrieren
 *
 * */
function registerUser () {

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
}

/*
 *    Init Registration Component
 *
 * */
function initRegistration()
{

    console.log("Registration init");

    if (document.querySelector('#register')) {
        document.querySelector('#register').addEventListener('click', function (e)
        {
            e.preventDefault();

            if (checkFields())
            {
                registerUser();
            } else
            {
                //meldung anzeigen
                document.querySelector('.errormessage').classList.add('show');
            }

        });
    }
}


window.addEventListener('load', initRegistration);
