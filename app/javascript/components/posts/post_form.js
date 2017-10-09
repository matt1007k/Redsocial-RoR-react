import React from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import reqwest from 'reqwest';
import {redA400, blueA400, pink500} from 'material-ui/styles/colors';
import { markdown } from 'markdown';

const styles = {
  buttonStyle:{
    marginTop: '0,5em',
    marginBottom: '1.3em'
  }
}

export class PostForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      markdown_content: '',
      html_content: '',
      error: ''
    }
  }
  submit(){
    reqwest({
      url: '/posts.json',
      method:'POST',
      data:{
        post:{
          markdown_content: this.state.markdown_content,
          html_content: markdown.toHTML(this.state.markdown_content)
        }
      },
      headers:{
        'X-CSRF-Token': window.FacilitoSocial.token
      }
    }).then(post =>{
      this.props.add(post);
      console.log(post);
      this.refs.markdown_content.resetValue();
    }).catch(error => console.log(error));

  }

  synField(ev,FileName){
    let element = ev.target;
    let value = element.value;

    let jsonState = {};
    jsonState[FileName] = value;
    this.setState(jsonState);
  }
  render(){
    return(
      <MuiThemeProvider>
        <Formsy.Form onValidSubmit={() => this.submit()}>
          <FormsyText
            name="post[markdown_content]"
            required
            onChange={(e) => this.synField(e,'markdown_content')}
            ref="markdown_content"
            multiLine={true}
            fullWidth={true}
            floatingLabelText="Cuentanos que está pasando..."
            ></FormsyText>
            <div className="text-right">
              <RaisedButton
                type="submit"
                label="Publicar"
                backgroundColor={pink500}
                labelColor="#fff"
                style={styles.buttonStyle}
              />
            </div>
        </Formsy.Form>
      </MuiThemeProvider>
    );
  }
}
