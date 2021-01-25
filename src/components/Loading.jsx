import React, { Component } from 'react';

import './styles/loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
