import React from 'react';
import { withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../stylesheets/SearchPage.css";


class ToolIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { tool_id, toolPrice, brand, model, rating } = this.props.tool;

    return ( 
      <div className="car-tile-container">
          <div className="car-index-photo-wrapper">
            <img className="car-index-photo" src={""} />
            <div className="car-price">
              ${toolPrice}<span className="price-per-day"> /day</span>
            </div>
          </div>
      
        <div className="car-make-model-year-container">
          <span className="car-make-model">
            {brand}&nbsp;{model}
          </span>
          <span className="car-year">
            &nbsp;{rating}<br />
          </span>
        </div>
      </div>
    )
  }

}

export default ToolIndexItem;