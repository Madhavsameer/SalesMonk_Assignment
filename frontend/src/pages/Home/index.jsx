import React, { useState, useEffect, useContext } from 'react'
import Searchbar from '../../components/SearchBar'
import MovieCard from '../../components/MovieCard'
import './index.scss'
import { getAllMovies } from '../../service'
import AppContext from '../../context'
import Loader from '../../components/Loader'

const Home = () => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const { movieData, setMovieData, setInitialMovieData, initialMovieData } =
        useContext(AppContext)

    const searchHandler = (text = '') => {
        if (text == '') {
            setMovieData(initialMovieData)
            return
        }
        const searchData = initialMovieData.filter((item) => {
            return item?.name?.toLowerCase()?.includes(text.toLowerCase())
        })
        setMovieData(searchData)
    }

    const fetchMovieData = async () => {
        try {
            const response = await getAllMovies()
            setMovieData(response?.data)
            setInitialMovieData(response?.data)
        } catch (error) {
            setError('Internal server error! Please refresh')
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchMovieData()
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <div>
            <h2 className="p-4">The best movie reviews site!</h2>
            <Searchbar searchHandler={searchHandler} />
            <div className="movie-cards-container">
                {movieData
                    ? movieData.map((item, index) => (
                          <MovieCard item={item} key={index} />
                      ))
                    : null}
            </div>
        </div>
    )
}

export default Home
