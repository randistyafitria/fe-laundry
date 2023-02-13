import React from "react";

export default class TransaksiList extends React.Component {
    getAmount = (pakets) => {
        let total = 0
        pakets.map(item =>{
            total += Number(item.harga) * Number(item.qty)
        })
        return total
    }

    render(){
        return(
            <div>
                <div className="card col-sm-12 my-1">
                    <div className="card-body row">
                        <div className="col-lg-4 col-sm-12">
                            <small className="text-info">Kode Invoice</small>
                            <h6>{this.props.kode_invoice}</h6>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-info">Member</small>
                            <h6>{this.props.nama_member}</h6>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-info">Outlet</small>
                            <h6>{this.props.nama_outlet}</h6>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                            <small className="text-info">Total Amount</small>
                            <h6 className="text-danger">Rp {this.getAmount(this.props.pakets) }</h6>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                            <small className="text-bold text-info">
                                Time: {(this.props.time) }
                            </small>
                        
                            <button className=" col-lg-9 btn btn-sm btn-block btn-success" data-bs-toggle="modal" data-bs-target={`#modalDetail${this.props.transaction_id}`}>
                                Details
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal component */}
                    <div className="modal fade" id={`modalDetail${this.props.transaction_id}`}>
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5>Detail of Transaction</h5>
                                </div>
                                <div className="modal-body">
                                    <h5>Customer:{this.props.customer_name}</h5>
                                    <h6>Time:{(this.props.time)}</h6>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.props.products.map((item, index) => (
                                                <tr key={item.product_id}>
                                                    <td>{`${index + 1}`}</td>
                                                    <td>{item.product.name}</td>
                                                    <td>Rp {item.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td className="text-right">Rp {item.price * item.qty}</td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td colSpan="4" className="text-danger text-bold">
                                                    <h4>Total</h4>
                                                </td>
                                                <td className="text-right text-danger text-bold">
                                                    <h4>
                                                        Rp {this.getAmount(this.props.products)}
                                                    </h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}