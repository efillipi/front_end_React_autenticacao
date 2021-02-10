import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Context } from '../Context/AuthContext';

import Login from '../Pages/Login/index';
import LitarUsuarios from '../Pages/Listar/index';
import CadastradoUsuario from '../Pages/Cadastro/index';

function CustomRoute({ isPrivate, ...rest }) {
    const { loading, authenticated } = useContext(Context);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }

    return <Route {...rest} />;
}

export default function Routes(props) {
    return (
        <BrowserRouter>
            <Switch>
                <CustomRoute path="/" exact component={Login} />
                <CustomRoute isPrivate path="/usuarios" exact component={LitarUsuarios} />
                <CustomRoute isPrivate path="/usuario/new" exact component={CadastradoUsuario} />
                <CustomRoute isPrivate path="/usuario/:idUser" exact component={CadastradoUsuario} />
            </Switch>
        </BrowserRouter>
    );
}

