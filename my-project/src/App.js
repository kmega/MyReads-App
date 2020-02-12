import React from "react";
import "./App.css";
// Imported BooksAPI as suggested.
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import { HashRouter as Router } from "react-router-dom";
import BookShelf from "./BookShelf";
import SearchOption from "./SearchOption";
// State with all books.
class BooksApp extends React.Component {
  state = {
    books: []
  };
  // Render books that are currently at shelves.
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });
  }
  // A function that changes shelf based on initial value.
  changeShelf = (targetBook, targetShelf) => {
    BooksAPI.update(targetBook, targetShelf).then(() => {
      targetBook.shelf = targetShelf;
      this.setState({
        // Place the book at respective shelf.
        books: this.state.books
          .filter(t => t.id !== targetBook.id)
          .concat(targetBook)
      });
    });
  };
  render() {
    // Currently available shelves and their names.
    const bookStatus = [
      {
        status: "currentlyReading",
        statusName: "Currently Reading"
      },
      {
        status: "wantToRead",
        statusName: "Want to Read"
      },
      {
        status: "read",
        statusName: "Read"
      }
    ];
    // Here application starts.
    return (
      <div className="app">
        <div className="open-search">
          <a href="/search"> Add a book </a>
        </div>
        {/* Creating main route for rendering purposes. */}
        <Router basename="/my-project">
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1> MyReads </h1>
                </div>
                <div className="list-books-content">

                  {/* Render books that initially are at begining. */}
                  <div>

                    {bookStatus.map((shelf, iteration) => {
                      const books = this.state.books.filter(
                        book => book.shelf === shelf.status
                      );
                      return (
                        <BookShelf
                          key={shelf.status}
                          books={books}
                          shelf={shelf.statusName}
                          changeShelf={this.changeShelf}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          />
        </Router>
        {/* Creating search route for rendering purposes. */}
        <Route
          exact
          path="/search"
          render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <a className="close-search" href="/">

                  Close
                </a>
                <div className="search-books-input-wrapper">
                  <SearchOption
                    type="text"
                    placeholder="Search by title or author"
                    books={this.state.books}
                    changeShelf={this.changeShelf}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"> </ol>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
