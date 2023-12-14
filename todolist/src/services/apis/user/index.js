import axios from "axios"

export default {
    create: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/users`, data)

    },
    findMany: async () => {
        // console.log(axios.get(`${import.meta.env.VITE_SERVER_HOST}/users`));
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/users`)

    },
    update: async (id, data) => {
        return await axios.put(`${import.meta.env.VITE_SERVER_HOST}/users/${id}`, data)
    },
    delete: async (id) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/users/${id}`)
    }
}