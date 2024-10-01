import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Author = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [authorData, setAuthorData] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [action, setAction] = useState("");

  function changeFollowers(action) {
    setAction(action);
    if (action === "plus") {
      setFollowers(followers+1);
      setIsFollowing(true);
    } else {
      setFollowers(followers-1);
      setIsFollowing(false);
    }
  }

  async function getAuthor(id) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthorData(data);
    setFollowers(data.followers);
    setIsLoading(false);
  }

  useEffect(() => {
    getAuthor(id);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              {isLoading
              ? 
              <>
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <div className="skeleton-box" style={{width: "150px", height: "150px", borderRadius: "50%"}}></div>
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          <div className="skeleton-box" style={{width: "200px"}}></div>
                          <span className="profile_username">
                            <div className="skeleton-box" style={{width: "100px"}}></div>
                          </span>
                          <span id="wallet" className="profile_wallet">
                            <div className="skeleton-box" style={{width: "250px"}}></div>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        <div className="skeleton-box" style={{width: "150px", height: "40px"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <div className="de_tab_content">
                    <div className="tab-1">
                      <div className="row">
                        {new Array(8).fill(0).map((_, index) => (
                          <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                            <div className="skeleton-box" style={{width: "100%", height: "400px"}}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
              :
              <>
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={authorData.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{authorData.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {authorData.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followers} followers</div>
                      {isFollowing
                      ?
                      <button className="btn-main" onClick={() => changeFollowers("minus")}>
                        Unfollow
                      </button>
                      :
                      <button className="btn-main" onClick={() => changeFollowers("plus")}>
                        Follow
                      </button>
                    }
                    </div>
                  </div>
                </div>
              </div> 
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items = { authorData.nftCollection } authorImage = { authorData.authorImage } authorId = {authorData.id}/>
                </div>
              </div>
              </>
              }
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
