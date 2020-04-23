import React from "react";
import OTPAuth from 'otpauth';

const secret = '12345678901234567890';

class Hotp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: secret,
            digits: 6,
            b32: false,
            counter: 0
        };
    }

    stripSpaces(str) {
        var val = String(str).replace(/^\s+|\s+$/g, '');
        return parseInt(val);
    }

    tick() {
        var epoch = Math.round(new Date().getTime() / 1000.0);
        var countDown = 30 - (epoch % 30);

        var hotp = new OTPAuth.HOTP({
            issuer: 'ACME',
            label: 'AzureDiamond',
            algorithm: 'SHA1',
            digits: this.stripSpaces(this.state.digits),
            counter: this.stripSpaces(this.state.counter),
            secret: this.state.b32? OTPAuth.Secret.fromB32(this.state.secret):OTPAuth.Secret.fromHex(this.state.secret)
        });

        console.log("Secret=" + this.state.b32);
        this.setState((prevState) => ({
            hotp: hotp.generate()
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h4>Hotp</h4>
                    <div className="form-group">
                        <label>Secret</label>
                        <input type="text" name="secret" className="form-control" value={this.state.secret}
                               onChange={(t) => this.setState({secret: t.target.value})}/>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox"  checked={this.state.b32} id="defaultCheck1"
                               onChange={(t) => this.setState({b32: t.target.checked })}/>
                        <label className="form-check-label" htmlFor="defaultCheck1">
                            B32
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Digits</label>
                        <input type="text" name="secret" className="form-control col-sm-6" value={this.state.digits}
                               onChange={(t) => this.setState({digits: t.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Counter</label>
                        <input type="text" name="secret" className="form-control  col-sm-6" value={this.state.counter}
                               onChange={(t) => this.setState({counter: t.target.value})}/>
                    </div>
                    <p><b>One-time Password</b>: {this.state.hotp}</p>
                </div>
            </div>
        );
    }
}

export default Hotp;