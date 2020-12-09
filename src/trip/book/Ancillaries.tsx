import React from 'react';
import Button from '@material-ui/core/Button';

export default function Ancillaries() {
  return(
    <div>
      <h5>Ancillaries</h5>
      <div className="book-container">
        <div className="row">
          <div className="col-sm-8 my-auto">
            <p className="text-bold">Additional Baggage</p>
          </div>
          <div className="col-sm-4">
            <Button 
              variant="contained"
              color="secondary"
              size="small"
              className="float-right"
              onClick={(e) => {}}
              disableElevation
            >
              Add 
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}