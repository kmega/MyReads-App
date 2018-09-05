import React, {
    Component
} from 'react';
// Imported BooksAPI for search option to work.
import * as BooksAPI from './BooksAPI';
import Book from './Book';
// Component responsible for searching books.
class SearchOption extends Component {
    // State with user input.
    state = {
        query: '',
        searchResults: [],
        showNothing: false
    }
    // Search method for searching terms.
    search = (event) => {
        const query = event.target.value.trim()
        this.setState({
            query: query
        })
        // If user typed then start the search.
        if (query) {
            BooksAPI.search(query).then(notInShelves => {
                // If no error occurred proceed.
                if (!notInShelves.error) {
                    // Compare shelves in order to display correct books.
                    notInShelves.forEach((newBook) => {
                        this.props.books.forEach((onShelf) => {
                            if (onShelf.id === newBook.id) {
                                newBook.shelf = onShelf.shelf
                            } else {
                                newBook.shelf = 'none'
                            }
                        })
                    })
                    // After comparing show all books
                    this.setState({
                        searchResults: notInShelves,
                        showNothing: false
                    })
                }
                // If search terms aren't met or books can't be found then show empt page.
                else {
                    this.setState({
                        searchResults: [],
                        showNothing: true
                    })
                }
            })
        }
    }
    render() {
        const {
            changeShelf
        } = this.props;
        return ( <
            section className = 'app' >
            <
            input type = 'text'
            placeholder = 'Search by Title or Author'
            value = {
                this.state.query
            }
            onChange = {
                this.search
            }
            /> <
            div className = 'books-search-grid' > {
                this.state.searchResults.map(book => ( <
                    Book key = {
                        book.id
                    }
                    book = {
                        book
                    }
                    changeShelf = {
                        changeShelf
                    }
                    />
                ))
            } <
            /div> < /
            section >
        )
    }
}

export default SearchOption;
