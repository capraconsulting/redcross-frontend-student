import React, { Component } from 'react'; 

type FooterState = {
  text: string,
  link?: any,
}

class Header extends Component<{}, FooterState> {
  static defaultProps = {
    text: 'Følg oss på',
    link: {
        facebook:{
            url: 'https://www.facebook.com/digitalleksehjelp/',
            name: 'Facebook',
        },
    }
  }  

  // render will know everything!
  render() {
    return(
        <div>
            <p>{this.props['text'] + ' '}<a href={this.props['link']['facebook']['url']}>{this.props['link']['facebook']['name']}</a></p>
        </div>
    );
  }
}

const styles = {
    footer: {
        position: 'fixed',
        left: 0, 
        bottom: 0,
        width: '100%',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
    }
}

export default Header;