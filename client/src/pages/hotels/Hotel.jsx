import React, { useContext, useState } from 'react'
import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Footer from '../../components/footer/Footer'
import MailList from '../../components/mailList/MailList'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../reserve/Reserve'

const Hotel = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const id = location.pathname.split('/')[2]
    const { data, error, loading } = useFetch(`http://localhost:8008/api/hotels/find/${id}`)
    const [slideNumber, setSlideNumber] = useState(0)
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { hotel } = data
    console.log(hotel, "Hotel ==>");
    console.log(data, "Hotel ==>");

    const { dates, options } = useContext(SearchContext)
    console.log(options);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
    function dayDiff(dateOne, dateTwo) {
        const timeDiff = Math.abs(dateTwo.getTime() - dateOne.getTime())
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
        return diffDays;
    }
    const days = dayDiff(dates[0].endDate, dates[0].startDate)
    const handleOpen = (i) => {
        setSlideNumber(i)
        setOpen(true)
    }
    const { user } = useContext(AuthContext)

    const handleClick = () => {
        if (user) {
            setOpenModal(true)
        } else {
            navigate('/login')
        }
    }

    return (
        <div>
            <Navbar />
            <Header type='list' />
            {loading ?
                ("Loading...") : (
                    <div className="hotelContainer">
                        {open &&
                            <div className="slider">
                                <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className='close'
                                    onClick={() => setOpen(false)} />
                                <FontAwesomeIcon
                                    icon={faCircleArrowLeft}
                                    className='arrow'
                                    onClick={() => setSlideNumber(slideNumber == 0 ? 5 : slideNumber - 1)} />
                                <div className="sliderWrapper">
                                    <img src={hotel?.photos[slideNumber].src} alt="slider img" className='sliderImg' />
                                </div>
                                <FontAwesomeIcon
                                    icon={faCircleArrowRight}
                                    className='arrow'
                                    onClick={() => setSlideNumber(slideNumber == 5 ? 0 : slideNumber + 1)}
                                />
                            </div>
                        }
                        <div className="hotelWrapper">
                            <button className='bookNow'>Reserve or Book now!</button>
                            <h1 className="hotelTitle">{hotel?.name}</h1>
                            <div className="hotelAddress">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>{hotel?.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location - {hotel?.distance}m form center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ${hotel?.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImgs">
                                {hotel?.photos?.map((img, i) => (
                                    <div className="hotelImgsWrapper" key={i}>
                                        <img src={img.src} alt="img"
                                            className='hotelPhoto'
                                            onClick={() => handleOpen(i)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailTexts">
                                    <h1 className="hotelTitle">{hotel?.title}</h1>
                                    <p className="hotelDesc">{hotel?.description}</p>
                                </div>
                                <div className="hotelDetailPrice">
                                    <h1>Perfect for {days} night stay!</h1>
                                    <span>
                                        Located in the real heart of Krakow, this property has an
                                        excellent location score of 9.8!
                                    </span>
                                    <h2>
                                        <b>${days * hotel?.cheapestPrice * options.rooms}</b> ({days} nights)
                                    </h2>
                                    <button onClick={handleClick}>Reserve or Book now!</button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                )}
            {openModal && <Reserve setOpenModal={setOpenModal} hotelId={id} />}
        </div>
    )
}

export default Hotel