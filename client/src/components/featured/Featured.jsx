import React from 'react'
import './featured.css'
import useFetch from '../../hooks/useFetch'

const Featured = () => {

    const { data, error, loading } = useFetch("http://localhost:8008/api/hotels/countByCity?cities=KHI,ISL,LHR")
    console.log(data);
    
    return (
        <div className='featured'>
            {loading ? (
                "Loading Please Wait..."
            ) : (
                <>
                    <div className="featuredItem">
                        <img src="https://www.ecoprops.co.za/images/slide-1.jpg" className='featuredImg' />
                        <div className="featuredTitles">
                            <h1>KHI</h1>
                            <h2>{data?.message} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src="https://www.ecoprops.co.za/images/slide-1.jpg" className='featuredImg' />
                        <div className="featuredTitles">
                            <h1>LHR</h1>
                            <h2>{data?.message} properties</h2>
                        </div>
                    </div>
                    <div className="featuredItem">
                        <img src="https://www.ecoprops.co.za/images/slide-1.jpg" className='featuredImg' />
                        <div className="featuredTitles">
                            <h1>ISL</h1>
                            <h2>{data?.message} properties</h2>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Featured