import React from 'react'
import './featuredproperties.css'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {
    const { data, error, loading } = useFetch("http://localhost:8008/api/hotels?featured=true")
    const { hotels } = data
    console.log(hotels);

    return (
        <div className='fp'>
            {loading ? (
                "Loading..."
            ) : (
                <>
                    {hotels?.map((items) => (
                        <div className="fpItem" key={items._id}>
                            <img src={items.photos[0]} alt={items.name} className="fpImg" />
                            <span className="fpName">{items.name}</span>
                            <span className="fpCity">{items.city}</span>
                            <span className="fpPrice">Starting from ${items.cheapestPrice}</span>
                            {items.rating &&
                                <div className="fpRating">
                                    <button>{items.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            }
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default FeaturedProperties