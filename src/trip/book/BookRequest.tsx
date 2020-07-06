import React from 'react';
import Button from '@material-ui/core/Button';

interface BookRequestProps {

}

class BookRequest extends React.Component<BookRequestProps> {

  render() {

    return (
      <div className="row">
        <div className="col-md-6">
          <Button 
            variant="outlined" 
            color="primary"
          >
            Book and Save
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            variant="contained" 
            color="primary"
          >
            Book and Ticket
          </Button>
        </div>
      </div>
    );
  }

}

export default BookRequest;
