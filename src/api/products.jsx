import { URL_HOST_DATA } from "../utils/constants";

export function getAllroductsApi() {
    const url =`${URL_HOST_DATA}/products`;
    return fetch(url).then ((response) => {
        return response.json();
    }).then((result) => {
        return result;
    });
}

export function getProductsApi(total) {
    const url =`${URL_HOST_DATA}/products?_limit=${total}`;
    return fetch(url).then ((response) => {
        return response.json();
    }).then((result) => {
        return result;
    });
}

export function getAllOffersApi() {
    const url =`${URL_HOST_DATA}/products?offer=true`;
    return fetch(url).then ((response) => {
        return response.json();
    }).then((result) => {
        return result;
    });
}

export function getOffersApi(total) {
    const url =`${URL_HOST_DATA}/products?offer=true&_limit=${total}`;
    return fetch(url).then ((response) => {
        return response.json();
    }).then((result) => {
        return result;
    });
}

export function getProductByIdApi(idProduct) {
    const url =`${URL_HOST_DATA}/products?id=${idProduct}`;
    return fetch(url).then ((response) => {
        return response.json();
    }).then((result) => {
        return result;
    });
}