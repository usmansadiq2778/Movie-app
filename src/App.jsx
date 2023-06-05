import { useState, useEffect } from 'react';
import { fetchDatafromApi } from './utlis/api';
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home/Home';
import Explore from './Pages/explore/Explore';

import Details from './Pages/details/Details';
import PageNotFound from './Pages/404/PageNotFound';
import Footer from './Components/footer/Footer';
import Header from './Components/headers/Header';
import SearchResult from './Pages/searchResult/SearchResult';

function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDatafromApi('/configuration').then((res) => {
            // console.log('api data', res);

            const url = {
                backdrop: res.images.secure_base_url + 'original',
                poster: res.images.secure_base_url + 'original',
                profile: res.images.secure_base_url + 'original',
            };
            dispatch(getApiConfiguration(url));
        });
    };
    const genresCall = async () => {
        let Promises = [];
        let endPoints = ['tv', 'movie'];
        let allGeners = {};
        endPoints.forEach((url) => {
            Promises.push(fetchDatafromApi(`/genre/${url}/list`));
        });
        const data = await Promise.all(Promises);

        data.map(({ genres }) => {
            return genres.map((item) => (allGeners[item.id] = item));
        });
        dispatch(getGenres(allGeners));
    };

    return (
        <div className='App'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/:mediaType/:id' element={<Details />} />
                    <Route path='/search/:query' element={<SearchResult />} />
                    <Route path='/explore/:mediaType' element={<Explore />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
