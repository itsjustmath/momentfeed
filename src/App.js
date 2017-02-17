import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(...args) {
    super(...args)
    this.state = {}
  }

  loadApi(gapi) {
    return () => {
      gapi.client.init({
        apiKey: "AIzaSyD1yWAAWAIXxCkwFyiB64k2sIutXNg978Y"
      })
      .then(() => {
        return gapi.client.load('youtube', 'v3')
      })
      .then(() => {
        this.setState({
          gapi,
          isLoaded: true
        })
        return Promise.resolve();
      })
      .then(() => {
        this.search("javascript");
      })
    }
  }

  search(query) {
    const {isLoaded, gapi} = this.state;

    if (!isLoaded) return;

    const request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet'
    });

    this.setState({ isLoading: true })

    request.execute((response) => {
			console.log(response);
      this.setState({
        isLoading: false,
        response
      })
    });
  }

  componentDidMount() {
    gapi.load('client', this.loadApi(gapi)) // eslint-disable-line no-undef
  }

  render() {
    const { isLoading, response } = this.state;

    return (
      <div className="App">
        <div className="App-header">
					<div className='container'>
						<img src={logo} className="App-logo" alt="logo" />
						<h2>YouTube Search</h2>

						<div className='App-searchForm'>
							<div className='form-group'>
								<input type='text' className='form-control' placeholder='Search'/>
							</div>
							<button type='submit' className='btn btn-default'>Submit</button>
						</div>
					</div>
        </div>

				<div className='App-body'>
					<p className="App-intro">
	          {isLoading
	            ? "Loading..."
	            : null
	          }

	          {response
	            ? response.items.length + " results returned"
	            : null
	          }
					</p>

					<div className='App-searchResults'>
						{response ?
								<div>
									{response.items.map((items) => (
										<div className='media'>
											<div className='media-left'>
												<a href='#'>
													<img className='media-object' src={items.snippet.thumbnails.default.url} alt={items.snippet.title}/>
												</a>
											</div>
											<div className='media-body'>
												<h4 className='media-heading'>{items.snippet.title}</h4>
												<h5 className='text-muted'>by {items.snippet.channelTitle}</h5>
												<p>
													{items.snippet.description}
												</p>
											</div>
										</div>
									))}
								</div>
							: null
						}
					</div>
				</div>
      </div>
    );
  }
}

export default App;
