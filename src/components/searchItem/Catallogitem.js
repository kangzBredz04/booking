import React from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import "./searchItem.css"; // Ensure correct import path and correct naming conventions

class CatalogItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.item[0],
      distance: this.props.item[1],
      specs: this.props.item[2],
      price: this.props.item[3],
      adult: this.props.item[4],
      child: this.props.item[5],
      like: Math.floor(Math.random() * 100) + 1,
      isLike: false,
    };
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike() {
    const { like, isLike } = this.state;
    this.setState({
      like: isLike ? like - 1 : like + 1,
      isLike: !isLike,
    });
  }

  render() {
    return (
      <div className="searchItem">
        <img
          src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
          alt=""
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{this.state.title}</h1>
          <span className="siDistance">{this.state.distance} m from destination</span>
          <span className="siTaxiOp">Free airport taxi</span>
          <span className="siSubtitle">Studio Apartment with Air conditioning</span>
          <span className="siFeatures">{this.state.specs}</span>
          <span className="siCancelOp">
            <p>
              Adult : {this.state.adult} , Child : {this.state.child}
            </p>
          </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
          </div>
          <div className="siDetailTexts">
            <div className="text-start">
              <p className="d-inline" onClick={this.handleLike}>
                {this.state.isLike ? <AiFillLike /> : <AiOutlineLike />}
                {this.state.like} like(s)
              </p>
            </div>
            <span className="siPrice">{this.state.price} $ </span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <button className="siCheckButton">See availability</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CatalogItem;
