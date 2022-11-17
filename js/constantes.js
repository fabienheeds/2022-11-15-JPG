const REST_ADR = "http://localhost:5679";
//objet constant
// impossible à modifier/supprimer
const CONFIG_DATA = Object.freeze({
    rest_adr: "http://localhost",
    rest_port: 5679,
});
// regex de routing
const REGEX_ROUTE = /^\/(creator|editor)(\/(?<memeid>[0-9]+))?/gm;