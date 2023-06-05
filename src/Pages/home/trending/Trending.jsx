import React, { useState } from 'react';
import ContantWrapper from '../../../Components/contentWrraper/ContantWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../Components/carousel/Carousel';

const Trending = () => {
    const [endpoint, setEndpoint] = useState('day');
    const { data, loading } = useFetch(`/trending/all/${endpoint}`);
    const onTabChange = (tab) => {
        setEndpoint(tab === 'Today' ? 'day' : 'week');
    };
    return (
        <div className='carouselSection'>
            <ContantWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs
                    data={['Today', 'This Week']}
                    onTabChange={onTabChange}
                />
            </ContantWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    );
};

export default Trending;
