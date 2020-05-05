import React, { Component } from 'react';
import Pluma from './../../recursos/pluma.png';
import './Home.css';

interface IHomeStates
{
    lenguajes: any;
    entrada: string;
    salida: string;
}

export default
class Home extends Component<any, IHomeStates>
{
    constructor(props: any) {
        super(props);

        this.state = {
            lenguajes: [],
            entrada: "",
            salida: ""
        };

        this.changeEntrada = this.changeEntrada.bind(this);
        this.changeSalida = this.changeSalida.bind(this);
        this.eventTraducir = this.eventTraducir.bind(this);
        this.eventVoz = this.eventVoz.bind(this);
    }

    changeEntrada() {}

    changeSalida() {}

    eventTraducir() {}

    eventVoz() {}

    render()
    {
        return (
            <div className="body bg-dark">
                <div className="formulario bg-light mx-4 my-5 rounded">
                    <div className="content-center">
                        <div className="d-flex content-center">
                            <div>
                                <img src={Pluma} className="img-fluid" width={100} alt="entrada"/>
                            </div>
                            <div className="col p-2"><h1>InvoGuate</h1></div>
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label className="text-muted" htmlFor="entrada">Entrada</label>
                        <textarea className="form-control" rows={5} id="entrada" placeholder="Escribe aqui"></textarea>
                    </div>

                    <div className="form-group">
                        <label className="text-muted" htmlFor="in-lenguajes">Lenguajes</label>
                        <select className="custom-select" id="in-lenguajes">
                            <option selected>Choose...</option>
                            <option value="1">us</option>
                            <option value="2">es</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="text-muted" htmlFor="salida">Salida</label>
                        <textarea className="form-control" rows={5} id="salida" placeholder="Texto traducido"></textarea>
                    </div>

                    <button className="btn btn-lg btn-primary mr-2">Traducir</button>
                    <button className="btn btn-lg btn-warning">Voz</button>
                </div>
            </div>
        );
    }
}
