import axios from 'axios'

const BASE_URL = "https://randomuser.me/api"

export default class API {
    static getUsers = (parameters : {}) => {
        return axios.get(`${BASE_URL}`, {params : parameters})
    }
}