import React, { useState, useContext } from 'react'
import './styles.css';

import { Context } from '../../Context/AuthContext';

export default function Logon() {

  const [email, setemail] = useState('');
  const [senha, setsenha] = useState('');
  const { handleLogin } = useContext(Context);

  async function handleLogiPage(e) {
    e.preventDefault();
    const data ={
      email,
      senha
    }
    handleLogin(data)    
  }

  return (
    <div className="logon-container">
      <section className="form">

        <form>
          <h1> Login </h1>
          <input
            required
            placeholder="E-mail"
            // type="email"
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <input
            required
            placeholder="senha"
            type="password"
            value={senha}
            onChange={e => setsenha(e.target.value)}
          />
          <button className="button" type="submit" onClick={handleLogiPage}>  Entrar </button>
        </form>
      </section>
    </div>
  )
}