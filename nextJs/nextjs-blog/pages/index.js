import { getSortedPostsData } from "../lib/posts";
import Layout from "../components/layouts";
import utilStyles from "../styles/utils.module.css";

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   console.log("allPostsData", allPostsData);
//   return {
//     props: {
//       allPostsData
//     }
//   };
// }

export async function getServerSideProps(context) {
  const title = await fetch("https://api.github.com/zen").then((res) =>
    res.text()
  );
  return {
    props: {
      // props for your component
      allPostsData: [{ id: "whrth", date: "gwrh", title }]
    }
  };
}

import useSWR from "swr";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.text());

function Profile() {
  const { data, error } = useSWR("https://api.github.com/zen", fetcher);
  console.log("data", data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>fetched String: {data}</div>;
}

export default function Home({ allPostsData }) {
  const [showProfile, setShow] = useState(false);
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
        <button onClick={() => setShow(!showProfile)}>Load profile</button>
        {showProfile && <Profile />}
      </section>
    </Layout>
  );
}
