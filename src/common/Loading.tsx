import React from 'react';


class Loading extends React.Component {
  render() {
    let primaryText: string = "Finding you the best flights";
    let secondaryText: string = "YHZ - YOW - YYZ";
    return (
      <div className="row">
        <div className="col-lg">
          <h4>{primaryText}</h4>
          <p>{secondaryText}</p>
        </div>
      </div>
    )
  }
}

export default Loading;
