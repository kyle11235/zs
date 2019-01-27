class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // xxx
    
    return <div>
      <LikeButton/><br/>
      <LikeButton/><br/>
      <LikeButton/><br/>
    </div>
  }
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return <button onClick={() => this.setState({ liked: true })} >Like</button>

  }
}

ReactDOM.render(<App/>, document.getElementById('root'));