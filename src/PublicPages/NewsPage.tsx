import Footer from 'components/Shared/Footer'
import PublicHeader from 'components/Shared/PublicHeader'
import PublicNavbar from 'components/Shared/PublicNavbar'
import PublicTemplate from 'components/Template/PublicTemplate'
import { NewsContext } from 'contexts/NewsContext'
import React, { useContext, useEffect } from 'react'
import { Button, Col, Nav, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Moment from 'moment'
import { useTranslation } from 'react-i18next'
import { getLongTextContent4Multilanguage, getTextContent4Multilanguage } from 'ultilities/helper'
import Aos from 'aos'
import 'aos/dist/aos.css'
import AboutTechnologies from 'components/Shared/AboutTechnologies'

const NewsPage = () => {
    const {
        newsState: { newsListing, newsListingLoading, newsDetail, total, currentPage },
        getNews,
        setShowAddNewsModal,
    } = useContext(NewsContext)

    const [t, i18n] = useTranslation('common')

    const { findNews } = useContext(NewsContext)
    Moment.locale('en')

    //Start: Get all news
    useEffect(() => {
        Aos.init({ duration: 2000, once: true })
        getNews(undefined, undefined, undefined, 5)
    }, [])

    const choosePost = (newId: string) => {
        findNews(newId)
    }

    const handleLoadmore = () => {
        getNews(undefined, undefined, currentPage + 1, 5, true)
    }

    const regex = /(<([^>]+)>)/gi

    let firstItem = null
    let restItems = null

    if (!newsListingLoading) {
        firstItem = <>Loading...</>
    }

    var firstNews = newsListing[0]

    if (newsListing && firstNews) {
        firstItem = (
            <>
                <div className='card mb-4'>
                    <a href='#!'>
                        <img
                            className='card-img-top'
                            src={`${firstNews.imageFile.imageUrl.replace(
                                '-original',
                                '-firstNews'
                            )}`}
                            alt='...'
                        />
                    </a>
                    <div className='card-body'>
                        <div className='small text-muted'>
                            {Moment(firstNews.createAt).format('DD MMM yyyy hh:mm:ss')}
                        </div>
                        <h2 className='card-title'>
                            {getTextContent4Multilanguage(firstNews.title, i18n.language)}
                        </h2>
                        <p className='card-text'>
                            {' '}
                            {getLongTextContent4Multilanguage(
                                firstNews.description,
                                i18n.language,
                                150
                            )}
                        </p>
                        <Nav.Link
                            className='btn btn-primary'
                            to={`/news/${firstNews._id}`}
                            as={Link}
                            onClick={choosePost.bind(this, firstNews._id)}
                        >
                            Read more →
                        </Nav.Link>
                    </div>
                </div>
            </>
        )
    }

    var restNewsListing = newsListing.slice(1)
    if (newsListing && restNewsListing) {
        for (let i = 0; i < restNewsListing.length; i = i + 2) {
            const item1 = restNewsListing[i]
            const item2 = restNewsListing[i + 1]
            // console.log('item1', item1)
            // console.log('item2', item2)

            restItems = restNewsListing.map((newsItem) => (
                <div data-aos='fade-up' className='col-lg-6' key={newsItem._id}>
                    {/* <!-- Blog post--> */}
                    <div className='card mb-4'>
                        <a href='#!'>
                            <img
                                className='card-img-top'
                                src={`${newsItem.imageFile.imageUrl.replace(
                                    '-original',
                                    '-restNews'
                                )}`}
                                alt='...'
                            />
                        </a>
                        <div className='card-body news-card-body d-flex flex-column'>
                            <div className='small text-muted'>
                                {Moment(newsItem.createAt).format('DD MMM yyyy hh:mm:ss')}
                            </div>
                            <h2 className='card-title'>
                                {getTextContent4Multilanguage(newsItem.title, i18n.language)}
                            </h2>
                            <p className='card-text'>
                                {''}
                                {getLongTextContent4Multilanguage(
                                    newsItem.description,
                                    i18n.language,
                                    150
                                )}
                            </p>
                            <Nav.Link
                                className='btn btn-primary my-auto'
                                to={`/news/${newsItem._id}`}
                                as={Link}
                                onClick={choosePost.bind(this, newsItem._id)}
                            >
                                Read more →
                            </Nav.Link>
                        </div>
                    </div>
                </div>
            ))
        }
    }

    let loadMore = null
    if (newsListing.length < total) {
        loadMore = (
            <Row className='mx-auto mb-4 justify-content-center text-center'>
                <Col xs lg='6'>
                    <Button onClick={handleLoadmore}>Load more...</Button>
                </Col>
            </Row>
        )
    }

    return (
        <PublicTemplate>
            <PublicHeader />
            <AboutTechnologies />
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-12'>
                        {firstItem}
                        <div className='row'>{restItems}</div>
                    </div>
                </div>
            </div>
            {loadMore}
        </PublicTemplate>
    )
}

export default NewsPage
