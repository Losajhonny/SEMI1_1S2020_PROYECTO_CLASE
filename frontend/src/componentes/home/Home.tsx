import React, { Component } from 'react';
import Pluma from './../../recursos/pluma.png';
import './Home.css';
import Conexion from '../../conexion/Conexion';

interface IHomeStates
{
    lenguajes: any;
    currentLenguaje: any;
    currentVoice: any;
    entrada: string;
    salida: string;
    refSelectLenguaje?: any;
    refSelectVoice?: any;
}

export default
class Home extends Component<any, IHomeStates>
{
    constructor(props: any) {
        super(props);

        this.state = {
            lenguajes: [
                {lenguaje: "Aleman", voice: ["Marlene", "Vicki", "Hans"], code: "da-DE", trans: "de"},
                {lenguaje: "Chino", voice: ["Zhiyu"], code: "cmn-CN", trans: "zh-TW"},
                {lenguaje: "Coreano", voice: ["Seoyeon"], code: "ko-KR", trans: "ko"},
                {lenguaje: "Danes", voice: ["Naja", "Mads"], code: "da-DK", trans: "da"},
                {lenguaje: "Español (EE.UU.)", voice: ["Penelope", "Lupe", "Miguel"], code: "es-US", trans: "es"},
                {lenguaje: "Español (España)", voice: ["Lucia", "Conchita", "Enrique"], code: "es-ES", trans: "es"},
                {lenguaje: "Español (Mexico)", voice: ["Mia"], code: "es-MX", trans: "es-MX"},
                {lenguaje: "Frences", voice: ["Celine", "Lea", "Mathieu"], code: "fr-FR", trans: "fr"},
                {lenguaje: "Frances (Canada)", voice: ["Chantal"], code: "fr-CA", trans: "fr-CA"},
                {lenguaje: "Gales", voice: ["Gwyneth"], code: "cy-GB", trans: "cy"},
                {lenguaje: "Hindi", voice: ["Aditi"], code: "hi-IN", trans: "hi"},
                {lenguaje: "Holandes", voice: ["Lotte", "Ruben"], code: "nl-NL", trans: "nl"},
                {lenguaje: "Ingles (Australia)", voice: ["Nicole", "Russell"], code: "en-AU", trans: "en"},
                {lenguaje: "Ingles (EE. UU.)", voice: ["Salli", "Joanna", "Ivy", "Kendra", "Kimberly", "Matthew", "Justin", "Joey"], code: "en-US", trans: "en"},
                {lenguaje: "Ingles (Gales)", voice: ["Geraint"], code: "en-GB-WLS", trans: "en"},
                {lenguaje: "Ingles (India)", voice: ["Raveena", "Aditi"], code: "en-IN", trans: "en"},
                {lenguaje: "Ingles (Reino Unido)", voice: ["Amy", "Emma", "Brian"], code: "en-GB", trans: "en"},
                {lenguaje: "Islandes", voice: ["Dora", "Karl"], code: "is-IS", trans: "id"},
                {lenguaje: "Italiano", voice: ["Bianca", "Carla", "Giorgio"], code: "it-IT", trans: "it"},
                {lenguaje: "Japones", voice: ["Mizuki", "Takumi"], code: "ja-JP", trans: "ja"},
                /*{lenguaje: "Noruego", voice: ["Liv"], code: "ng-NO", trans: "ng"},*/
                {lenguaje: "Polaco", voice: ["Ewa", "Maja", "Jacek", "Jan"], code: "pl-PL", trans: "pl"},
                {lenguaje: "Portugues", voice: ["Ines", "Cristiano"], code: "pt-PT", trans: "pt"},
                {lenguaje: "Portugues (Brasil)", voice: ["Vitoria", "Camila", "Ricardo"], code: "pt-BR", trans: "pt"},
                {lenguaje: "Rumano", voice: ["Carmen"], code: "ro-RO", trans: "ro"},
                {lenguaje: "Ruso", voice: ["Tatyana", "Maxim"], code: "ru-RU", trans: "ru"},
                {lenguaje: "Sueco", voice: ["Astrid"], code: "sv-SE", trans: "sv"},
                {lenguaje: "Turco", voice: ["Filiz"], code: "tr-TR", trans: "tr"},
                {lenguaje: "Arabe", voice: ["Zeina"], code: "arb", trans: "ar"}
            ],
            currentLenguaje: null,
            currentVoice: null,
            entrada: "",
            salida: ""
        };

        this.changeEntrada = this.changeEntrada.bind(this);
        this.changeSalida = this.changeSalida.bind(this);
        this.eventTraducir = this.eventTraducir.bind(this);
        this.eventVoz = this.eventVoz.bind(this);
        this.selectLenguaje = this.selectLenguaje.bind(this);
        this.selectVoice = this.selectVoice.bind(this);
    }

