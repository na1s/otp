import React from "react";
import OTPAuth from 'otpauth';

const secret = '12345678901234567890';

class Totp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: secret,
            step: 30,
            digits: 6,
            b32: false,
            updatingIn: 0
        };
    }

    stripSpaces(str) {
        var val = String(str).replace(/^\s+|\s+$/g, '');
        return parseInt(val);
    }

    tick() {
        var epoch = Math.round(new Date().getTime() / 1000.0);
        var countDown = 30 - (epoch % 30);

        var totp = new OTPAuth.TOTP({
            issuer: 'ACME',
            label: 'AzureDiamond',
            algorithm: 'SHA1',
            period: this.stripSpaces(this.state.step),
            digits: this.stripSpaces(this.state.digits),
            secret: this.state.b32? OTPAuth.Secret.fromB32(this.state.secret):OTPAuth.Secret.fromHex(this.state.secret)
        });

        this.setState((prevState) => ({
            updatingIn: countDown,
            totp: totp.generate()
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
                    <h4>Totp</h4>
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
                        <label>Step</label>
                        <input type="text" name="secret" className="form-control  col-sm-6" value={this.state.step}
                               onChange={(t) => this.setState({step: t.target.value})}/>
                    </div>
                    <p><b>One-time Password</b>: {this.state.totp}</p>
                    <p>Updating in: {this.state.updatingIn}</p>
                </div>
            </div>
        );
    }
}

export default Totp;