// WARNING: other projects also depends on this file for quotes
// T24

async function quoteDownload(url) {
    let response = await fetch(url || '/quotes/quotes.tsv');
    if (!response.ok)
        response = await fetch('https://LukeNK.github.io/quotes/quotes.tsv');
    const data = await response.text();
    return data
}

function quoteParse(data) {
    const lines = data.split('\n');
    const quotes = lines.map(line => {
        line = line.replaceAll('_', '\n');
        let [ author, quoteEN, quoteFR ] = line.split('\t');
        return { author, quoteEN, quoteFR };
    });
    return quotes.slice(1);
}

function quoteFlat(data) {
    let quotes = data.flatMap(e => [
        { author: e.author, quote: e.quoteEN },
        { author: e.author, quote: e.quoteFR }
    ]);
    quotes = quotes.filter(e => e.quote);
    return quotes;
}