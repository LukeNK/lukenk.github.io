// script to allow pages to build preview with English translation as default
// Static Wind code but to host on Github userpage
(async () => {
    // Fetch html-src to replace for preview
    for (elm of document.querySelectorAll("[html-src]")) {
        let res = await fetch(elm.getAttribute('html-src')).then(res => res.text());
        elm.innerHTML = res + elm.innerHTML; // do not over write file
    }

    // If page already has the translation, skip this setting translation
    try {
        // check if the language code is correct
        Intl.getCanonicalLocales(document.body.parentElement.lang);
        console.log('Page already has the proper language');
    } catch(err) {
        console.log('Translation existed');
        let data = document.body.outerHTML,
            config = await fetch('/Static-Wind/config.json')
                .then(res => res.json());

        // load default language
        let trans = await fetch(`./${config.languages[0]}.json`)
            .then(res => res.json());

        for (key of Object.keys(trans))
            data = data.replace(new RegExp(key, 'g'), trans[key]);
        document.body.outerHTML = data;
    }
})();