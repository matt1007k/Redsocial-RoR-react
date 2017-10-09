import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import renderHTML from 'react-render-html';

export class Post extends React.Component{
  constructor(props){
    super(props);
  }
  content = () => {
    if (this.props.html_content) {
      return renderHTML(this.props.html_content);
    }else {
      return "";
    }
  }
  render(){
    return(
      <Card>
        <CardText>{this.content()}</CardText>
      </Card>
    );
  }
}
