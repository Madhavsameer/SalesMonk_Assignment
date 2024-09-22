import React from 'react'

const Home = React.lazy(() => import('./pages/Home'))
const Review = React.lazy(() => import('./pages/Review'))

const routes = [
    {
        path: '/',
        exact: true,
        name: 'Home',
        component: Home,
    },
    {
        path: '/reviews/:id',
        exact: true,
        name: 'Review',
        component: Review,
    },
]

export default routes
