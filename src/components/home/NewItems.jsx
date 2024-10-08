import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Countdown from "../UI/countdown";

const NewItems = () => {
  const [isLoading, setIsLoading] = useState();
  const [newItems, setNewItems] = useState([]);

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
  
  async function getNewItems() {
    setIsLoading(true);
    const { data } = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`);
    setNewItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {isLoading
          ? <div className="slider-container">
          <Slider {...settings} >
        {new Array(4).fill(0).map((_, index) => (
          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 override-mw" key={index}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to="/author"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Creator: Monica Lucas"
                >
                  <div className="skeleton-box" style={{width:'50px', height:'50px', borderRadius:"50%"}}></div>
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <Link to="/item-details">
                <div className="skeleton-box" style={{width: '100%', height: '350px'}}></div>
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to="/item-details">
                <div className="skeleton-box" style={{width: '180px', height: '30px'}}></div>
                </Link>
                <div className="skeleton-box" style={{width: '100px', height: '20px'}}></div>
              </div>
              <div className="nft__item_like">
                <div className="skeleton-box" style={{width: '30px', height: '15px'}}></div>
              </div>
            </div>
          </div>
        ))}
        </Slider>
        </div>
          : 
          <div className="slider-container" >
            <Slider {...settings} >
          {newItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 override-mw" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={`Creator: ${item.authorName}`}
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate !== null ?
                <div className="de_countdown"><Countdown endDate={`${item.expiryDate}`} />
                </div>
                :''}
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                <Link to={`/item-details/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </Slider>
          </div>
          }
        </div>
      </div>
    </section>
  );
};

export default NewItems;
