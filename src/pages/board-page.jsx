import { useAuthContext } from '../modules/auth/hooks/use-auth-context';

function HomePage() {
  const { user } = useAuthContext();

  return (
    <>
      Hello world! <br /> {JSON.stringify(user)}
    </>
  );
}

export default HomePage;
