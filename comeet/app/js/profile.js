
/*
 * Es wird ein post request abgeschickt
 * und wenn der erfolgreich war eine meldung eingeblendet
 * das geschieht über das setzen einer css klasse
 *
 * **/
function changeUsername (event)
{
    event.preventDefault();
    document.querySelector('.username-changed').classList.add('show');
}

function initProfile ()
{
    document.querySelector('#username-change').addEventListener('click', changeUsername.bind(event));
}

window.onload=initProfile;