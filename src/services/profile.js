import { getCookie } from "react-use-cookie";

const token = getCookie("my_token");

export const changeName = (data) => {
    return fetch(import.meta.env.VITE_URL_API + "/user-profile/change-name", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const changePassword = (data) => {
    return fetch(import.meta.env.VITE_URL_API + "/user-profile/change-password", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const uploadImageToStorage = (formData) => {
    return fetch(import.meta.env.VITE_URL_API + "/media", {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: formData
    });
};

export const changeProfileImage = (data) => {
    return fetch(import.meta.env.VITE_URL_API + "/user-profile/change-profile-image", {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
};