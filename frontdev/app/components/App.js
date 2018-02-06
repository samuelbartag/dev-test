import React from 'react';
import img from '../assets/images/react_logo_512x512.png';

const App = () => {
  return (
    <div>
      <h2 id="heading">Hello ReactJS</h2>

    <p>Bem vindo(a)!
        Começe a criar nosso sistema de gestão de eventos modificando scripts da
        pasta <b>frontdev/app</b>b>.
    </p>

    <p>Este script, por exemplo, fica em <b>/frontdev/app/components/App.js</b>.</p>

    <p>Sempre que você fizer modificações, as mesmas serão automaticamente compiladas
        e atualizadas no browser.
    </p>

    <p>
        Divirta-se!
    </p>
      <img
        className="image"
        style={{ margin: '0.5em' }}
        height="40"
        width="40"
        src={img}
        alt="React Logo"
      />
    </div>
  );
};

export default App;
