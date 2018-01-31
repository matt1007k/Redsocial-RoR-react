import React from 'react';
import reqwest from 'reqwest';

const styles = {
  image: {
    height: "80px"
  }
}

export default class Uploader extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      progress: 0,
      id: 0,
      imageURL: ''
    }
  }

  componentDidMount(){
    this.getImageUrl();
    this.upload();
  }

  getImageUrl(){
    let imageURL = URL.createObjectURL(this.props.image);
    this.setState({
      imageURL: imageURL
    })
  }
  image(){
    if (this.state.imageURL) {
      return <img src={this.state.imageURL} style={styles.image} />
    }
    return "";

  }

  upload(){
    //Intanciamos el metodo ajax XMLHttpRequest
    let xhr = new XMLHttpRequest();
    // Iniciamos una petición de method: POST a '/images.json'
    xhr.open('POST', '/images.json');
    // Esperamos cuendo se este enviamos o cargando el envió con onload()
    xhr.onload = (ev) => {
      if (ev.lengthComputable) {
        let progress = (ev.loaded / ev.total) * 100;
        console.log(progress);
      }
    }
    // Esperamos si la petición se hizo con exitó 200 = 4
    xhr.onreadystatechange = (ev) =>{
      if (xhr.readyState == 4) {
        console.log("Ya terminó la subida");
      }
    }
    // Enviamos también en headers en la petición el TOKEN DE RAILS
    xhr.setRequestHeader('X-CSRF-Token', window.FacilitoSocial.token);
    // Enviamos los datos al servidor con el método send()
    xhr.send(this.formData());
  }

  formData(){
    let formData = new FormData();

    formData.append('image[image_file]',this.props.image);

    return formData;
  }

  render(){
    return(
      <div>
        {this.image()}
      </div>
    );
  }
}
