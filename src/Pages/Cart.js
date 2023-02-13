import React, {Component} from "react";
import axios from "axios";
import HeaderAdmin from '../Component/Header/HeaderAdmin';
import HeaderKasir from '../Component/Header/HeaderKasir';
import HeaderOwner from '../Component/Header/HeaderOwner';

class Cart extends Component {
    constructor(){
        super()
        this.state = {
        token: "",
        memberName: "",
        cart: [], // untuk menyimpan list cart
        total: 0, // untuk menyimpan data total belanja
        id_outlet: "",
        id_user: "",
        id_member: ""
        }
        if(localStorage.getItem("token")){
        this.state.token = localStorage.getItem("token")
        this.state.id_outlet = localStorage.getItem("outlet")
        this.state.id_member = localStorage.getItem("id_member")
        this.state.id_user = localStorage.getItem("id_user")
        this.state.role = localStorage.getItem('role')
        }else{
        window.location = "/login"
        }
    }
        
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    render(){
        return(
        <div>
            {this.state.role == "admin" &&
                        <HeaderAdmin />
                    }
            {this.state.role == "kasir" &&
                        <HeaderKasir />
                    }
            {this.state.role == "owner" &&
                <HeaderOwner />
            }
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-dark text-white">
                        <h4>Cart List</h4>
                    </div>
                    <div className="card-body">
                        <h5 className="text-dark">
                        Member: { this.state.memberName }
                        
                        </h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Paket</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.cart.map( (item, index) => (
                                <tr key={index}>
                                    <td>{item.nama_paket}</td>
                                    <td>Rp {item.harga}</td>
                                    <td>{item.qty}</td>
                                    <td className="text-right">
                                    Rp { item.harga * item.qty }
                                    </td>
                                    <td>
                                        {/* button untuk mengedit */}
                                        <button className="btn btn-sm btn-primary m-1" onClick={() => this.editItem(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                        </button>
                                        {/* button untuk menghapus */}
                                        <button className="btn btn-sm btn-danger m-1"  onClick={() => this.dropItem(item)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                        </button>
                                    </td>
                                </tr>
                                ) ) }
                                 <tr className="bg-light text-danger">
                                    <td colSpan="3">Pajak</td>
                                    <td className="text-right">+ Rp {this.state.total *(8/100)}</td>
                                </tr>
                                <tr className="bg-light text-danger">
                                    <td colSpan="3">Diskon</td>
                                    <td className="text-right">- Rp {this.state.total *(4/100)}</td>
                                </tr>
                                <tr className="text-success">
                                    <td colSpan="3" >Total</td>
                                    <td>Rp {this.state.total + this.state.total *(8/100) - this.state.total *(4/100)}</td>
                                    <td>
                                    <button className="btn btn-sm btn-success btn-block m-1" onClick={() => this.checkOut()} disabled={this.state.cart.length ===0}>
                                    Checkout
                                    </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    initCart = () => {
        // memanggil data cart pada localStorage
        let tempCart = []
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        if(localStorage.getItem("nama_member") !== null){
            this.setState({
            memberName: localStorage.getItem("nama_member")
            })
        }
        // kalkulasi total harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.qty)
        })
        // memasukkan data cart, user, dan total harga pada state
        this.setState({
            cart: tempCart,
            total: totalHarga
        })
    }

    editItem = selectedItem => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }

        let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
        let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.name} yang dibeli`, selectedItem.qty)
        tempCart[index].qty = promptJumlah

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(tempCart))

        // refresh cart
        this.initCart()
    }


    dropItem = selectedItem => {
        if (window.confirm(`Apakah anda yakin menghapus ${selectedItem.name} dari cart?`)) {
            let tempCart = []
            if (localStorage.getItem("cart") !== null) {
                tempCart = JSON.parse(localStorage.getItem("cart"))
            }

            let index = tempCart.findIndex(it => it.id_paket === selectedItem.id_paket)
            tempCart.splice(index, 1)

            // update localStorage
            localStorage.setItem("cart", JSON.stringify(tempCart))

            // refresh cart
            this.initCart()
        }
    }

    checkOut = () => {
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        let data = {
            // customer_id: this.state.customerID,
            // detail_transaksi: tempCart

            id_outlet: this.state.id_outlet,
            id_member: this.state.id_member,
            biaya_tambahan: this.state.total *(10/100) - this.state.total *(5/100),
            diskon: this.state.total *(5/100),
            pajak: this.state.total *(10/100),
            total: this.state.total,
            status: "baru",
            dibayar: "belum_bayar",
            id_user: this.state.id_user,
            detail_transaksi: tempCart,
            total: this.state.total + this.state.total *(10/100) - this.state.total *(5/100)
        }
        let url = "http://localhost:8080/transaksi"
        axios.post(url, data, this.headerConfig())
            .then(res => {
                // clear cart
                window.alert(res.data.message)
                localStorage.removeItem("cart")
                window.location = "/Transaksi"
            })
            .catch(error => {
                if (error.res) {
                    if (error.res.status) {
                        window.alert(error.res.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }

    componentDidMount(){
        this.initCart()
    }
}
export default Cart;