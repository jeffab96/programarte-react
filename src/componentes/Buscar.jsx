import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/menu.css'
const URL_BUSCAR = "https://programartephp.azurewebsites.net/buscar_jugador.php";
//const URL_BUSCAR = "http://localhost/gabriel_A/buscar_jugador.php";

export default function Buscar(props) {

    //Estado que almacena los datos de los jugadores
    const [jugadores, setJugadores] = useState([]);

    //Estados y métodos que se cargan del formulario
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Evento que se lanza cuando se da click en el botón buscar del formulario
    const onSubmit = data => {
        console.log(data);
        enviarDatos(data);
    };
    console.log(errors);

    //Evento que se encarga de convertir el id en un objeto tipo JSON y envía al servidor los datos
    const enviarDatos = (data) => {
        fetch(URL_BUSCAR, {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(data)
        })
            .then(resp => resp.json()) //Transforma la respuesta de tipo JSON en un objeto de React
            .then(json => {
                console.log(json);
                setJugadores(json); //Guarda de "jugadores" los datos "json" obtenidos del servidor
                if (json.length === 0) {
                    //Programar alerta de que no se encontró ninguna coincidencia
                    console.log("no se encontró ninguna coincidencia");
                }
            })
    }

    return (
        <div>
            <div className='menu'>
                <div className="card text-dark bg-light mb-3" style={{ maxWidth: "300px" }}>
                    <div className="card-header" style={{ textAlign: "center" }}>
                        <h5>Buscar Jugador</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                className='text-center'
                                type="text"
                                placeholder="Ingrese el ID del jugador" {...register("id", {})}//"id" igual que en la base de datos
                                style={{ width: "250px" }} />
                            <br />
                            <br />
                            <input
                                className="btn btn-dark"
                                type="submit"
                                style={{ width: "250px" }} />
                        </form>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container mt-5">
                <h4>RESULTADOS BÚSQUEDA</h4>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Nickname</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Ranking</th>
                                    <th scope="col">Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jugadores.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nickname}</td>
                                        <td>{item.status}</td>
                                        <td>{item.ranking}</td>
                                        <td className="rowAvatares">
                                        <img className="avatares"
                                            src={item.avatar}
                                            alt="icono"
                                        />
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
