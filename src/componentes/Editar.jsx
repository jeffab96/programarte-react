import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import '../css/menu.css'

const URL_EDITAR_JUGADORES = "http://localhost/gabriel_A/editar_jugador.php";
//const avatares = imageName => (require('./assets/${avatar1.png}').default);

export default function Editar(props) {
    //Constante donde se guarda la información obtenida de la base de datos
    const [jugadores, setJugadores] = useState([]);

    //Constante donde se guarda la información del jugador que se quiere editar
    const [jugador, setJugador] = useState(null);


    //Métodos del modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Estados y métodos que se cargan del formulario
    const { register, handleSubmit, formState: { errors } } = useForm();

    //Evento que se lanza cuando se da click en el botón guardar del formulario
    const onSubmit = data => {
        console.log(data);
        handleClose();
        enviarDatos(data);
    };
    console.log(errors);

    //Ciclo de vida: cuando el componente está recién cargado
    useEffect(() => {
        getDatos()
    }, []);

    //Método que obtiene la información de la base de datos
    const getDatos = () => {
        fetch(URL_EDITAR_JUGADORES)
            .then(response => response.json())
            .then(datos => {
                setJugadores(datos)
                if (datos.length === 0) {
                    //Programar alerta de que no se encontró ninguna coincidencia
                    console.log("no se encontró ninguna coincidencia");
                }
            })
    }

    //Método que envía la información para actualizar en la base de datos
    const enviarDatos = (data) => {
        fetch(URL_EDITAR_JUGADORES, {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
                if (json[0].isOk) {//Si el mensaje obtenido del servidor es true (se actualizó correctamente)
                    getDatos();
                } else {
                    console.log("Error en la actualizacción de la base de datos");
                    getDatos();
                }
            })
    }

    //Evento que se ejecuta cuando presionamos el "lápiz" para editar un jugador
    const handleEditar = (event) => {
        let id = event.target.id;
        setJugador(buscarID(jugadores, id));
        handleShow();
    }

    //Evento para buscar el jugador por el ID para editar su información
    const buscarID = (array, id) => {
        let tempUsuario = null;
        for (let index = 0; index < array.length; index++) {
            if (array[index].id === id) {
                tempUsuario = array[index];
            }
        }
        return tempUsuario;
    }

    //Evento que maneja un Modal para mostrar la información del usuario
    const modalEdit = (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edición de Jugador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    jugador &&
                    <form id='formularioModal1' onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
                        <img id="iconoPrincipal" role="button" className='avatares' src={jugador.avatar} alt="icono" />
                        <br />
                        <div>
                            <br />
                            <select className="form-select" {...register("avatar", {})}>
                                <option value="./assets/avatar1.png">Avatar1</option>
                                <option value="./assets/avatar2.png">Avatar2</option>
                                <option value="./assets/avatar3.png">Avatar3</option>
                                <option value="./assets/avatar4.png">Avatar4</option>
                                <option value="./assets/avatar5.png">Avatar5</option>
                                <option value="./assets/avatar6.png">Avatar6</option>
                                <option value="./assets/avatar7.png">Avatar7</option>
                                <option value="./assets/avatar8.png">Avatar8</option>
                                <option value="./assets/avatar9.png">Avatar9</option>
                                <option value="./assets/avatar10.png">Avatar10</option>
                                <option value="./assets/avatar11.png">Avatar11</option>
                                <option value="./assets/avatar12.png">Avatar12</option>
                            </select>
                        </div>

                        <input className='form-control' type="hidden" placeholder="id" defaultValue={jugador.id} {...register("id", {})} />
                        <br />
                        <input className='form-control' type="text" placeholder="nickname" defaultValue={jugador.nickname} {...register("nickname", {})} />
                        <br />
                        <select className="form-select" {...register("status", {})}>
                            <option value="oro">Oro</option>
                            <option value="plata">Plata</option>
                            <option value="bronce">Bronce</option>
                        </select>
                        <br />
                        <input className='form-control' type="text" placeholder="ranking" defaultValue={jugador.ranking} {...register("ranking", {})} />
                        <br />
                        <input className='btn btn-dark' type="submit" style={{ width: '200px' }} />
                    </form>
                }

            </Modal.Body>
        </Modal>
    );

    return (
        <div className="container mt-5" align="center">
            <h4>JUGADORES</h4>
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
                                <th scope="col">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jugadores.map(item => (
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
                                        <td align='center'>
                                            <img
                                                role={"button"}
                                                id={item.id}
                                                onClick={handleEditar}
                                                className='svg-icon'
                                                src="./assets/edit.svg"
                                                alt="icono" />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {modalEdit}
        </div>
    )
}