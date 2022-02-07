import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import '../css/menu.css'

const URL_CREAR = "http://localhost/gabriel_A/crear_jugador.php"; //URL del php

export default function Crear(props) {

    //Constante donde se guarda la información obtenida de la base de datos
    const [jugadores, setJugadores] = useState([]);

    //Métodos del modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //funcion para cambiar la imagen al avathar que se selecciona
    const imgAvatares = (dirAvatares) => {
        const nuevaImagen = document.getElementById("precargado");
        const valorAvatar = dirAvatares.target.value;
        nuevaImagen.src = valorAvatar;
        console.log(valorAvatar);
    }

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
        fetch(URL_CREAR)
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
        fetch(URL_CREAR, {
            'method': 'POST',
            'headers': { 'Content-Type': 'application/json' },
            'body': JSON.stringify(data)
        })
            .then(resp => resp.json())
            .then(json => {
                if (json[0].isOk) {//Si el mensaje obtenido del servidor es true (se guardó correctamente)
                    getDatos();
                } else {
                    console.log("Error en la actualizacción de la base de datos");
                    getDatos();
                }
            })
    }

    const handleEditar = () => {
        handleShow();
    }

    //Evento que maneja un Modal para mostrar la información del usuario
    const modalEdit = (
        <Modal id="modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edición de Jugador</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <form id='formularioMoral' onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center' }}>
                        <input className='form-control' type="text" placeholder="nickname" {...register("nickname", {})} />
                        <br />
                        <select className="form-select" {...register("status", {})}>
                            <option value="oro">Oro</option>
                            <option value="plata">Plata</option>
                            <option value="bronce">Bronce</option>
                        </select>
                        <br />
                        <input className='form-control' type="text" placeholder="ranking" {...register("ranking", {})} />
                        <br />
                        <img id='precargado' className='avatares' src="./assets/avatar1.png" alt="precargado" />
                        <br />
                        <table class="table table-borderless" style={{ textAlign: 'left' }}>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="form-check"  >
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="./assets/avatar1.png"
                                                {...register("avatar", {})}
                                                defaultChecked=""
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Avatar 1
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="./assets/avatar2.png"
                                                {...register("avatar", {})}

                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 2
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault3"
                                                value="./assets/avatar3.png"
                                                {...register("avatar", {})}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 3
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault4"
                                                value="./assets/avatar4.png"
                                                {...register("avatar", {})}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 4
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault5"
                                                value="./assets/avatar5.png"
                                                {...register("avatar", {})}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 5
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault6"
                                                value="./assets/avatar6.png"
                                                {...register("avatar", {})}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 6
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault7"
                                                value="./assets/avatar7.png"
                                                {...register("avatar", {})}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 7
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                onClick={imgAvatares}
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault8"
                                                value="./assets/avatar8.png"
                                                {...register("avatar", {})}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Avatar 8
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                <div className="form-check">
                                    <input
                                        onClick={imgAvatares}
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault9"
                                        value="./assets/avatar9.png"
                                        {...register("avatar", {})}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Avatar 9
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        onClick={imgAvatares}
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault10"
                                        value="./assets/avatar10.png"
                                        {...register("avatar", {})}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Avatar 10
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        onClick={imgAvatares}
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault11"
                                        value="./assets/avatar11.png"
                                        {...register("avatar", {})}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Avatar 11
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        onClick={imgAvatares}
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault12"
                                        value="./assets/avatar12.png"
                                        {...register("avatar", {})}
                                    />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Avatar 12
                                    </label>
                                </div>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <img src="" alt="" />
                        <br />
                        <input className='btn btn-dark' type="submit" style={{ width: '200px' }} />
                    </form>
                }
            </Modal.Body>
        </Modal>
    );

    return (
        <div className="container mt-5" align="center">
            <h4>CREAR NUEVO JUGADOR</h4>
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
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div >
                <div align="center">
                    <button onClick={handleEditar} className='btn btn-dark' type="submit" style={{ width: '200px' }}>Nuevo Jugador</button>
                </div>
            </div>
            {modalEdit}
        </div>
    )
}