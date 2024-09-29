import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {  
  const [isLoading, setIsLoading] = useState();
  const [hotCollections, setHotCollections] = useState([]);

  const settings = {
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: (
      <div>
        <div className="next-slick-arrow override-style override-right">
        &#8250;
        </div>
      </div>
    ),
  
    prevArrow: (
      <div>
        <div className="prev-slick-arrow override-style override-left">
          &#8249;
        </div>
      </div>
    ),
    useCSS: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  async function getHotCollections() {
    setIsLoading(true);
    const { data } = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`);
    setHotCollections(data);
    setIsLoading(false);
}

useEffect(() => {
  getHotCollections();
}, []);


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading 
          ? <div className="slider-container">
            <Slider {...settings} >
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 override-mw" key={index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <div className="skeleton-box" style={{width:'100%', height:'175px'}}></div>
                </div>
                <div className="nft_coll_pp">
                <div className="skeleton-box" style={{width:'50px', height:'50px', borderRadius:'50%'}}></div>
                <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                <div className="skeleton-box" style={{width:'100px', height:'20px'}}></div>
                <br />
                <div className="skeleton-box" style={{width:'60px', height:'20px'}}></div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
            </div>
            : <>
          <div className="slider-container">
            <Slider {...settings} >
          {hotCollections.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 override-mw" key={item.id}
            >
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to={`/item-details/${item.nftId}`}>
                    <img src={item.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img className="lazy pp-coll override-mw" src={item.authorImage} alt="" />
                  </Link>
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft_coll_info">
                  <Link to="/explore">
                    <h4>{item.title}</h4>
                  </Link>
                  <span>ERC-{item.code}</span>
                </div>
              </div>
            </div>
          ))}
          </Slider>
          </div>
          </>}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
