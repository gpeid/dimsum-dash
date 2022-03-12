import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import styles from "../styles/Home.module.css";

// export async function getStaticProps() {
//   // Get external data from the file system, API, DB, etc.

//   const data = await fetch(`${window.location.host}/api/menu`)
//     .then((response) => response.json())
//     .then((result) => {
//       console.log(result);
//       return result;
//     });
//   // The value of the `props` key will be
//   //  passed to the `Home` component
//   return {
//     props: { data },
//   };
// }

export async function getServerSideProps() {
  // Get external data from the file system, API, DB, etc.
  let hostname =
    typeof window != "undefined"
      ? window.location.host
      : "http://localhost:3000";

  console.log(hostname);

  const data = await fetch(`${hostname}/api/menu`)
    .then((response) => response.json())
    .then((result) => {
      return result;
    });
  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: { data },
  };
}

export default function Home({ data }) {
  let dishObj = {};
  data.map((dish, i) => {
    dishObj[dish.machine_name] = {
      total: 0,
      total_sale: 0,
    };
    // dishObj[dish.machine_name] = 0;
  });

  const multipliers = [1, 10, 100];

  const [dishes, setDish] = useState({ dishObj });
  const [multiplier, setMultiplier] = useState(1);
  useEffect(() => {
    console.log(dishes);
    console.log(window.location.host);
  }, [multiplier]);

  const addDish = (name, total) => {
    setDish((prevState) => {
      prevState.dishObj[name] = {
        ...prevState.dishObj[name],
        total: total,
      };

      return {
        ...prevState,
      };
    });
  };

  const calculateTotalSale = (name, price) => {
    setDish((prevState) => {
      let totalSale = prevState.dishObj[name].total * price;
      prevState.dishObj[name] = {
        ...prevState.dishObj[name],
        total_sale: totalSale.toFixed(2),
      };

      return {
        ...prevState,
      };
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dim Sum Dash</title>
        <meta name="description" content="Save the Dim Sum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Dim Sum Dash</h1>

        <p className={styles.description}>
          The last standing Dim Sum shop in town is on its last wheels. Send the
          cart out and get the shop back on its feet!
        </p>

        <div className="multiplier-container">
          {multipliers.map((item, i) => (
            <Button
              key={i}
              clickHandler={() => {
                setMultiplier(item);
              }}
              type="increment-multiplier"
              text="x"
              int={item}
            />
          ))}
        </div>

        <div className={styles.grid}>
          {data.map((item, i) => {
            return (
              <div key={i} className={styles.card}>
                <h2>{item.name}</h2>
                <h3>{item.alt_name}</h3>
                <p>{item.description}</p>
                <Button
                  clickHandler={() => {
                    addDish(
                      item.machine_name,
                      dishes.dishObj[item.machine_name].total + multiplier
                    );
                    calculateTotalSale(item.machine_name, item.menu_price);
                  }}
                  type="increment-label"
                  text="+"
                  int={multiplier}
                />{" "}
                {dishes.dishObj[item.machine_name].total}
                <br />${dishes.dishObj[item.machine_name].total_sale}
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </footer>
    </div>
  );
}
