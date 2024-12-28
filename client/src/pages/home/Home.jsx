import React, { useRef } from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import PropertyList from '../../components/propertlist/PropertyList'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import LoadingBar from 'react-top-loading-bar'

const Home = () => {
    const ref = useRef(null)
    return (
        <div>
            <LoadingBar color='#0071c2' height={4} ref={ref} style={{ borderRadius: '10px' }} />
            <button onClick={() => ref.current.continuousStart()}>
                Start Continuous Loading Bar
            </button>
            <button onClick={() => ref.current.staticStart()}>
                Start Static Loading Bar
            </button>
            <button onClick={() => ref.current.complete()}>Complete</button>
            <br />
            <Navbar />
            <Header />
            <div className="homeContainer">
                <Featured />
                <h1 className="homeTitle">Browse by property type</h1>
                <PropertyList />
                <h1 className='homeTitle'>Home guests love</h1>
                <FeaturedProperties />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home