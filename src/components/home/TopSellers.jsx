import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const TopSellers = () => {
  const [isLoading, setIsLoading] = useState();
  const [topSellers, setTopSellers] = useState([]);

  async function getTopSellers() {
    setIsLoading(true);
    const { data } = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
    setTopSellers(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
              {isLoading 
               ?<ol className="author_list">
               {new Array(12).fill(0).map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author">
                    <div className="skeleton-box" style={{width:'50px', height:'50px', borderRadius:"50%"}}></div>
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author">
                      <div className="skeleton-box" style={{width:'100px', height:'20px'}}></div>
                    </Link>
                    <span>
                        <div className="skeleton-box" style={{width:'40px', height:'20px'}}></div>
                    </span>
                  </div>
                </li>
              ))}
              </ol>
               : <ol className="author_list">
              {topSellers.map((item) => (
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))}       
            </ol>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
