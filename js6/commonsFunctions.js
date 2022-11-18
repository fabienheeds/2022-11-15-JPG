/**
 * 
 * @param {string} pageHref 
 * @param {function} callback function pour l'ajout des eventslistener
 * @returns {Promise<Element>} assemble elements loaded in a div element container
 */
function loadPageByPromise(pageHref, callback)
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
                // on créé un div avec le contenu qu'on veux afficher
                var container = document.createElement('div');
                container.innerHTML = html;
                //
                return container;
            }
        )
}