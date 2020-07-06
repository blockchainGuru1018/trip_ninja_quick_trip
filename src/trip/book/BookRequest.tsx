import React from 'react';
import Button from '@material-ui/core/Button';

interface BookRequestProps {

}

class BookRequest extends React.Component<BookRequestProps> {

  render() {

    return (
      <div className="float-right">
        <Button 
          variant="outlined" 
          color="primary"
          className="book-button"
        >
          Book and Save
        </Button>
        <Button
          variant="contained" 
          color="primary"
          className="book-button"
        >
          Book and Ticket
        </Button>
      </div>
    );
  }

}

export default BookRequest;
