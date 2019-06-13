import React, { Component } from 'react'; 

type HeaderState = {
  time: Date,
  text: string,
  paragraph?: string,
}

class Header extends Component<{}, HeaderState> {
  static defaultProps = {
    text: 'Digital Leksehjelp',
    status: 'åpner kl. 17:00',

  }  

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.tick();
  }

  // After the component did mount, we set the state each second.
  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  // render will know everything!
  render() {
    return(
        <div>
            <p>{this.props['text'] + ' ' + this.props['status']}</p>
        
        </div>
    );
  }
}

export default Header;