import React from "react";

export default class MemberList extends React.Component{
    render(){
        return (
            <div className="container"> 
        <div className="col-lg-12 col-sm-12 p-2" >
            <div className="card">
                <div className="card-body row" >
                    {/* menampilkan deskripsi */}
                    <div className="col-6">
                        <h5 className="text-dark"><strong>
                            { this.props.nama } </strong>
                        </h5>
                        <h6 className="text-dark">
                            Alamat     : { this.props.alamat}
                        </h6>
                        <h6 className="text-dark">
                            Jenis Kelamin    : { this.props.jenis_kelamin}
                        </h6>
                        <h6 className="text-dark">
                            Nomor Telepon    : { this.props.tlp}
                        </h6>
                       
                        <button className="btn btn-primary" onClick= {this.props.onChoose}>
                        Pilih Member
                    </button>

                    </div>
                </div>
            </div>
        </div>
        </div>
        )
    }
}