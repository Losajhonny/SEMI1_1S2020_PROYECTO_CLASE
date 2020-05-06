import React, { Component } from 'react';
import Pluma from './../../recursos/pluma.png';
import './Home.css';
import Conexion from '../../conexion/Conexion';

interface IHomeStates
{
    lenguajes: any;
    lenguajeActual: any;
    entrada: string;
    salida: string;
}

export default
class Home extends Component<any, IHomeStates>
{
    constructor(props: any) {
        super(props);

        this.state = {
            lenguajes: [
                {lenguaje: "Arabic", code:"arb"},
                {lenguaje: "Chinese, Mandarin", code: "cmn-CN"},
                {lenguaje: "Danish", code: "da-DK"},
                {lenguaje: "Dutch", code: "nl-NL"},
                {lenguaje: "English, Australian", code: "en-AU"},
                {lenguaje: "English, British", code: "en-GB"},
                {lenguaje: "English, Indian", code: "en-IN"},
                {lenguaje: "English, US", code: "en-US"},
                {lenguaje: "English, Welsh", code: "en-GB-WLS"},
                {lenguaje: "French", code: "fr-FR"},
                {lenguaje: "French, Canadian", code: "fr-CA"},
                {lenguaje: "Hindi", code: "hi-IN"},
                {lenguaje: "German", code: "de-DE"},
                {lenguaje: "Icelandic", code: "is-IS"},
                {lenguaje: "Italian", code: "it-IT"},
                {lenguaje: "Japanese", code: "ja-JP"},
                {lenguaje: "Korean", code: "ko-KR"},
                {lenguaje: "Norwegian", code: "nb-NO"},
                {lenguaje: "Polish", code: "pl-PL"},
                {lenguaje: "Portuguese, Brazilian", code: "pt-BR"},
                {lenguaje: "Portuguese, European", code: "pt-PT"},
                {lenguaje: "Romanian", code: "ro-RO"},
                {lenguaje: "Russian", code: "ru-RU"},
                {lenguaje: "Spanish, European", code: "es-ES"},
                {lenguaje: "Spanish, Mexican", code: "es-MX"},
                {lenguaje: "Spanish, US", code: "es-US"},
                {lenguaje: "Swedish", code: "sv-SE"},
                {lenguaje: "Turkish", code: "tr-TR"},
                {lenguaje: "Welsh", code: "cy-GB"}
            ],
            lenguajeActual: null,
            entrada: "",
            salida: ""
        };

        this.changeEntrada = this.changeEntrada.bind(this);
        this.changeSalida = this.changeSalida.bind(this);
        this.eventTraducir = this.eventTraducir.bind(this);
        this.eventVoz = this.eventVoz.bind(this);
        this.selectLenguaje = this.selectLenguaje.bind(this);
    }

    changeEntrada(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ entrada: e.target.value });
    }

    changeSalida(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ salida: e.target.value });
    }

    selectLenguaje(e: React.ChangeEvent<HTMLSelectElement>) {
        const { lenguajes } = this.state;
        this.setState({ lenguajeActual: lenguajes[e.target.value] });
    }

    async eventTraducir() {
        const { entrada } = this.state;
        console.log("btn-traducir");

        if(entrada === "") return;

        let info = {
            text: entrada,
            target: "es"
        };

        let res = await Conexion.getInstance().POST(info, Conexion.locationTraducir);

        if(res === null) {
            console.log("error conexion");
            return;
        }

        if(res.status === 500) {
            console.log(res.message);
            return;
        }
        
        this.setState({ salida: res.data.TranslatedText });
    }

    async eventVoz() {
        const { salida } = this.state;
        console.log("btn-voz");

        if(salida === "") return;

        let info = {
            text: salida,
            voice: "Penelope"
        }

        let res = await Conexion.getInstance().POST(info, Conexion.locationPolly);

        if(res === null) {
            console.log("error conexion");
            return;
        }

        if(res.status === 500) {
            console.log(res.message);
            return;
        }
        
        let data = res.data;

        var uint8Array = new Uint8Array(data.AudioStream.data);
        var arrayBuffer = uint8Array.buffer;
        var blob = new Blob([arrayBuffer]);
        var url = URL.createObjectURL(blob);

        var sonido = new Audio(url.toString());
        sonido.play();
    }

    render()
    {
        const { lenguajes, entrada, salida } = this.state;
        const arrayLenguajes = [];

        for(let i = 0; i < lenguajes.length; i++)
        {
            arrayLenguajes.push(
                <option key={i.toString()} value={i.toString()}>{lenguajes[i].lenguaje}</option>
            )
        }

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
                        <textarea
                            className="form-control"
                            rows={5} id="entrada"
                            placeholder="Escribe aqui"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.changeEntrada(e)}
                            value={entrada}
                            />
                    </div>

                    <div className="form-group">
                        <label className="text-muted" htmlFor="in-lenguajes">Lenguajes</label>
                        <select className="custom-select" id="in-lenguajes" defaultValue="Choose..." onChange={e => this.selectLenguaje(e)}>
                            <option>Choose...</option>
                            {arrayLenguajes}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="text-muted" htmlFor="salida">Salida</label>
                        <textarea
                            className="form-control"
                            rows={5} id="salida"
                            placeholder="Texto traducido"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => this.changeSalida(e)}
                            value={salida}
                            />
                    </div>

                    <button className="btn btn-lg btn-primary mr-2" onClick={this.eventTraducir}>Traducir</button>
                    <button className="btn btn-lg btn-warning"onClick={this.eventVoz}>Voz</button>
                </div>
            </div>
        );
    }
}
