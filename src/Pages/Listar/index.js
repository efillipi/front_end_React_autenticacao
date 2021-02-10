import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api';
import './styles.css'



export default function Profile() {
  const [usuario, setusuario] = useState([]); // fazer a troca dos valores , arrary
  const history = useHistory();


  useEffect(() => { // uma funcao que chama a api
    api.get('usuarios', { // chamar api com rota
    }).then(response => {
      setusuario(response.data.usuarios) // guardar  no user os dados do banco
    })
  }, []);

  async function handleDeleteUser(id) { // deletar useres com base no id (key)

    try {
      await api.delete(`usuarios/${id}`, { // chamar api com rota
      });
      
      setusuario(usuario.filter(user => user.id !== id)) // vai mostrar todos usere ao qual nao foram deletados
      window.location.reload() // ai meu deus kkkk
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente ' + err);
    }
  }

  async function handlelogouT(e) {

    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;
    history.push('/');

  }



  return (
    <div className="profile-container">
      <header>
        <span> Listagem de Usuarios</span>

        <Link className="button" to="/usuario/new"> Cadastrar novo caso </Link>
        <button onClick={handlelogouT} type="button">
          Sair
        </button>
      </header>
      <h1> Casos Cadastrados </h1>
      <ul>
        {usuario.map(user => (

          <li key={user.idUser}>
            <div className="profile-container-infor">
              <strong> Nome: </strong>
              <p> {user.nome} </p>

              <strong> Email: </strong>
              <p> {user.email} </p>

              <strong> Nivel Acesso: </strong>
              <p> {user.nivel_acesso} </p>

            </div>

            <div className="profile-container-action">
              <button onClick={() => handleDeleteUser(user.idUser)} type="button">
                Deletar
                </button>
              <Link to={`usuario/${user.idUser}?action=edit`} className="btn-sm btn-primary">
                <button type="button">
                  Editar
                  </button>
              </Link>
            </div>

          </li>
        ))}
      </ul>
    </div>
  )
}