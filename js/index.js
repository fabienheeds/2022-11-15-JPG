var divJsIsLoaded = document.querySelector('#js-is-loaded');

console.log(divJsIsLoaded);

/**
 * Fonction de loader
 * @param {*} sdc 
 * @returns string une valuuuuuue
 * @returns int un chiffre
 * @TODO huuuuuu
 */
function loadJs(sdc)
{
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

loadJs()