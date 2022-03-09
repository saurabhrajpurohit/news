export const BASE_URL = "https://newsapi.org/v2/everything?q=";

export const getData = (topic: string = "TechCrunch") => {
    return fetch(`${BASE_URL}${topic}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
        .then(response => response.json());
};

export const search = (searchString: string) => {
    return fetch(`${BASE_URL}${searchString}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`)
        .then(response => response.json());
}