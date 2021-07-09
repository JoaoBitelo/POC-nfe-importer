import logo from "./logo.svg";
import "./App.css";

function sender() {
    let url = "http://127.0.0.1:3000/import";
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: "a",
            token: "b",
        }),
    })
        .then((response) => {
            console.log("response", response);
        })
        .catch((error) => {
            console.error("erro", error);
        });
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <button onClick={sender}>Salvar</button>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
