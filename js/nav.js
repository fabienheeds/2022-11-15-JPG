/**
 * gestion de la navigation
 */
 function setNavbarEvent(){
    document.querySelector('#link-home').addEventListener('click',linkHome);
    document.querySelector('#link-thumbnail').addEventListener('click',linkthumbnail);
    document.querySelector('#link-create').addEventListener('click',linkCreate);
}

/**
 * // gestion des active de navbar
 * @param {object*} evt event déclencheur
 * @param {boolean} setActiveParentLi mettre le parent actif ou non
 */
function setActiveLinkInNavbar(evt, setActiveParentLi = true){
    console.log(evt);
    // suppression de la classe ".active" sur tout les lien de la navbar
    var toutLesLi = document.querySelectorAll('nav>.navbar li');
    toutLesLi.forEach(element => {
        element.classList.remove('active');
    });
    // ajout de la class ".active" sur le btn cliqué
    if(setActiveParentLi){
        evt.target.parentElement.classList.add('active');
    }
}

function linkHome(evt) {
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    console.log("fonction de retour à la home", evt);
    //
    setActiveLinkInNavbar(evt, false);
}

function linkCreate(evt) {
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    console.log("fonction de create", evt);
    document.getElementById("wrapper").innerHTML = "/vues/create.html";
    //
    setActiveLinkInNavbar(evt);
}

function linkthumbnail(evt) {
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    console.log("fonction de thumbnail", evt);
    //
    setActiveLinkInNavbar(evt);
}