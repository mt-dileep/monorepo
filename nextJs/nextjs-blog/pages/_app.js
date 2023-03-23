import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  // console.log("Component", Component);
  // console.log("pageProps", pageProps);
  return <Component {...pageProps} name={"Dileep"} />;
}
