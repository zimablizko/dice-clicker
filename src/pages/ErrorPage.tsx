import MainNavigation from '../components/MainNavigation.js';

export default function ErrorPage() {
  // const error = useRouteError();

  const title = 'An error occured';
  const message = 'Sorry, an error occured. Please try again later.';

  // if (error.status === 500) {
  //   message = error.data.message;
  // }

  // if (error.status === 404) {
  //   title = 'Not found';
  //   message = 'The requested resource could not be found.';
  // }

  return (
    <>
      <MainNavigation />
      <>
        <h1>{title}</h1>
        <p>{message}</p>
      </>
    </>
  );
}
