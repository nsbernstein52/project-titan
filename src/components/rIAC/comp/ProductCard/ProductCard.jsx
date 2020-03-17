// this component is for use in RIAC.jsx
//   for both Related Products and Your Outfit
import React from 'react';

const helper = require("../../../../helper/helper.js");

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      relatedProduct: {}
      // relatedProductId: props.relatedProductId // not yet needed
    }
  }

  componentDidUpdate(prevProps) {
    let currentRelatedProductId = this.props.relatedProductId
    if (typeof currentRelatedProductId === 'number' && currentRelatedProductId !== prevProps.relatedProductId) {
    // console.log("PC: cDU: cRPId: ", currentRelatedProductId)
      helper.getOneProduct(3, result => { // HARD CODED
        this.setState({
          relatedProduct: result
        });
      });  
      helper.getOneProductStyle(11, result=>{
        this.setState({
          styles: result.results
        })
      });
   }

  }

  setProductId = (event) => {
    this.props.setProductId(this.props.relatedProductId);
  }

  scrollToTop () {
    window.scrollTo(0, 0);
  }

  render() {
    // const currentProduct = this.props.currentProduct; // not currently needed
    // console.log("PC: cP: ", currentProduct);
    const relatedProductId = this.props.relatedProductId;
    // console.log("PC: rPId: ", relatedProductId);

    const relatedProduct = this.state.relatedProduct;
    const relatedCategory = relatedProduct.category;
    const relatedCaption = relatedProduct.name + ' - ' + relatedProduct.slogan;
    const relatedDefPrice = relatedProduct.default_price;
    const relatedRating = "***";
    
    const relatedStyles = this.props.styles;
      // console.log("PC: rPsSs[0]: ", relatedStyles[0])

    const relatedStylesIndex = 1; // HARD CODED
    const relatedStyle = relatedStyles[relatedStylesIndex];
      // console.log("PC: rS: ", relatedStyle);
  
    let relThumbnail = "(NO IMAGE AVAILABLE)"; // fallback
    const relatedThumbnailIndex = 0; // HARD CODED
    if (this.props.styles[relatedStylesIndex] !== undefined) { // needed, but WHY?
      relThumbnail = relatedStyle.photos[relatedThumbnailIndex].thumbnail_url;
    }

    return (
      <Container-fluid className="layout product-card-layout align-left">
        <div id="product-card-div" onClick={this.setProductId}>
          <a onClick={this.scrollToTop}>
            <div className="card mb-3">
              <p>
                <img className="card-img-top" src={relThumbnail}  alt=""/>
              </p>
            </div>
          </a>
        </div>
        <div className="card">
          <div className="card-body">
          <p className="card-text category">{relatedCategory}</p>
            <h5 className="card-title caption">{relatedCaption}</h5>
            <small><p className="card-text text-muted price">{relatedDefPrice}</p></small>
            <p className="card-text">{relatedRating}</p>
          </div>
        </div>
      </Container-fluid>
    )
  }
}

export default ProductCard;
