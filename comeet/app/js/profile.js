function getProfileData ()
{

    request = makeAjaxGetRequest('user-profiledata.php');

    request.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (request.readyState == 4 && request.status == 200) {
            var user = JSON.parse(request.responseText);
            console.log("userdaten geholt: " + request.responseText);
            console.log("userdaten geholt: " + user.email);

            document.querySelector('#email').value = user.email;
            document.querySelector('#username').value = user.name;
        }
    }

}

function changeEmail()
{

    event.preventDefault();
    document.querySelector('.errormessage.email').classList.remove('show');
    document.querySelector('.okmessage.email').classList.remove('show');

    var mail = document.querySelector('#email').value;
    var mailConf =  document.querySelector('#email_proof').value;

    if (mail == mailConf) {
        data = "email=" + mail;

        request = makeAjaxPostRequest('update-user.php', data);

        request.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (request.readyState == 4 && request.status == 200) {

                document.querySelector('.okmessage.email').classList.add('show');


            }
        }
    } else
    {
        document.querySelector('.errormessage.email').classList.add('show');
    }

};

function changePassword()
{

    event.preventDefault();
    document.querySelector('.errormessage.pw').classList.remove('show');
    document.querySelector('.okmessage.pw').classList.remove('show');


    var pw = document.querySelector('#password').value;
    var pwConfirm =  document.querySelector('#password_proof').value;

    if (pw == pwConfirm) {
        data = "password=" + pw;

        request = makeAjaxPostRequest('update-user.php', data);

        request.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (request.readyState == 4 && request.status == 200) {
                document.querySelector('.okmessage.pw').classList.add('show');

            }
        }
    } else
    {
        document.querySelector('.errormessage.pw').classList.add('show');
    }

};

function changeUsername(item, event)
{

    event.preventDefault();

    data = "username=" + document.querySelector('#username').value;

    request = makeAjaxPostRequest('update-user.php', data);

    request.onreadystatechange = function ()
    { //Call a function when the state changes.

        if (request.readyState == 4 && request.status == 200) {


            var newName = document.getElementsByClassName('newName')[0];
            var oldName = document.getElementById('username');

            document.querySelector(item).classList.add('show');

            //console.log(event.target);
            if (event.target.id == 'email-change' || event.target.id == 'pw-change') {
                event.target.classList.add('confirm-change');
            }
            copyMe(oldName, newName);

        }
    }

}
function copyMe (input, output)
{
      output.textContent = input.value;
}
function initProfile()
{
    console.log('5: init Profile Component');

    getProfileData();

    if (document.querySelector('#username-change')) {
        document.querySelector('#username-change').addEventListener('click', changeUsername.bind(event, '.username-changed'));
    }

    if (document.querySelector('#pw-change')) {
        document.querySelector('#pw-change').addEventListener('click', changePassword);
    }

    if (document.querySelector('#email-change')) {
        document.querySelector('#email-change').addEventListener('click', changeEmail);
    }

    if (document.querySelector('.component[data-component="profile"]')) {
        console.log('do an ajax get request for user data');

        //Formulardaten senden
        ProfileRequest = makeAjaxGetRequest('profile.php');


        ProfileRequest.onreadystatechange = function ()
        { //Call a function when the state changes.

            if (ProfileRequest.readyState == 4 && ProfileRequest.status == 200)
            {
                 console.log("Answer for Profile Request: " + ProfileRequest.responseText);

            }
        }
    }
}

window.addEventListener('load', initProfile);
