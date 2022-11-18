class Meme
{
    #serveurRessourceUrl = undefined;
    id = undefined;
    imageId = -1;
    #image = undefined;
    fontSize = 10;
    fontWeight = "500";
    text = "";
    color = "#acacac";
    underline = false;
    italic = false;
    titre = "";
    x = 0;
    y = 7;
    w = 1024;
    h = 768;
    /**
     * 
     * @param {*} generiqueMeme 
     */
    constructor(serveurRessourceUrl = '/memes')
    {
        this.serveurRessourceUrl = serveurRessourceUrl;

    }
    renderSvg = () =>
    {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('height', "100%");
        svg.setAttribute('width', "100%");
        svg.setAttribute('viewBox', typeof this.image === 'object' && this.image.w && this.image.h ? `0 0 ${this.image.w} ${this.image.h}` : '0 0 1000 1000');

        // création de l'image 
        if (this.image && this.image.href)
        {
            const img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            img.setAttribute('x', 0);
            img.setAttribute('y', 0);
            img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/images/' + this.image.href);
            svg.append(img);
            // création de la viewbox
            // svg.setAttribute('viewBox',`0 0 ${this.w} ${this.h}`);
        }

        // création du texte
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', this.x);
        text.setAttribute('y', this.y);
        text.style.textDecoration = this.underline ? 'underline' : 'none';
        text.style.fontStyle = this.italic ? 'italic' : 'normal';
        text.style.fontWeight = this.fontWeight;
        text.style.fontSize = this.fontSize + 'px';
        text.style.fill = this.color;
        text.innerHTML = this.text;
        svg.append(text);

        return svg;
    }
    setImage = (imageId, imgList) =>
    {
        // vérification si l'id est bien un integer
        const imgIdConverted = Number(imageId);
        if (!Number.isInteger(imgIdConverted))
        {
            this.#image = undefined;
            this.imageId = -1;
            return;
        }
        this.#image = imgList.find(img => img.id === imgIdConverted);
        this.imageId = imgIdConverted;
    }
    save = () =>
    {

    }
}