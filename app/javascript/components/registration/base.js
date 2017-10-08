import React, { Component } from 'react';
import { blueA400, redA400 } from 'material-ui/styles/colors';

export class Base extends Component{
  constructor(props){
    super(props);

    this.state = {
      canSubmit: true,
      email: '',
      password: '',
      passwordConfirmation: '',
      error: ''
    }
  }

  enableSubmitBtn(){
    this.setState({
      canSubmit: true
    });
  }

  disableSubmitBtn(){
    this.setState({
      canSubmit: false
    });
  }
  synField(ev,FileName){
    let element = ev.target;
    let value = element.value;

    let jsonState = {};
    jsonState[FileName] = value;
    this.setState(jsonState);
  }
  reload(){
    window.location.href = window.location.href;
  }

}
export const styles = {
  buttonTop:{
    marginTop: '1em'
  },
  underLineStyle:{
    borderColor: blueA400
  },
  floatingLabelFocusStyle:{
    color: blueA400
  },
  leftSpace:{
    marginLeft: '1em'
  },
  red: redA400
};
