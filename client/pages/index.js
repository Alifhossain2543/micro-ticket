import axios from 'axios'


const Home = ({data}) => {
  return (
    <>
      {data?.currentUser ? (
        <h1>You're authenticated</h1>
      ) : (
        <h1>You're NOT authenticated</h1>
      )}
    </>
  )
}



export default Home

export async function getServerSideProps(context) {
  const { req } = context
  const { data } = await axios.get(
    "http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser",
    {
      headers: req.headers,
    }
  )

  if(!data.currentUser) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
