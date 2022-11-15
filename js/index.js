

/**
 * Fonction de loader
 * @param {*} sdc 
 * @returns {string} value une valuuuuuue
 * @returns int un chiffre
 * @TODO huuuuuu
 */
function loadJs(sdc)
{
    var divJsIsLoaded = document.querySelector('#js-is-loaded');

    console.log(divJsIsLoaded);
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

}


// écouteur sur la fin du chargement du DOM
// quand la page est chargé, on lance la fontion loadJs()
document.addEventListener('DOMContentLoaded', loadJs);