// import des cariable dans le fichier 'constantes.js récupéré via export (ex:constantes.js)
// avec gestion d'un alias
import REST_ADR from "./constantes.js";
//
// importer tout et renomer
// import * as CONST from "./constante.js";

// importer sans la gestion des modules
import './globalesvars.js'

export const initRoutes = (evt) =>
{
    const locationPath = location.pathname;
    if (locationPath.startsWith('thumbnail'))
    {
        linkthumbnail(evt);
    } else if (locationPath.startsWith('/creator'))
    {
        linkCreate(evt);
    } else
    {
        linkHome(evt);
    }
}

/**
 * gestion de la navigation
 */
export function setNavbarEvent()
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
    // console.log(evt);
    // suppression de la classe ".active" sur tout les lien de la navbar
    var toutLesLi = document.querySelectorAll('nav>.navbar li');
    toutLesLi.forEach(element =>
    {
        element.classList.remove('active');
    });
    // ajout de la class ".active" sur le btn cliqué
    // en fonction du routing et non sur quel btn on a cliqué (evt)
    // ça gère le liens direct dans l'url du navigateur
    // ex: http://localhost:3000/creator/
    if (setActiveParentLi)
    {
        // evt.target.parentElement.classList.add('active');
        const locationPath = location.pathname;
        if (locationPath.startsWith('thumbnail'))
        {
            document.querySelector('nav #link-thumb').parentElement.classList.add('active');
        }
        else if (locationPath.startsWith('/creator'))
        {
            document.querySelector('nav #link-create').parentElement.classList.add('active');
        }
    }
}

function linkHome(evt)
{
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    // Routing
    history.pushState('', 'Home', '/');
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
    // Routing
    history.pushState('', 'meme thumb', '/thumbnail/');
    //
    setActiveLinkInNavbar(evt);
    //
    // FETCH / PROMISE
    //
    // récupération de l'url via une constante
    // `${REST_ADR}/images`
    // Définition de 2 promises
    const primages = fetch(`${REST_ADR}/images`).then(r => r.json());

    const primemes = fetch(`${REST_ADR}/memes`).then(r => r.json())

    // synchro d'exécution des then de promise de 2 promises
    Promise.all([primages, primemes])
        .then(arr =>
        {
            window.images = arr[0];
            window.memes = arr[1];
            //;
            loadPage('thumbnail.html', container =>
            {
                //récup du model présent dans la vue
                var memeModelNode = container.querySelector('#meme-');
                // suppr. du model vide
                memeModelNode.remove();
                //
                window.memes.forEach(meme =>
                {
                    // creation d'un doublon du noeud de model
                    const memeNode = memeModelNode.cloneNode(true);
                    // mise en place de l'id dynamique sur le clone
                    memeNode.id = `meme-${meme.id}`;
                    // récupération de l'image
                    const imageDuMeme = window.images.find(img => img.id === meme.imageId);
                    memeNode.querySelector('svg').setAttribute('cursor', 'pointer');
                    // mise à jour du xlink:href
                    const image = memeNode.querySelector('image');
                    image.setAttribute('xlink:href', '/images/' + imageDuMeme.href);
                    image.setAttribute('w', imageDuMeme.w);
                    image.setAttribute('h', imageDuMeme.h);
                    //
                    const text = memeNode.querySelector('text');
                    // mise à jour du text
                    text.innerHTML = imageDuMeme.titre;
                    // mise à jour du style
                    text.style.textDecoration = meme.underline ? 'underline' : 'none';
                    text.style.fontStyle = meme.italic ? 'italic' : 'normal';
                    text.style.fontWeight = meme.fontWeight;
                    text.style.fontSize = meme.fontSize + 'px';
                    text.style.fill = meme.color;
                    //
                    // Gestion du lien sur l'image
                    //
                    memeNode.querySelector('svg').addEventListener('click', (evt) =>
                    {
                        linkCreate(evt, meme.id);
                    })
                    //
                    memeNode.querySelector('svg').setAttribute('viewBox', '0 0 ' + imageDuMeme.w + ' ' + imageDuMeme.h);
                    // ajout du clone dans le container
                    container.querySelector('#thumbnail').append(memeNode);

                    // gestion du meme
                })
            });
        })
}

function linkCreate(evt, memeid)
{
    // échapement du comportement par défaut
    // ici une ouverture de lien vers le href
    evt.preventDefault();
    // Routing
    history.pushState('', 'meme creator', undefined !== memeid ? `/creator/${memeid}` : '/creator/');
    //
    console.log("fonction de create", evt);
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