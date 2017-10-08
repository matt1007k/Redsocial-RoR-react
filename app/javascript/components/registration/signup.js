import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';
import { Base,styles } from './base.js';
import reqwest from 'reqwest';

export class SignUp extends Base{

  submit(){
    reqwest({
      url: '/users.json',
      method: 'POST',
      data:{
        user:{
          email: this.state.email,
          password: this.state.password,
          passwordConfirmation: this.state.passwordConfirmation
        }
      },
      headers:{
        'X-CSRF-Token': window.FacilitoSocial.token
      }
    }).then( data => {
      console.log(data);
      this.reload();
    }).catch(error => this.handleErrors(error));
  }
  handleErrors(error){
    console.log(error);
    const jsonError = JSON.parse(error.response);
    const errors = jsonError.errors;
    let errorsReponse = [];

    for (let key in errors) {
       errorsReponse.push(<li key={key}>{errors[key]}</li>)
    }

    this.setState({
      error: errorsReponse
    });
  }
  render(){
      return (
        <MuiThemeProvider>
          <Formsy.Form onValid={() => this.enableSubmitBtn() }
                      onInvalid={() => this.disableSubmitBtn() }
                      onValidSubmit={ () => this.submit() }>

              <div>
                <ul>{this.state.error}</ul>
                <FormsyText
                  onChange={(ev) => this.synField(ev,"email") }
                  name="email"
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  validations="isEmail"
                  validationError="Ingrese un Correo Electrónico válido"
                  required
                  floatingLabelText="Correo Electrónico"
                  />
              </div>
              <div>
                <FormsyText
                  onChange={(ev) => this.synField(ev,"password") }
                  name="password"
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  required
                  type="Password"
                  floatingLabelText="Contraseña"
                  />
              </div>
              <div>
                <FormsyText
                  onChange={(ev) => this.synField(ev,"passwordConfirmation") }
                  name="passwordConfirmation"
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  underlineFocusStyle={styles.underLineStyle}
                  required
                  type="Password"
                  floatingLabelText="Confirmar Contraseña"
                  />
              </div>
              <div>
                <RaisedButton
                  style={styles.marginTop}
                  backgroundColor={styles.red}
                  labelColor="#ffffff"
                  disabled={!this.state.canSubmit}
                  type="submit"
                  label="Crear Cuenta"/>
                  <a href="#" onClick={ this.props.toggle } style={styles.leftSpace}>Ya tengo Cuenta</a>
              </div>
          </Formsy.Form>
        </MuiThemeProvider>
      );
  }
}
