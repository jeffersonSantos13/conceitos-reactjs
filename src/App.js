import React, { useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio ReactJS ${Date.now()}`,
      url: 'http://github.com',
      techs: ['React', 'ReactJs'],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const repositorieIndex = repositories.findIndex(repository => repository.id === id);
      
      repositories.splice(repositorieIndex, 1);

      setRepositories([...repositories]);
    }).catch(error => {
      console.log(error);
    });    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (

        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
