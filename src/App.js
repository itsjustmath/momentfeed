
// TODO: install eslint  / make semicolons consistent!
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
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
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
									<div className='media'>
										<div className='media-left'>
											<a href='#'>
												<img className='media-object' src={response.items[0].snippet.thumbnails.default.url} alt={response.items[0].snippet.title}/>
											</a>
										</div>
										<div className='media-body'>
											<h4 className='media-heading'>{response.items[0].snippet.title}</h4>
											<h5 className='text-muted'>by {response.items[0].snippet.channelTitle}</h5>
											<p>
												{response.items[0].snippet.description}
											</p>
										</div>
									</div>
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
