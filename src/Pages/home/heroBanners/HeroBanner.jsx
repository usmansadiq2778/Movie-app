import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../Components/lazyLoadImage/Img';
import ContantWrapper from '../../../Components/contentWrraper/ContantWrapper';

import './style.scss';

const HeroBanner = () => {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch('/movie/upcoming');
    const searchQueryHandler = (event) => {
        event.preventDefault();
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
    useEffect(() => {
        const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    return (
        <div className='heroBanner'>
            {!loading && (
                <div className='backdrop_img'>
                    <Img src={`${background}`} />
                </div>
            )}
            <div className='opacity-layer'></div>
            <ContantWrapper>
                <div className='heroBannerContant'>
                    <span className='title'>Welcom</span>
                    <span className='subTitle'>
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className='searchInput'>
                        <input
                            type='text'
                            placeholder='Search for a movie or tv shoes....'
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button>Seacrh</button>
                    </div>
                </div>
            </ContantWrapper>
        </div>
    );
};

export default HeroBanner;
