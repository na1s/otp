import React, {Component} from "react";
import "./App.css";
import Totp from "./Totp";
import Hotp from "./Hotp";
import EndpointSecretHash from "./EndpointSecretHash";
class App extends Component {
    render() {
        return (
            <main className="App">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="#">OTP Helper</a>
                </nav>
                <div role="main" className="container">
                     <div className="row my-3 py-2">
                         <div className="col-sm">
                        <h1 className="mt-5">OTP Helper</h1>
                         </div>
                     </div>
                    <div className="row my-3 py-2">
                        <div className="col-sm">
                             <Totp/>
                        </div>
                        <div className="col-sm">
                             <Hotp/>
                        </div>
                    </div>
                    <div className="row my-3 py-2">
                        <div className="col-sm">
                            <EndpointSecretHash/>
                        </div>
                    </div>
                </div>
            </main>

        );
    }
}

export default App;
