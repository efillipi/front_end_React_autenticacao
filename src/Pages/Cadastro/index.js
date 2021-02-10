import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

import api from '../../services/api';

export default function NewUser(props) {

  const [nome, setnome] = useState("");
  const [email, setemail] = useState("");
  const [senha, setsenha] = useState("");
  const [senhaconfirmar, setsenhaconfirmar] = useState("");
  const [nivel_acesso, setnivel_acesso] = useState("");
  const history = useHistory();

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var userid = props.match.params.idUser;

  useEffect(() => {
    if (action === 'edit' && userid !== '') {
      api.get(`usuarios/${userid}`)
        .then(response => {
          setnome(response.data.usuario.nome);
          setemail(response.data.usuario.email);
          setnivel_acesso(response.data.usuario.nivel_acesso);
        });
    } else {
      return;
    }
  }, [userid,action]);

  async function handleNewUser(e) {
    e.preventDefault();

    console.log(action,userid)
    if (senhaconfirmar === senha) {
      const data = {
        nome,
        email,
        senha,
        nivel_acesso
      };
      if (action === 'edit') {
        try {
          await api.put(`/usuarios/${userid}`, data, {
          });
          history.push('/usuarios');
        } catch (err) {
          alert(err + "Ocorreu um erro. Favor contatar o administrador do sistema.");
        }
      } else {

        try {
          await api.post('usuarios', data, {
          });
          history.push('/usuarios');
        } catch (err) {
          alert(err + "Ocorreu um erro. Favor contatar o administrador do sistema.");
        }
      }
    }
    else {
      alert("senha de confirmacao diferente da senha.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          {action !== "edit" ?
            <h1> Cadastrar Novo Usuario </h1>
            :
            <h1> Editar Usuario </h1>
          }
          <Link className="back-link" to="/usuarios">
            Voltar
          </Link>
        </section>
        <form onSubmit={handleNewUser} >
          <input placeholder="Nome"
            required
            value={nome}
            onChange={e => setnome(e.target.value)}
          />
          <input placeholder="Email"
            type="email"
            required
            value={email}
            onChange={e => setemail(e.target.value)}
          />

          {action !== "edit" ?
            <div>
              <input placeholder="senha"
                required
                value={senha}
                type="password"
                onChange={e => setsenha(e.target.value)}
              />
              <input placeholder="confirmar senha"
                required
                value={senhaconfirmar}
                type="password"
                onChange={e => setsenhaconfirmar(e.target.value)}
              />
            </div>
            :
            <small></small>
          }
          <input placeholder="Nivel Acesso"
            required
            value={nivel_acesso}
            onChange={e => setnivel_acesso(e.target.value)}
          />
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}