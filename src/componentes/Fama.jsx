import React, { useState, useEffect } from 'react';
import '../css/menu.css'

const URL_FAMA = "https://programartephp.azurewebsites.net/salon_fama.php";

function useDatos() {
    const [jugadores, setJugadores] = useState([])

    useEffect(() => {
        fetch(URL_FAMA)
            .then(response => response.json())
            .then(datos => {
                setJugadores(datos)
            })
    }, [])
    return jugadores
}

export default function Fama(props) {

    const top10 = useDatos();


    return (
        <div className="container mt-5" align="center">
            <h4>SALÓN DE LA FAMA</h4>
            <div className="row">
                <div className="col-md-10">
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
                            {top10.map(item => (

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
    )
}
