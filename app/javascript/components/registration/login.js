import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FormsyText from 'formsy-material-ui/lib/FormsyText';
import RaisedButton from 'material-ui/RaisedButton';

import { Base, styles } from './base.js';
import reqwest from 'reqwest';

export class Login extends Base{
  submit(){
    reqwest({
      url: '/users/sign_in.json',
      method: 'POST',
      data:{
        user:{
          email: this.state.email,
          password: this.state.password
        }
      },
      headers:{
        'X-CSRF-Token': window.FacilitoSocial.token
      }
    }).then( data => {
      console.log(data);
      this.reload();
    }).catch(error => this.handleError(error));
  }
  handleError(erro){
    let errorLogin = JSON.parse(erro.response).error;
    this.setState({
      error: errorLogin
    });
  }

  render(){
      return (
        <MuiThemeProvider>
          <Formsy.Form onValid={() => this.enableSubmitBtn() }
                      onValidSubmit={ () => this.submit() }
                      onInvalid={() => this.disableSubmitBtn() }>
              <div>{this.state.error}</div>
              <div>
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
                <RaisedButton
                  style={styles.marginTop}
                  backgroundColor={styles.red}
                  labelColor="#fff"
                  disabled={!this.state.canSubmit}
                  type="submit"
                  label="Iniciar Sesión"/>
                  <a href="#" onClick={ this.props.toggle } style={styles.leftSpace}>Crear Cuenta</a>
              </div>
          </Formsy.Form>
        </MuiThemeProvider>
      );
  }
}
