import React from 'react';
import WebpackerReact from 'webpacker-react';
import { Posts } from '../components/posts/posts';
import reqwest from 'reqwest';
import { PostForm } from '../components/posts/post_form';

class PostGroup extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        posts: []
    }

    this.add = this.add.bind(this);
  }
  add(post){
    this.setState({
      posts: [post].concat(this.state.posts)
    })
  }
  componentDidMount(){
    this.getPosts();
  }

  getPosts(){
    reqwest({
      url: '/posts.json',
      method: 'GET'
      }).then( posts => {
        this.setState({posts})
        console.log(this.state.posts);
      }).catch(error => console.log(error));
  }
  render() {
    return(
      <div>
        <PostForm add={this.add}></PostForm>
        <Posts posts={this.state.posts}></Posts>
      </div>

    );
  }
}

WebpackerReact.setup({PostGroup})
