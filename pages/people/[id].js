import useSWR from "swr";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

async function fetcher(url) {
  const response = await fetch(url);

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return await response.json();
}

export default function Person() {
  const { query } = useRouter();
  const { data, error } = useSWR(
      () => query.id && `/api/people/${query.id}`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <table>
        <tr>
          <td>Name</td>
          <td>{data.name}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{data.gender}</td>
        </tr>
        <tr>
          <td>Mass</td>
          <td>{data.mass}</td>
        </tr>
        <tr>
          <td>Height</td>
          <td>{data.height}</td>
        </tr>
        <tr>
          <td>Hair color</td>
          <td>{data.hair_color}</td>
        </tr>
        <tr>
          <td>Skin color</td>
          <td>{data.skin_color}</td>
        </tr>
        <tr>
          <td>Eye color</td>
          <td>{data.eye_color}</td>
        </tr>
      </table>
    </Layout>
  );
}
