import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class App extends Component {

  constructor(...args) {
    super(...args);
		this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadApi(gapi) {
    return () => {
      gapi.client.init({
        apiKey: "AIzaSyD1yWAAWAIXxCkwFyiB64k2sIutXNg978Y"
      })
      .then(() => {
        return gapi.client.load('youtube', 'v3');
      })
      .then(() => {
        this.setState({
          gapi,
          isLoaded: true
        });
        return Promise.resolve();
      })
      .then(() => {
        this.search("momentfeed");
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

    this.setState({ isLoading: true });

    request.execute((response) => {
			// console.log(response);
      this.setState({
        isLoading: false,
        response
      });
    });
  }

	handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
		console.log(this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
    gapi.load('client', this.loadApi(gapi)) // eslint-disable-line no-undef
  }

  render() {

    const { isLoading, response, value } = this.state;

    return (
      <div className="App">
        <div className="App-header">
					<div className='container'>
						<img src={logo} className="App-logo" alt="logo" />
						<h2 className='App-headerText'>YouTube Search Widget</h2>
						<form className='App-searchForm' onSubmit={this.handleSubmit}>
							<div className='row'>
								<div className='col-md-4 col-md-offset-4'>
									<div className='input-group'>
										<input type='text' value={value} onChange={this.handleChange} className='form-control' placeholder='Search YouTube for videos...'/>
										<span className='input-group-btn'>
											<button className='btn btn-primary' type="submit" value="Submit">Search</button>
										</span>
									</div>
								</div>
							</div>
			      </form>
					</div>
        </div>

				<div className='App-body'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-8 col-md-offset-2'>
								<p className='App-intro lead'>
									{isLoading
										? 'Loading...'
										: null
									}

									{response
										? 'Results returned for [QUERY]'
										: null
									}
								</p>

								<div className='App-searchResults'>
									{response ?
											<div>
												{response.items.map((items, index) => (
													<div className='media' key={index}>
														<div className='media-left'>
															<a href={`https://www.youtube.com/watch?v=`+items.id.videoId} target='_blank' alt={items.snippet.title}>
																<img className='media-object' src={items.snippet.thumbnails.default.url} alt={items.snippet.title}/>
															</a>
														</div>
														<div className='media-body'>
															<h4 className='media-heading'>
																<a href={`https://www.youtube.com/watch?v=`+items.id.videoId} target="_blank" alt={items.snippet.title}>{items.snippet.title}</a>
															</h4>
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
					</div>
				</div>
      </div>
    );
  }
}

export default App;
