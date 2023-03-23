import Link from "next/link";
import Head from "next/head";
import styles from "../styles/first-post.module.css";
import Image from "next/image";
import Layout from "../components/layouts";
export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>

      <div>
        <div class={styles.parent}>
          <h2>
            <Link href={"/"}>&larr;</Link>
          </h2>
          <h1>First Post</h1>
        </div>
        <Image
          src="/images/profile.jpeg" // Route of the image file
          height={144} // Desired size with correct aspect ratio
          width={144} // Desired size with correct aspect ratio
          alt="Your Name"
        />
      </div>
    </Layout>
  );
}
