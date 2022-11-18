import {initRoutes, setNavbarEvent} from "./nav.js";

/**
 * Fonction de loader
 * @param {*} sdc 
 * @returns {string} value une valuuuuuue
 * @returns int un chiffre
 * @TODO huuuuuu
 */
function loadJs(evt)
{
    var divJsIsLoaded = document.querySelector('#js-is-loaded');
    // gestion du style
    divJsIsLoaded.style.color = "white";
    divJsIsLoaded.style.backgroundColor = "green";
    divJsIsLoaded.style.fontSize = "25pt";
    divJsIsLoaded.style.textDecoration = "underline";
    divJsIsLoaded.style.border = "none";
    divJsIsLoaded.style.display = "flex";
    divJsIsLoaded.innerHTML = "notification JS";

    // supprime le noeud du DOM
    // mais la variable reste en mémoire
    divJsIsLoaded.remove();

    setNavbarEvent();
    //
    // initialisation du routing
    initRoutes(evt);
}

// écouteur sur la fin du chargement du DOM
// quand la page est chargé, on lance la fontion loadJs()
document.addEventListener('DOMContentLoaded', loadJs);