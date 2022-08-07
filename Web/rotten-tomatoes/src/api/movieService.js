import axios from "axios"

export const MovieService = {

    login: function(data) { return axios.post('http://localhost:7070/login', data)},
    register: function(data) { return axios.post('http://localhost:7070/register', data) },
    getUser: function() {return axios.get('http://localhost:7070/user')},
    getUserById: function(id) {return axios.get(`http://localhost:7070/user/${id}`)},
    getLatest: function() {return axios.get('http://localhost:7070/content/latest')},
    getTop: function() {return axios.get('http://localhost:7070/content/top')},
    getContentId: function(id) {return axios.get(`http://localhost:7070/content/${id}/`)}, 
    postReview: function(data, id) {return axios.post(`http://localhost:7070/content/${id}/`, data)},
    getCategories: function() {return axios.get('http://localhost:7070/categories')},
    getCategoriesById: function(id) {return axios.get(`http://localhost:7070/categories/${id}/`)},
}

export default MovieService;