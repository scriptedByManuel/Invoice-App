export const login = (data) => {
    return fetch(import.meta.env.VITE_URL_API + "/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};

export const register = (data) => {
    return fetch(import.meta.env.VITE_URL_API + "/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
};