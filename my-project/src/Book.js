import React from "react";
import coverNotAvailable from "./icons/cover-no-available-image.png";
import PropTypes from "prop-types";
// Component responsible for rendering books.
class Book extends React.Component {
  // PropTypes for proper data definition.
  static propTypes = {
    book: PropTypes.object.isRequired
  };
  render() {
    const { book, changeShelf } = this.props;
    // If image is not available then use "no cover image".
    const coverSetup =
      book.imageLinks && book.imageLinks.thumbnail
        ? book.imageLinks.thumbnail
        : coverNotAvailable;
    return (
      // Creating books.
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover">
              <img src={coverSetup} alt={`${book.title} cover`}></img>
            </div>
            <div className="book-shelf-changer">

              {/* Creating options for books to move. */}
              <select
                value={book.shelf}
                onChange={event => changeShelf(book, event.target.value)}
              >
                <option value="move" disabled>

                  Move to...
                </option>
                <option value="none"> None </option>
                <option value="currentlyReading"> Currently Reading </option>
                <option value="wantToRead"> Want to Read </option>
                <option value="read"> Read </option>
              </select>
            </div>
          </div>
          {/* Writing title and authors. */}
          <h3 className="book-title"> {book.title} </h3>
          <h4 className="book-authors"> {book.authors} </h4>
        </div>
      </li>
    );
  }
}

export default Book;
