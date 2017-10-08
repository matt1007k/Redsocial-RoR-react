import React from 'react';
import WebpackerReact from 'webpacker-react';
import { Posts } from '../components/posts/posts';
import reqwest from 'reqwest';

class PostGroup extends React.Component {

  constructor(props){
    super(props);

    this.State = {
        posts: []
    }
  }

  componentDidMount(){
    this.getPosts();
  }

  getPosts(){
    reqwest({
      url: '/posts.json',
      method: 'GET'
      }).then( posts => {
        this.setState({posts:posts})
        console.log(posts.id);
      }).catch(error => console.log(error));
  }
  render() {
    return(
      <Posts posts={this.State.posts}></Posts>
    );
  }
}

WebpackerReact.setup({PostGroup})
