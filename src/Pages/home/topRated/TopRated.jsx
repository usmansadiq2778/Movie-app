import React, { useState } from 'react';
import ContantWrapper from '../../../Components/contentWrraper/ContantWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../Components/carousel/Carousel';

const TopRated = () => {
    const [endpoint, setEndpoint] = useState('movie');
    const { data, loading } = useFetch(`/${endpoint}/top_rated`);
    const onTabChange = (tab) => {
        setEndpoint(tab === 'Movies' ? 'movie' : 'tv');
    };
    return (
        <div className='carouselSection'>
            <ContantWrapper>
                <span className='carouselTitle'>Top Rated </span>
                <SwitchTabs
                    data={['Movies', 'TV Shows']}
                    onTabChange={onTabChange}
                />
            </ContantWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default TopRated;