    changeEntrada(e: React.ChangeEvent<HTMLTextAreaElement>) {
        // cambiar entrada de texto
        this.setState({ entrada: e.target.value });
    }

    changeSalida(e: React.ChangeEvent<HTMLTextAreaElement>) {
        // cambiar salida de texto
        this.setState({ salida: e.target.value });
    }

    selectLenguaje(e: React.ChangeEvent<HTMLSelectElement>) {
        // obtener los lenguajes que hay
        const { lenguajes } = this.state;

        // obtener el lenguaje actual
        this.setState({ currentLenguaje: lenguajes[e.target.value], currentVoice: null });
    }

    selectVoice(e: React.ChangeEvent<HTMLSelectElement>) {
        // obtener lenguaje actual
        const { currentLenguaje } = this.state;

        // obtener voz actual
        this.setState({ currentVoice: currentLenguaje.voice[e.target.value] });
    }

    async eventTraducir() {
        // test event
        // console.log("btn-traducir");

        // obtener datos
        const { entrada, currentLenguaje } = this.state;

        if(entrada === "") return;
        if(currentLenguaje === null) return;

        let info = {
            text: entrada,
            target: currentLenguaje.trans
        };

        // consumir servicio post api gateway
        let res = await Conexion.getInstance().POST(info, Conexion.locationTraducir);

        // validar respuesta
        if(res === null) {
            console.log("error conexion");
            return;
        }

        if(res.status === 500) {
            console.log(res.message);
            return;
        }

        if(res.data === null) return;
        
        // success
        this.setState({ salida: res.data.TranslatedText });
    }

    async eventVoz() {
        // test event
        // console.log("btn-voz");

        // obtener datos
        const { salida, currentVoice } = this.state;

        if(salida === "") return;
        if(currentVoice === null) return;

        let info = {
            text: salida,
            voice: currentVoice
        }

        // consumir servicio post api gateway
        let res = await Conexion.getInstance().POST(info, Conexion.locationPolly);

        // validar respuestas
        if(res === null) {
            console.log("error conexion");
            return;
        }

        if(res.status === 500) {
            console.log(res.message);
            return;
        }
        
        if(res.data === null) return;
        
        // success
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
        const { lenguajes, entrada, salida, currentLenguaje } = this.state;
        const arrayLenguajes = [];
        const arrayVoices = [];

        for(let i = 0; i < lenguajes.length; i++)
        {
            arrayLenguajes.push(
                <option key={i.toString()} value={i.toString()}>{lenguajes[i].lenguaje}</option>
            )
        }

        if(currentLenguaje !== null) {
            for(let i = 0; i < currentLenguaje.voice.length; i++)
            {
                arrayVoices.push(
                    <option key={i.toString()} value={i.toString()}>{currentLenguaje.voice[i]}</option>
                )
            }
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
                        <label className="text-muted" htmlFor="in-lenguajes">Lenguaje</label>
                        <select
                            className="custom-select"
                            id="in-lenguajes"
                            defaultValue="Choose lenguaje..."
                            onChange={e => this.selectLenguaje(e)}
                            >
                            <option>Choose lenguaje...</option>
                            {arrayLenguajes}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="text-muted" htmlFor="voices">Voz</label>
                        <select
                            className="custom-select"
                            id="voices"
                            defaultValue="Choose voice..."
                            onChange={e => this.selectVoice(e)}
                            >
                            <option>Choose voice...</option>
                            {arrayVoices}
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
