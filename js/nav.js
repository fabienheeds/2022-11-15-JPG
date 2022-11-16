/**
 * gestion de la navigation
 */
function setNavbarEvent()
{
    document.querySelector('#link-home').addEventListener('click', linkHome);
    document.querySelector('#link-thumbnail').addEventListener('click', linkthumbnail);
    document.querySelector('#link-create').addEventListener('click', linkCreate);
}

/**
 * // gestion des active de navbar
 * @param {object*} evt event déclencheur
 * @param {boolean} setActiveParentLi mettre le parent actif ou non
 */
function setActiveLinkInNavbar(evt, setActiveParentLi = true)
{
    console.log(evt);
    // suppression de la classe ".active" sur tout les lien de la navbar
    var toutLesLi = document.querySelectorAll('nav>.navbar li');
    toutLesLi.forEach(element =>
    {
        element.classList.remove('active');
    });
    // ajout de la class ".active" sur le btn cliqué
    if (setActiveParentLi)
    {
        evt.target.parentElement.classList.add('active');
    }
}

function linkHome(evt)
{
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    console.log("fonction de retour à la home", evt);
    //
    setActiveLinkInNavbar(evt, false);
    //
    loadPage('home.html');
}

function linkthumbnail(evt)
{
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    console.log("fonction de thumbnail", evt);
    //
    setActiveLinkInNavbar(evt);
    //
    loadPage('thumbnail.html');
}

function linkCreate(evt)
{
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    console.log("fonction de create", evt);
    document.getElementById("wrapper").innerHTML = "/vues/create.html";
    //
    setActiveLinkInNavbar(evt);
    //
    loadPage('create.html', (nodeBase) =>
    {
        // on récupère le param envoyé au callback
        // ici le div créé à la volée
        // la callback de l'appel
        var form = nodeBase.querySelector('form');
    });
}

/**
 * 
 * @param {String} pageHref 
 */
function loadPage(pageHref, callback)
{
    // nouvelle concatenation ES6
    var pagePath = `/vues/${pageHref}`;
    // requètage HTTP
    // et enchainement des promise (then)
    fetch(pagePath)
        // promise 1
        .then(
            function (resp)
            {
                return resp.text();
            }
        )
        // promise 2
        .then(
            function (html)
            {
                //
                // document.querySelector('#wrapper').innerHTML = html;
                // InnerHtml détruit le DOM, pas conseillé
                var wrapperNode = document.querySelector('#wrapper');
                // on vide le contenu de notre contenant final
                wrapperNode.innerHTML = "";
                // on créé un div avec le contenu qu'on veux afficher
                var container = document.createElement('div');
                container.innerHTML = html;
                //
                // gestion de la callback
                // ex: désactiver la gestion du FORM par défaut
                // on envoi le div  à la volée à la fonction callback
                //
                // ??? pourquoi undefined avant ?
                //
                if (typeof callback === 'function')
                {
                    // condition typée (!==)
                    // et vérifier si callback est une function
                    callback(container);
                }
                // on parse ce div et on ne récupère que l'intérieur (les différent enfants)
                // et on n'ajoute que les enfants dans notre contenant final
                container.childNodes.forEach(element =>
                {
                    wrapperNode.append(element);
                });
                return html;
            }
        )
        // promise 3
        // ???
        // ??? arrow function
        // ???
        .then(
            fromLast =>
            {
                console.log(`fromLast : ${this}`);
            }
        )
        ;
}