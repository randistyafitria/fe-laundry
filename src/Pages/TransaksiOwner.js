import React from 'react'
import HeaderOwner from '../Component/Header/HeaderOwner'
import axios from 'axios'
import { Modal, Button, Form } from "react-bootstrap";

export default class TransaksiOwner extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            transaksi: [],
            member: [],
            selectTransaction: [],
            isModalOpen: false,
            id_transaksi: "",
            id_outlet: "",
            nama_outlet:"",
            kode_invoice: "",
            id_member: "",
            nama_member: "",
            dibayar: "",
            status: "",
            tgl: "",
            tgl_bayar: "",
            detail_transaksi: [],
            time: "",
            total: 0
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.id_outlet = localStorage.getItem("outlet")
        } else {
            window.location = "/login"
        }
    }

    details = (item) => {
        let date = new Date(item.waktu)
        let tm = `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
        this.setState({
            selectTransaction: item.detail_transaksi,
            isModalOpen: true,
            id_transaksi: item.id_transaksi,
            kode_invoice:item.kode_invoice,
            id_member: item.member.id_member,
            nama_member: item.member.nama,
            id_outlet: item.outlet.id_outlet,
            nama_outlet: item.outlet.nama,
            time: tm
        })
    }

    convertTime = (time) => {
        let date = new Date(time)
        return `${date.getDate()}/${Number(date.getMonth()) + 1}/${date.getFullYear()}`
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getTransaction = () => {
        let url = "http://localhost:8080/transaksi/byOutlet/" + this.state.id_outlet 

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    transaksi: res.data,
                    // member: res.data.transaksi.member
                    // custCount: res.data.count
                })
                console.log(this.state.transaksi)


            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    detail = id =>{
        localStorage.setItem("id_transaksi", id)
        window.location = '/Detail_Transaksi'
    }
    
    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempTransaksi = this.state.transaksi
            let result = tempTransaksi.filter(item => {
                return item.kode_invoice.toLowerCase().includes(keyword) 
            })
            this.setState({transaksi: result})
        }
    }
    
    componentDidMount() {
        this.getTransaction()
    }

    render() {
        return (
            <div>
                <HeaderOwner />
                {/* <div className="back"> */}
                <div className="container">
                <br></br>
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr  align="center">
                                <th>No</th>
                                <th>Kode Invoice</th>
                                <th>Member</th>
                                <th>Date</th>
                                <th>Deadline</th>
                                <th>Payment Date</th>
                                <th>Payment Status</th>
                                <th>Status Order</th>
                                <th>Option</th>
                            </tr>
                        </thead>
                        <tbody  align="center">
                        {this.state.transaksi.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.kode_invoice}</td>
                                        <td>{item.member.nama}</td>
                                        <td>{this.convertTime(item.tgl)}</td>
                                        <td>{this.convertTime(item.batas_waktu)}</td>
                                        <td>{item.tgl_bayar}</td>
                                        <td>{item.dibayar}</td>
                                        <td>{item.status}</td>
                                        <td>
                                            <Button variant="primary" href="/Detail_Transaksi"  onClick={() => this.detail(item.id_transaksi)}>
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
