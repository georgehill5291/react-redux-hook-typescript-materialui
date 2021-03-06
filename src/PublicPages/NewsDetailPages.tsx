import PublicTemplate from 'components/Template/PublicTemplate'
import { NewsContext } from 'contexts/NewsContext'
import React, { useContext, useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'
import { News } from 'reducers/newsReducer'
import { getTextContent4Multilanguage } from 'ultilities/helper'

interface IProps {
    id: string
}

const NewsDetailPages = () => {
    const params = useParams<IProps>()
    //context
    const {
        newsState: { newsListing, newsListingLoading },
        getNews,
        findNews,
    } = useContext(NewsContext)
    const [t, i18n] = useTranslation('common')

    const [newsDetail, setNewsDetail] = useState<News>()

    const [relatedNews, setRelatedNews] = useState<News[]>([])

    //Start: Get all news

    useEffect(() => {
        getNews(undefined, undefined, undefined, 15)
    }, [params])

    useEffect(() => {
        // findNews(params.id)
        if (newsListing && newsListing.length > 0) {
            setNewsDetail(newsListing.find((t) => t._id === params.id))
        }

        // Shuffle array
        const shuffled = newsListing
            .filter((t) => t._id !== params.id)
            .sort(() => 0.5 - Math.random())
        var relatedItems = shuffled.slice(0, 4)
        setRelatedNews(relatedItems)
    }, [newsListing])

    return (
        <PublicTemplate>
            {newsDetail && (
                <div className='container'>
                    <h1 className='my-4'>
                        {getTextContent4Multilanguage(newsDetail.title, i18n.language)}
                    </h1>

                    <div className='row'>
                        <div className='col-md-8'>
                            <img
                                className='img-fluid'
                                src={`${newsDetail.imageFile.imageUrl.replace(
                                    '-original',
                                    '-detail'
                                )}`}
                                alt=''
                            />
                        </div>

                        <div className='col-md-4'>
                            <h3 className='my-3'>Information</h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: getTextContent4Multilanguage(
                                        newsDetail.description,
                                        i18n.language
                                    ),
                                }}
                            />
                            <h3 className='my-3'>Classifications</h3>
                            <ul>
                                {newsDetail.classifications.map((item) => (
                                    <li>{item.title}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <h3 className='my-4'>Related Projects</h3>
                    <div className='row'>
                        {relatedNews.map((item) => {
                            return (
                                <div key={item._id} className='col-md-3 col-sm-6 mb-4'>
                                    <Link to={`/news/${item._id}`}>
                                        <img
                                            className='img-fluid'
                                            src={item.imageFile.imageUrl.replace(
                                                '-original',
                                                '-related'
                                            )}
                                            alt=''
                                        />
                                    </Link>
                                    <Link to={`/news/${item._id}`}>
                                        {getTextContent4Multilanguage(item.title, i18n.language)}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </PublicTemplate>
    )
}

export default NewsDetailPages
