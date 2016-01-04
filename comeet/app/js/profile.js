/*
 * Es wird ein post request abgeschickt
 * und wenn der erfolgreich war eine meldung eingeblendet
 * das geschieht über das setzen einer css klasse
 *
 * **/
function changeProfileData(item, event)
{
    var newName = document.getElementsByClassName('newName')[0];
    var oldName = document.getElementById('username');
    event.preventDefault();
    document.querySelector(item).classList.add('show');

    //console.log(event.target);
    //bei pw und email auch die Buttons verschieben:
    if (event.target.id == 'email-change' || event.target.id == 'pw-change') {
        event.target.classList.add('confirm-change');
    }
    copyMe(oldName, newName);

}
function copyMe (input, output)
{
      output.textContent = input.value;
}
function initProfile()
{
    console.log('5: init Profile Component');
    if (document.querySelector('#username-change')) {
        document.querySelector('#username-change').addEventListener('click', changeProfileData.bind(event, '.username-changed'));
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
