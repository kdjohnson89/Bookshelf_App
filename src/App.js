import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './MainPage';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
	state = { books: [] }
	// get all books in bookshelf from BooksAPI.js
	componentDidMount() {
		BooksAPI.getAll().then((books) => {this.setState({ books })
	  })
	}
	// update book placement on shelf
	updateBook = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
																			BooksAPI.getAll().then((books) => {
																														 this.setState({ books })
																														 })
																			})
	}

	
  render() {
		
    return (
      <div className="app">
						<Route exact path="/" render={ () => (
						  <MainPage books={this.state.books}
												updateBook={this.updateBook} />
						)} />
						<Route exact path="/search" render={ () => (
						  <SearchPage books={this.state.books}
													updateBook={this.updateBook} />
					  )} />
						
      </div>
    )
  }
}

export default BooksApp
