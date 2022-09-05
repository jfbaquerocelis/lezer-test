import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from './queries/user';

interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  licenseInfo: {
    spdxId: string;
  } | null;
}
interface User {
  id: string;
  name: string;
  avatarUrl: string;
  repositories: {
    edges: Edges[];
    total: number;
  },
}
interface Edges {
  cursor: string;
  node: Repository;
}
interface PageInfo {
  startCursor?: string;
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

interface RepositoriesData {
  user: User;
  pageInfo: PageInfo;
}

interface RepositoriesVars {
  username: string;
  cursor?: string;
}

function App() {
  const { loading, error, data } = useQuery<RepositoriesData, RepositoriesVars>(GET_REPOSITORIES, { variables: { username: 'jfbaquerocelis' } });

  if (loading) return <>Loading...</>;
  if (error) return <>Something went wrong!</>;
  if (!data) return <>No data available</>;

  const repositories = data.user.repositories.edges.map((edge) => edge.node);
  
  return (
    <div className="container mt-5">
      <h1 className='text-primary'><i className='bi bi-diagram-2-fill'></i> Repositories</h1>
      <ul>
        {repositories.map((repository) => <li key={repository.id}>{repository.name}</li>)}
      </ul>
    </div>
  );
}

export default App;