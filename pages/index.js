import Head from "next/head";
import { connect } from "react-redux";
import React from "react";
import Slider from "react-slick";
import TrackVisibility from "react-on-screen";
import { HomeLayout } from "../app/layouts";

const Item = () => {
    const image ='https://pp.userapi.com/c841025/v841025503/617f7/bkN1Def0s14.jpg';

    return (
        <div className="img-box-horizontal music-img-box h-g-bg h-d-shadow">
            <div className="img-box img-box-sm box-rounded-sm">
                <img src={ image } alt="" />
            </div>
            <div className="des">
                <h6 className="title"><a href="#">The Separation</a></h6>
                <p className="sub-title"><a href="#">Rachel Platten</a></p>
            </div>

            <div className="hover-state d-flex justify-content-between align-items-center">
            <span className="pointer play-btn-dark box-rounded-sm">
                <i className="play-icon"></i>
            </span>
                <div className="d-flex align-items-center">
                <span className="adonis-icon text-light pointer mr-2 icon-2x">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <use xlinkHref="#icon-heart-blank"></use>
                    </svg>
                </span>
                    <span className="pointer dropdown-menu-toggle">
                    <span className="icon-dot-nav-horizontal text-light"></span>
                </span>
                </div>
            </div>
        </div>
    );
};

const ChannelItems = () => {
    return (
        <div className="item" style={{ width: '15em' }}>
            {[...new Array(5)].map((v, i) => {
                return <Item key={ i }/>
            })}
        </div>
    )
};

const SlickMultiple = () => {
    let settings2 = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        rows: 2,
        centerMode: false,
        //adaptiveHeight: true,
        //centerMode: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    dots: true
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    dots: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    centerMode: true,
                    autoplay: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: false,
                    infinite: true,
                    //centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    rows: 1,
                    autoplay: false,
                }
            }
        ]
    };

    return (
        <Slider {...settings2}>
            {([...new Array(38)]).map((v, i) => {
                return <ChannelItems key={ i }/>
            })}
        </Slider>
    );
};

const Index = () => {
    return (
        <HomeLayout title="Домашняя страница">
            <Head>
                <title>Просто ТВ | Домашняя страница</title>
            </Head>

            <section>
                <div className="title-box">
                    <h4 className="title h3">Channels</h4>
                </div>
                <div className="music-img-box-cont-sm">
                    <div className="gutter-30">
                        <TrackVisibility>
                            {({ isVisible }) =>

                                <SlickMultiple />
                            }
                        </TrackVisibility>
                    </div>
                </div>
                <div className="pt-e-20 pt-e-lg-40"></div>
            </section>
        </HomeLayout>
    );
};

export default connect(state => state)(Index);
