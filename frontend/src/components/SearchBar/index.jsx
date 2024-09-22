import React from 'react'
import { Icon } from '@iconify/react'
import './index.scss'

const Searchbar = ({ searchHandler }) => {
    return (
        <div className="search-bar">
            <Icon icon={'uil:search'} fontSize={20} />
            <input
                type="text"
                className="search-input"
                placeholder="Search for your favorite movie"
                // onClick={() => {
                //   onClick(true);
                // }}
                onChange={(event) => searchHandler(event.target.value)}
            />
        </div>
    )
}

export default Searchbar
