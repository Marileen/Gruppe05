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
    console.log('init Profile');
    if (document.querySelector('#username-change')) {
        document.querySelector('#username-change').addEventListener('click', changeProfileData.bind(event, '.username-changed'));
    }
}

window.addEventListener('load', initProfile);
