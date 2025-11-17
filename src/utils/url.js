const urlToParamObject = (url) => {
    const currentUrl = new URL(url);
    const newSearchParams = new URLSearchParams(currentUrl.search);
    return Object.fromEntries(newSearchParams);
};

export default urlToParamObject