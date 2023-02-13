import React from "react";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export default class PakList extends React.Component{
    render(){
        return (
        <div className="col-lg-6 col-sm-12 p-2" >
            <div className="card">
                <div className="card-body row" >
                    {/* menampilkan deskripsi */}
                    <div className="col-6">
                        <h5 className="text-dark"><strong>
                            { this.props.nama_paket } </strong>
                        </h5>
                        <h6 className="text-dark">
                            Jenis     : { this.props.jenis}
                        </h6>
                        <h6 className="text-dark">
                            Harga    : { this.props.harga}
                        </h6>
                        {/* button untuk mengedit */}
                        <button className="btn btn-primary" onClick= {this.props.onCart}>
                        Pilih Paket
                    </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}