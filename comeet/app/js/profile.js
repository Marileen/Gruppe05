
/*
 * Es wird ein post request abgeschickt
 * und wenn der erfolgreich war eine meldung eingeblendet
 * das geschieht über das setzen einer css klasse
 *
 * **/
function changeProfileData (item, event)
{
    event.preventDefault();
    document.querySelector(item).classList.add('show');

    //console.log(event.target);
    //bei pw und email auch die Buttons verschieben:
    //if (event.target.id == 'email-change' || event.target.id == 'pw-change') {
        event.target.classList.add('confirm-change');
    //}
}

function initProfile ()
{
    document.querySelector('#username-change').addEventListener('click', changeProfileData.bind(null, '.username-changed', event));
    document.querySelector('#email-change').addEventListener('click', changeProfileData.bind(event, '.email-change'));
    document.querySelector('#pw-change').addEventListener('click', changeProfileData.bind(event, '.pw-change'));
}

window.onload=initProfile;