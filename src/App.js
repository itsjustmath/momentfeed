import React, { Component } from 'react';
import SearchForm from './components/SearchForm';
import MediaObject from './components/MediaObject';
import logo from './logo.png';
import './App.css';

class App extends Component {

  constructor(...args) {
    super(...args);
		this.state = {value: ''};

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadApi(gapi) {
    return () => {
      gapi.client.init({
        apiKey: 'AIzaSyD1yWAAWAIXxCkwFyiB64k2sIutXNg978Y'
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
    }
  }

  search(query) {
    const {isLoaded, gapi} = this.state;

    if (!isLoaded) return;

    const request = gapi.client.youtube.search.list({
      q: query,
      part: 'snippet',
			type: 'video'
    });

    this.setState({ isLoading: true });

    request.execute((response) => {
      this.setState({
        isLoading: false,
        response
      });
    });
  }

	handleClick(e) {
		this.search('Never Gonna Give You Up');
		this.setState({value: ''});
	}

	handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
		this.search(this.state.value);
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
            <img src={logo} className="App-logo" alt="logo" onClick={this.handleClick} />
            <h2 className='App-headerText'>YouTube Search Widget</h2>
            <SearchForm
              value={value}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </div>
        </div>

        <div className='App-body'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2'>
                {response ?
                  <div className='App-intro'>
                    {isLoading ?
                      <div>
                        <div className='loader'></div>
                      </div> : null
                    }
                  </div> : null
                }
                <div className='App-searchResults'>
                  {response ?
                    <div>
                      {response.items.map((items, index) => (
                        <MediaObject
                          items={items}
                          key={index}
                        />
                      ))}
                    </div> : null
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
