const REST_ADR = "http://localhost:5679"
export {REST_ADR as default};
// export de la constante pour la récupérer ailleurs via import (ex: nav.js)
   
//objet constant
// impossible à modifier/supprimer
export const CONFIG_DATA = Object.freeze({
    rest_adr: "http://localhost",
    rest_port: 5679,
});
// regex de routing
const REGEX_ROUTE = /^\/(creator|editor)(\/(?<memeid>[0-9]+))?/gm;