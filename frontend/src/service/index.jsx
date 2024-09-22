import BaseUrl from './baseUrl'
import axios from 'axios'

// Movie APIs
export const addEditMovie = async (data) => {
    const url = `${BaseUrl}/movie/add`
    const response = await axios.post(url, data)
    return response
}

export const getAllMovies = async () => {
    const url = `${BaseUrl}/movie`
    const response = await axios.get(url)
    return response
}

export const deleteMovie = async (id) => {
    const url = `${BaseUrl}/movie/delete/${id}`
    const response = await axios.delete(url)
    return response
}

// Review APIs
export const getMovieReviews = async (id) => {
    const url = `${BaseUrl}/reviews/${id}`
    const response = await axios.get(url)
    return response
}

export const addEditReview = async (data) => {
    const url = `${BaseUrl}/reviews/add`
    const response = await axios.post(url, data)
    return response
}

export const deleteReview = async (id) => {
    const url = `${BaseUrl}/reviews/delete/${id}`
    const response = await axios.delete(url)
    return response
}