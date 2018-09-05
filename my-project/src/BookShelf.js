import React, {
    Component
} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
// Component responsible for rendering book shelves.
class BookShelf extends Component {
    static propTypes = {
        // PropTypes for proper data definition.
        books: PropTypes.array.isRequired,
        shelf: PropTypes.string.isRequired,
        changeShelf: PropTypes.func.isRequired
    }
    render() {
            const {
                books,
                shelf,
                changeShelf
            } = this.props;
            return (
                // Creating book shelves.
                <
                div className = 'bookshelf' >
                <
                h2 className = 'bookshelf-title' > {
                    shelf
                } < /h2> <
                div className = 'bookshelf-books' >
                <
                ul className = 'books-grid' > {
                    // Going through books in order to render them at their respective shelves.
                    books.map((book) => ( < Book key = {
                                book.id
                            }
                            books = {
                                books
                            }
                            book = {
                                book
                            }
                            changeShelf = {
                                changeShelf
                            }
                            />))
                        } < /ul> <
                        /div> <
                        /div>
                    )
                }
            }

            export default BookShelf
