import React, { Component } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import axios from 'axios';

class App extends Component {

  state = {
    monedas : [],
    cotizacion: {},
    monedaCotizada: ''
  }

  async componentDidMount() {
    this.obtenerMonedas();
  }

  obtenerMonedas = async () => {
    const url = `https://api.coinmarketcap.com/v2/ticker/`;

    await axios.get(url)
      .then(respuesta => {
        this.setState({
          monedas: respuesta.data.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  //cotizar una crypto en base a una moneda
  obtenerValoresCrypto = async (monedas) => {
    const {moneda, crypto} = monedas;

    const url = `https://api.coinmarketcap.com/v2/ticker/${crypto}/?convert=${moneda}`;

    await axios.get(url)
      .then(respuesta => {
          this.setState({
            cotizacion: respuesta.data.data,
            monedaCotizada: moneda
          })
      })
  }


  render() {
    return (
      <div className="container">
        <Header 
          titulo="Cotiza Criptomonedas al Instante"
        />
       <div className="row justify-content-center">
          <div className="col-md-6 bg-light pb-4 contenido-principal">
            <Formulario 
              monedas={this.state.monedas}
              obtenerValoresCrypto={this.obtenerValoresCrypto}
            />
          </div>   
       </div>
      </div>
    );
  }
}

export default App;
