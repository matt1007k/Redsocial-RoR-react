import React from 'react';
import { Post } from './post';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export class Posts extends React.Component{
  publications(){
    if (this.props.posts) {
      return this.props.posts.map( post => {
        return <Post key={post.id} html_content={post.html_content}></Post>;
      });
    }
    return "";
  }
  render(){
    return(
      <MuiThemeProvider>
        <div>
          {this.publications()}
        </div>
      </MuiThemeProvider>
    );
  }
}
