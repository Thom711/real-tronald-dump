const randomQuoteButton = document.querySelector('.getquote');
const quoteAbout = document.querySelector('#quoteabout');
const getQuoteAboutButton = document.querySelector('.getquoteabout');
const quoteBox = document.querySelector('.quotebox');

async function getData(apiUrl) {
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    };

    const data = await response.json();

    return await data;
};

const fillSelect = () => {
    const apiUrl = `https://www.tronalddump.io/tag`;

    getData(apiUrl).then((data) => {
        data._embedded.tag.forEach((tag) => {
            element = document.createElement('option');
            element.textContent = tag.value;
            element.value = tag.value;
            quoteAbout.appendChild(element);
        });
    }).catch((e) => console.log(e));
};

const getRandomQuote = () => {
    const apiUrl = `https://www.tronalddump.io/random/quote`;

    getData(apiUrl).then((data) => {
        const date = new Date(data.appeared_at).toDateString();

        const quote = `<p class="quote">${data.value}</p><p class="first">
        Appeared at: ${date}</p><p>Source: ${data._embedded.source[0].url}`;
    
        quoteBox.innerHTML = quote;
    }).catch((e) => console.log(e));;
};

const getRandomDigit = (minimum, maximum) => {
    let min = Math.ceil(minimum);
    let max = Math.floor(maximum);
    return Math.floor(Math.random() * (max - min) + min);
};

const getQuotesByTag = (tag) => {
    const apiUrl = `https://www.tronalddump.io/search/quote?tag=${tag}`;

    getData(apiUrl).then((data) => {
        const length = data._embedded.quotes.length;

        const digit = getRandomDigit(0, length - 1);

        let quote = data._embedded.quotes[digit];

        const date = new Date(quote.appeared_at).toDateString();

        quote = `<p class="quote">${quote.value}</p><p class="first">
        Appeared at: ${date}</p><p>Source: ${quote._embedded.source[0].url}`;

        quoteBox.innerHTML = quote;
    });
};

const showTaggedQuote = () => {
    getQuotesByTag(quoteAbout.value);    
};

randomQuoteButton.addEventListener('click', getRandomQuote);
getQuoteAboutButton.addEventListener('click', showTaggedQuote);

fillSelect();