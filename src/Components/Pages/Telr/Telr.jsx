import React from 'react';
import './Telr.css';

const Telr = () => {
    return (
        <div className="telr-wrapper">
            <div className="container">
                <div className="content_header">
                    <div className="jumbotron">
                        <div className="store-header">
                            <div className="store-logo">
                                <img src="/assets/img/logo.png" alt="Artera Logo" />
                            </div>
                            <div className="payment-details">
                                <span className="label">Amount:</span>
                                <span className="amount">AED 1,000.00</span>
                            </div>
                        </div>
                        <div className="order-info">
                            <p>Order Reference: <strong>#ART-12345</strong></p>
                        </div>
                    </div>
                </div>
                <div className="content_body">
                    <div className="panel-group" id="accordion">
                        <div className="panel panel-default">
                            {/* Card Payment Section */}
                            <div className="panel-subheader">
                                <h4 className="panel-title">Credit / Debit Card</h4>
                            </div>
                            <div id="collapse_card" className="panel-collapse collapse in">
                                <div className="panel-body">
                                    <div className="form-group">
                                        <label>Card Number</label>
                                        <input type="text" className="form-control" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-xs-6">
                                            <div className="form-group">
                                                <label>Expiry Date</label>
                                                <input type="text" className="form-control" placeholder="MM/YY" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-xs-6">
                                            <div className="form-group">
                                                <label>CVV</label>
                                                <input type="text" className="form-control" placeholder="123" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button-group">
                                        <button className="btn btn-success">Pay Now</button>
                                        <button className="btn btn-warning">Save Card</button>
                                        <button className="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
                            </div>

                            {/* Apple Pay / Other Methods */}
                            <div className="panel-subheader">
                                <h4 className="panel-title">Apple Pay</h4>
                            </div>
                            <div id="collapse_applepay" className="panel-collapse collapse">
                                <div className="panel-body">
                                    <button className="btn btn-success">Pay with Apple Pay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content_footer">
                    <p>&copy; 2026 Artera. Secure Payment powered by Telr.</p>
                </div>
            </div>
        </div>
    );
}

export default Telr;


// https://secure.telr.com/gateway/customised/34724/test/Artera.png