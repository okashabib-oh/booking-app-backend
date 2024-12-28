import React from 'react'
import './propertylist.css'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {
    const { data, error, loading } = useFetch("http://localhost:8008/api/hotels/countByType")
    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2elamvM_lVGZuVwG0OPMKLi1X4ZoN0BkOw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2elamvM_lVGZuVwG0OPMKLi1X4ZoN0BkOw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2elamvM_lVGZuVwG0OPMKLi1X4ZoN0BkOw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2elamvM_lVGZuVwG0OPMKLi1X4ZoN0BkOw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2elamvM_lVGZuVwG0OPMKLi1X4ZoN0BkOw&s"
    ]
    return (
        <div className='pList'>
            {loading ? (
                "Loading Please Wait..."
            ) : (
                <>
                    {data &&
                        images.map((img, i) => (
                            <div className="pListItem" key={i}>
                                <img src={img} alt="" className='pListImage' />
                                <div className="pListTitles">
                                    <h1>{data[i]?.type}</h1>
                                    <h2>{data[i]?.count} {data[i]?.type}</h2>
                                </div>
                            </div>
                        ))}
                </>
            )}
        </div>
    )
}

export default PropertyList