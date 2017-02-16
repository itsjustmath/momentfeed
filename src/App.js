
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
        <p className="App-intro">
          {isLoading
            ? "Loading..."
            : null
          }

          {response
            ? response.items.length
            : null
          }
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
