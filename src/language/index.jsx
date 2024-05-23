import resources from "./resources.jsx";
export const translate = (lang, key) => {
    var translation
    if (lang){
        translation = resources[lang][key];
    }
    else{
        translation = resources["en"][key];
    }
    return translation;
};

export const getLanguage = () => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; lng=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    else return "en";
};

