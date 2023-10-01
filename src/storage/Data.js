export const storageUsers = () => JSON.parse(localStorage.getItem("myData")) || [];

export const loggrdinUser = () => JSON.parse(localStorage.getItem("loggedInUser")) || {};

export const storagePosts = () => JSON.parse(localStorage.getItem("posts")) || [];

export const setStoragePosts = (data) => localStorage.setItem("posts", JSON.stringify(data))

export const getMyPost = () => storagePosts().filter(post => post.userId === loggrdinUser().email)