import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchDatafromApi } from '../../utlis/api';
import ContantWrapper from '../../Components/contentWrraper/ContantWrapper';
import noResults from '../../assets/no-results.png';
import Spinner from '../../Components/spinner/Spinner';
import MovieCard from '../../Components/movieCard/MovieCard';

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDatafromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };
    const fetchNextPageData = () => {
        fetchDatafromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                {
                    data?.results
                        ? setData({
                              ...data,
                              results: [...data?.results, ...res.results],
                          })
                        : setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };
    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className='searchResultsPage'>
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContantWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className='pageTitle'>
                                {` Search ${
                                    data?.total_results > 1
                                        ? 'results'
                                        : 'result'
                                } of  '${query}'`}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results?.map((item, index) => {
                                    if (item.media_type === 'person') return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                            // loading={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className='resultNotFound'>
                            <h2>Results Not Found</h2>
                            <p>Sorry, no results were found for your search.</p>
                        </span>
                    )}
                </ContantWrapper>
            )}
        </div>
    );
};

export default SearchResult;
