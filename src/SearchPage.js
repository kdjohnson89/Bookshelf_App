import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class SearchPage extends Component {
	// return books that are relative to the search
	state = { query: '', booksSearched: [] }
	
	updateQuery = (query) => {
		this.setState({ query })
		this.updateBooksSearched(query);
	}
	// if there is a query, fetch the books
	// if there is an error or no match, return nothing through empty array
	updateBooksSearched = (query) => {
		if (query) {
			BooksAPI.search(query).then((booksSearched) => {
			  if (booksSearched.error) {
				  this.setState({ booksSearched : [] });
				}
					else {
						this.setState({ booksSearched });
					}
			 })
		 }
		}
	
	render () {
		return (
			<div className="search-books">
			  <div className="search-books-bar">
					<Link to="/" className="close-search">Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
				  <ol className="books-grid">
						{
						this.state.booksSearched.map(booksSearched => {
								let shelf = "none";
								this.props.books.map(book => (book.id === booksSearched.id ?
																							shelf = book.shelf : '' ))
																				 
								return (
								  <li key ={booksSearched.id}>
									  <Book
									    book={booksSearched}
										  updateBook={this.props.updateBook}
										  currentShelf = { shelf } />
								  </li>);
							 })
						}
						</ol>
				</div>
			</div>
		);
	}
}

export default SearchPage;
