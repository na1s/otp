import React from "react";
import jsSHA from "jssha";
class EndpointSecretHash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {endpointSecret: '', endpointId: '', salt: '', secret: ''};
        this.handleEndpointIdChange = this.handleEndpointIdChange.bind(this);
        this.handleSaltChange = this.handleSaltChange.bind(this);
        this.handleEndpointSecretChange = this.handleEndpointSecretChange.bind(this);
    }

    getEndpointSecretHash(endpointId, endpointSecret, salt) {
        var shaObj1 = new jsSHA("SHA-256", "TEXT");
        shaObj1.update(endpointId + salt);
        var hash1 = shaObj1.getHash("HEX");
        var shaObj2 = new jsSHA("SHA-256", "TEXT");
        shaObj2.update(endpointSecret + hash1);
        //SHA256(endpoint.secret, SHA256(endpoint.id_hex + salt))
        var hash2 = shaObj2.getHash("HEX");
        return hash2;
    }

    handleEndpointIdChange(event) {
        var secret = this.getEndpointSecretHash(event.target.value, this.state.endpointSecret, this.state.salt);
        this.setState({
            endpointId: event.target.value,
            secret: secret
        });
    }

    handleSaltChange(event) {
        var secret = this.getEndpointSecretHash(this.state.endpointId, this.state.endpointSecret, event.target.value);
        this.setState({
            salt: event.target.value,
            secret: secret
        });
    }

    handleEndpointSecretChange(event) {
        var secret = this.getEndpointSecretHash(this.state.endpointId, event.target.value, this.state.salt);
        this.setState({
            endpointSecret: event.target.value,
            secret: secret
        });
    }

    render() {
        return (  <div className="row">
                <div className="col-sm-12">
                <h4>Endpoint Secret Hash</h4>
                <form className="form">
                    <div className="form-group">
                        <label>
                            Endpoint id(hex):
                            <input className="form-control" type="text" value={this.state.endpointId}
                                   onChange={this.handleEndpointIdChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Endpoint secret:
                            <input className="form-control" type="text" value={this.state.endpointSecret}
                                   onChange={this.handleEndpointSecretChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Salt:
                            <input className="form-control" type="text" value={this.state.salt}
                                   onChange={this.handleSaltChange}/>
                        </label>
                    </div>
                    <p>Endpoint Secret Hash: <b>{this.state.secret}</b></p>
                </form>
            </div> </div>
        );
    }
}

export default EndpointSecretHash;