import React, { Suspense } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Loader from './components/Loader'
import routes from './routes'
import Navbar from './components/CustomNavbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'
import AppContext from './context'
import { useState } from 'react'

const App = () => {
    const [movieData, setMovieData] = useState()
    const [initialMovieData, setInitialMovieData] = useState()
    const [reviewData, setReviewData] = useState()

    const globalStates = {
        movieData,
        setMovieData,
        reviewData,
        setReviewData,
        initialMovieData,
        setInitialMovieData,
    }
    return (
        <BrowserRouter>
            <AppContext.Provider value={globalStates}>
                <Suspense fallback={<Loader />}>
                    <Navbar />
                    <Routes>
                        {routes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.component />}
                                />
                            )
                        })}
                    </Routes>
                </Suspense>
            </AppContext.Provider>
        </BrowserRouter>
    )
}

export default App
