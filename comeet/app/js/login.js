/*
 * Es wird ein post request abgeschickt
 * und wenn der erfolgreich war eine meldung eingeblendet
 * das geschieht über das setzen einer css klasse
 *
 * **/

function userLogin (e) {

    e.preventDefault();

    //Formulardaten holen - username und pw
    var data = "";
    var inputFields = document.querySelectorAll('[data-component="header"] .login input');
    Array.prototype.forEach.call(inputFields, function (elem)
    {
        data = data + elem.name + "=" + elem.value + "&";
    });

    //GET User Data
    loginRequest = makeAjaxPostRequest('login.php', data);


    loginRequest.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (loginRequest.readyState == 4 && loginRequest.status == 200)
        {
            console.log(loginRequest.responseText);

            if (loginRequest.responseText.indexOf('success') > -1)
            {
                console.log('login ok');
                //console.log('todo -> redirect to events overview');
                window.location.href = '02_overview.html';
            }

        }
    }
}

function initLogin()
{
    console.log('1: init Login Component - you can login now!');
    if (document.querySelector('.component[data-component="header"] .login')) {
        console.log(document.querySelector('.component[data-component="header"] .login'));
        document.querySelector('.component[data-component="header"] .login a.button.login').addEventListener('click', userLogin);
    }
}

window.addEventListener('load', initLogin);
