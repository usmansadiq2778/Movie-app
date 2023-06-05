import React, { useEffect } from 'react';
import HeroBanner from './heroBanners/HeroBanner';
import './style.scss';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';

const Home = () => {
    return (
        <div className='homepage'>
            <HeroBanner />
            <Trending />
            <Popular />
            <TopRated />
        </div>
    );
};

export default Home;
