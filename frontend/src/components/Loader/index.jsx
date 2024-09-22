import React from 'react'
import ReactLoading from 'react-loading'

const Loader = () => {
    return (
        <>
            <div>
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <ReactLoading
                        type={'cylon'}
                        color={'#6558f5'}
                        height={100}
                        width={100}
                    />
                </div>
            </div>
            <div className="loading-bg">
                <div className="d-flex justify-content-center align-items-center min-vh-100 loading-text h4 text-white">
                    Loading
                </div>
            </div>
        </>
    )
}

export default Loader
