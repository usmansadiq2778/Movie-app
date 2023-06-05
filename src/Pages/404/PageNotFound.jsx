import React from 'react';

import './style.scss';
import ContantWrapper from '../../Components/contentWrraper/ContantWrapper';

const PageNotFound = () => {
    return (
        <div className='pageNotFound'>
            <ContantWrapper>
                <span className='bigText'>404</span>
                <span className='smallText'>Page not found!</span>
            </ContantWrapper>
        </div>
    );
};

export default PageNotFound;
