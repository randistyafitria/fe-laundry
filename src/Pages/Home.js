import React from 'react'
import axios from 'axios'
import HeaderAdmin from '../Component/Header/HeaderAdmin';
import HeaderKasir from '../Component/Header/HeaderKasir';
import HeaderOwner from '../Component/Header/HeaderOwner';

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            userName: "",
            userCount: 0,
            memberCount: 0,
            outletCount: 0,
            paketCount: 0,
            tranCount: 0
        }
        // cek di local storage apakah ada token (sudah login) 
        if (localStorage.getItem('token')) {
            this.state.token = localStorage.getItem('token')
            this.state.role = localStorage.getItem('role')
        }
        // jika belum login 
        else {
            window.location = '/Login'
        }
        }

    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    // mendapatkan nama user
    getUser = () => {
        let user = localStorage.getItem('nama')
        let url = "http://localhost:8080/user"

        axios.get(url)
        .then(res => {
            this.setState({
                userName: user,
                userCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama member
    getMember = () => {
        let url = "http://localhost:8080/member"

        axios.get(url)
        .then(res => {
            this.setState({
                memberCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama paket
    getPaket = () => {
        let url = "http://localhost:8080/paket"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                paketCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama outlet
    getOutlet = () => {
        let url = "http://localhost:8080/outlet"

        axios.get(url, this.headerConfig())
        .then(res => {
            this.setState({
                outletCount: res.data.count
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    // mendapatkan nama transaksi
    getTran = () => {
        let url = "http://localhost:8080/transaksi"

        axios.get(url, this.headerConfig())
            .then(res => {
                this.setState({
                    tranCount: res.data.count
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

    componentDidMount = () => {
        this.getUser()
        this.getMember()
        this.getPaket()
        this.getOutlet()
        this.getTran()
    }

    render() {
        return (
            <>
             {this.state.role == "admin" &&
                            <HeaderAdmin />
                        }
                {this.state.role == "kasir" &&
                            <HeaderKasir />
                        }
                {this.state.role == "owner" &&
                    <HeaderOwner />
                }
            <div>
                <div className="container">
                     <div className='mb-4 mt-4'>
                        <h5>Dashboard</h5>
                    </div> 
                    
                    <div class="card form-control">
                    <div class="col-lg-12 col-md-12">


                    <div className='alert bg-black text-white'>
                        <h1 className="text-bold">Hai! {this.state.userName.toUpperCase()}</h1>
                    </div><hr />
                    <div className="d-flex justify-content-around p-1">
                        <div className="card col-6 bg-black m-1">
                            <div className="card-body row">
                                <div className="col-9 p-4">
                                    <h2 className="text-light">Total Member</h2>
                                    <h2 className="text-white"><i>{this.state.memberCount}</i></h2>
                                </div>
                            </div>
                        </div>

                        <div className="card col-6 bg-black m-1">
                            <div className="card-body row">
                                <div className="col-9 p-4">
                                    <h2 className="text-light">Total Paket</h2>
                                    <h2 className="text-white"><i>{this.state.paketCount}</i></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around p-1">
                        <div className="card col-6 bg-black m-1">
                            <div className="card-body row">
                                <div className="col-9 p-4">
                                    <h2 className="text-light">Total Outlet</h2>
                                    <h2 className="text-white"><i>{this.state.outletCount}</i></h2>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card col-6 bg-black m-1">
                            <div className="card-body row">
                                <div className="col-9 p-4">
                                    <h2 className="text-light">Total Outlet</h2>
                                    <h2 className="text-white"><i>{this.state.outletCount}</i></h2>
                                </div>
                            </div>
                        </div>
                        </div>


                    </div>
                        </div>
                    </div>
                    
</div>
</>

        )
    }
}