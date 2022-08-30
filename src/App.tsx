import { useEffect, useState } from 'react';
import { github } from './config';
import { userQuery } from './queries/user';

interface Repository {
  id: string;
  name: string;
  description: string;
  url: string;
}

function App() {
  const [username, setUsername] = useState<string>("");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const getUser = async () => {
    try {
      const response = await fetch(github.baseURL, { method: "POST", headers: github.headers, body: JSON.stringify(userQuery) });

      if (response.ok) {
        const { data: { viewer } } = await response.json();
        setUsername(viewer.name);
        setRepositories(viewer.repositories.nodes);
      }
      else throw new Error("Something went wrong");
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  useEffect(() => {
    getUser();
  }, []);
  

  return (
    <div className="App container mt-5">
      <h1 className='text-primary'><i className='bi bi-diagram-2-fill'></i> Repos</h1>
      <p>Hey there {username}!</p>
      <ul>
        {repositories.map((repository) => <li key={repository.id}>{repository.name}</li>)}
      </ul>
    </div>
  );
}

export default App;