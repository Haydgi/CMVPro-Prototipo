import React, { Fragment } from 'react';
import './equipe.css';

const Equipe = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="equipe-max-width thq-section-max-width">
        <div className="equipe-section-title">
          <span className="thq-body-small equipe-text10">
            {props.content1 ?? (
              <Fragment>
                <span className="equipe-text31">Join Our Team Today!</span>
              </Fragment>
            )}
          </span>
          <button className="equipe-button thq-button-filled">
            <span className="thq-body-small">
              {props.actionContent ?? (
                <Fragment>
                  <span className="equipe-text36">Open positions</span>
                </Fragment>
              )}
            </span>
          </button>
          <div className="equipe-content1">
            <h2 className="thq-heading-2 equipe-text12">
              {props.heading1 ?? (
                <Fragment>
                  <span className="equipe-text30">Meet our team</span>
                </Fragment>
              )}
            </h2>
            <p className="equipe-text13 thq-body-large">
              {props.content2 ?? (
                <Fragment>
                  <span className="equipe-text40">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </Fragment>
              )}
            </p>
          </div>
        </div>
        <div className="equipe-content2">
          <div className="equipe-row1">
            <div className="equipe-container1">
              <div className="equipe-card1">
                <img
                  alt="Chef Maria Silva"
                  src="/midia/logoCMV.png"
                  className="equipe-placeholder-image1 thq-img-round thq-img-ratio-1-1"
                />
                <div className="equipe-content3">
                  <div className="equipe-title1">
                    <span className="equipe-text14 thq-body-small">
                      Chef Maria Silva
                    </span>
                    <span className="equipe-text15 thq-body-small">
                      Head Chef and Founder
                    </span>
                  </div>
                  <span className="equipe-text16 thq-body-small">
                    With over 15 years of experience in the culinary industry, Chef Maria Silva is passionate about creating innovative and delicious recipes that inspire others to cook.
                  </span>
                </div>
              </div>
              <div className="equipe-card2">
                <img
                  alt="Chef Carlos Santos"
                  src="/midia/logoCMV.png"
                  className="equipe-placeholder-image2 thq-img-round thq-img-ratio-1-1"
                />
                <div className="equipe-content4">
                  <div className="equipe-title2">
                    <span className="equipe-text17 thq-body-small">
                      Chef Carlos Santos
                    </span>
                    <span className="equipe-text18 thq-body-small">
                      Sous Chef
                    </span>
                  </div>
                  <span className="equipe-text19 thq-body-small">
                    Chef Carlos Santos brings a creative flair to the kitchen with his expertise in fusion cuisine and dedication to perfecting every dish.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="equipe-row2">
            <div className="equipe-container2">
              <div className="equipe-card3">
                <img
                  alt="Chef Ana Oliveira"
                  src="/midia/logoCMV.png"
                  className="equipe-placeholder-image3 thq-img-round thq-img-ratio-1-1"
                />
                <div className="equipe-content5">
                  <div className="equipe-title3">
                    <span className="equipe-text20 thq-body-small">
                      Chef Ana Oliveira
                    </span>
                    <span className="equipe-text21 thq-body-small">
                      Pastry Chef
                    </span>
                  </div>
                  <span className="equipe-text22 thq-body-small">
                    Specializing in desserts and baked goods, Chef Ana Oliveira adds a sweet touch to our team with her delectable creations.
                  </span>
                </div>
              </div>
              <div className="equipe-card4">
                <img
                  alt="Chef Miguel Costa"
                  src="/midia/logoCMV.png"
                  className="equipe-placeholder-image4 thq-img-round thq-img-ratio-1-1"
                />
                <div className="equipe-content6">
                  <div className="equipe-title4">
                    <span className="equipe-text23 thq-body-small">
                      Chef Miguel Costa
                    </span>
                    <span className="equipe-text24 thq-body-small">
                      Food Stylist
                    </span>
                  </div>
                  <span className="equipe-text25 thq-body-small">
                    Chef Miguel Costa's attention to detail and artistic vision elevate our dishes to not only taste amazing but also look stunning.
                  </span>
                </div>
              </div>
              <div className="equipe-card4">
                <img
                  alt="Chef Laura Mendes"
                  src="/midia/logoCMV.png"
                  className="equipe-placeholder-image4 thq-img-round thq-img-ratio-1-1"
                />
                <div className="equipe-content6">
                  <div className="equipe-title4">
                    <span className="equipe-text23 thq-body-small">
                      Chef Miguel Costa
                    </span>
                    <span className="equipe-text24 thq-body-small">
                      Food Stylist
                    </span>
                  </div>
                  <span className="equipe-text25 thq-body-small">
                    Chef Miguel Costa's attention to detail and artistic vision elevate our dishes to not only taste amazing but also look stunning.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Equipe;