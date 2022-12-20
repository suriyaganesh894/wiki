import "./App.css";
import { useState } from "react";
function App() {
  const [result, setResult] = useState({});

  async function fetchData(val) {
    const searchtext = val.trim().toLowerCase();
    console.log(searchtext);
    if (searchtext.length > 0) {
      const apistring = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchtext}`;
      const response = await fetch(apistring);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return await response.json();
    }
  }
  async function handleSearch(e) {
    const { value } = e.target;
    setResult({ result: await fetchData(value) });
    console.log(result);
  }

  return (
    <div className="App">
      <h1>Wiki search</h1>
      <input type="text" className="search" onKeyUp={handleSearch} />

      <ul>
        {result.result &&
          result.result.query.search.map((data, i) => {
            //let url =`https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=info&pageids=${page}&inprop=url&format=json`;
            let url = `https://en.wikipedia.org/wiki/${data.title}`.trim();
            console.log(url);
            return (
              <div>
                <center>
                  <table style={{ width: "400px" }}>
                    <tr>
                      <a
                        href={url}
                        style={{
                          textDecoration: "none",
                          padding: "20px",
                          color: "brown"
                        }}
                      >
                        {data.title}
                      </a>
                    </tr>
                  </table>
                </center>
              </div>
            );
          })}
      </ul>
    </div>
  );
}

export default App;
