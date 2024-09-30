import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import LoadItems from "../UI/loadItems";

const ExploreItems = () => {
  const [isLoading, setIsLoading] = useState();
  const [loadMore, setLoadMore] = useState(true);
  const [loadMoreMore, setLoadMoreMore] = useState(true);
  const [exploreItems, setExploreItems] = useState([]);
  const [filter, setFilter] = useState("");
  const startItem = 0;
  const endItem = 8;

  async function getExploreItems(filter) {
    setFilter(filter);
    setIsLoading(true);
    const { data } = await axios.get(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`);
    setExploreItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getExploreItems(filter);
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => getExploreItems(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? 
        <>
        {new Array(8).fill(0).map((_, index) => (
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
        </>
        :
        <>
        {loadMore
          ?
          <>
          {loadMoreMore
            ?
            <>
              <LoadItems start={ startItem } end={ endItem } exploreItems = { exploreItems } />
              <div className="col-md-12 text-center">
                <button className="btn-main lead" onClick={() => setLoadMoreMore(false)}>
                  Load more
                </button>
              </div>
            </>
            :
            <>
              <LoadItems start={ startItem } end={ endItem + 4 } exploreItems = { exploreItems } />
              <div className="col-md-12 text-center">
                <button className="btn-main lead" onClick={() => setLoadMore(false)}>
                  Load more
                </button>
              </div>
            </>
          }
          </>
          :
          <>
            <LoadItems start={ startItem } end={ endItem + 8 } exploreItems = { exploreItems } />
          </>
        }
        </>
      }
    </>
  );
};

export default ExploreItems;
