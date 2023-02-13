import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios';

import { Modal, Button, Form } from "react-bootstrap";
import PilihMemberList from "../Component/PilihMemberList";
import HeaderAdmin from '../Component/Header/HeaderAdmin';
import HeaderKasir from '../Component/Header/HeaderKasir';
import HeaderOwner from '../Component/Header/HeaderOwner';

class PilihMember extends Component {
    constructor() {
        super();
        this.state = {
            member: [], // array pegawai untuk menampung data pegawai
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "",
            search: "",
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "kasir"){
                this.state.token = localStorage.getItem("token")
                this.state.role = localStorage.getItem('role')
            } else {
                window.alert("Anda bukan Admin atau Kasir")
                window.location = "/"
            }
            
        } else {
            window.location = "/login"
        }
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

    getMember= () => {
        let url = "http://localhost:8080/member";
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
        .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({member: response.data.member});
        })
        .catch(error => {
        console.log(error);
        });
        }
        findMember = (event) => {
        let url = "http://localhost:8080/member";
            if (event.keyCode === 13) {
                // menampung data keyword pencarian
                let form = {
                find: this.state.search
            }
        // mengakses api untuk mengambil data pegawai
        // berdasarkan keyword
        axios.post(url, form)
        .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({member: response.data.member});
        })
        .catch(error => {
        console.log(error);
        });
        }
        }

        SaveMember = (event) => {
            
            event.preventDefault();
            
            // menampung data state buku
            let tempMember= this.state.member
            if (this.state.action === "insert") {
            // menambah data baru
            tempMember.push({
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                jenis_kelamin: this.state.jenis_kelamin,
                tlp: this.state.tlp,
            })
            let url = "http://localhost:8080/member";
        // mengakses api untuk mengambil data pegawai
        axios.get(url)
        .then(response => {
        // mengisikan data dari respon API ke array pegawai
        this.setState({member: response.data.member});
        })
        .catch(error => {
        console.log(error);
        });
        
            }else if(this.state.action === "update"){
                // menyimpan perubahan data
                let index = tempMember.indexOf(this.state.selectedItem)
            tempMember[index].id_member = this.state.id_member
            tempMember[index].nama = this.state.nama
            tempMember[index].alamat = this.state.alamat
            tempMember[index].jenis_kelamin = this.state.jenis_kelamin
            tempMember[index].tlp = this.state.tlp
            }
            this.setState({member : tempMember})
            // menutup komponen modal_buku
            $("#modal").hide();
            }

    addMember = () => {
        this.setState({
            isModalOpen: true,
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_member: item.id_member,
            nama: item.nama,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            action: "update"
        })
        
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
       
        let url = "http://localhost:8080/member"
        if (this.state.action === "insert"){
            axios.post(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getMember()
                this.handleClose()
            })
            .catch(error => console.log(error))

            }else if (this.state.action === "update") {
            url = "http://localhost:8080/member/" + this.state.id_member
            axios.put(url, form)
            .then(res => {
                window.alert(res.data.message)
                this.getMember()
                this.handleClose()
            })
            .catch(error => console.log(error))
        }
    }

    handleDel = (id_member) => {
        let url = "http://localhost:8080/member/" + id_member
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getMember()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    choose= item => {
        if (window.confirm(`Choose ${item.nama} ?`)){
            localStorage.setItem("id_member", item.id_member)
            localStorage.setItem("nama_member", item.nama)
            window.location = "/PilihPaket"
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempMember = this.state.member
            let result = tempMember.filter(item => {
                return item.nama.toLowerCase().includes(keyword) ||
                item.alamat.toLowerCase().includes(keyword) ||
                item.tlp.toLowerCase().includes(keyword) 

            })
            this.setState({member: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getMember()
    }
        
        render(){
            return (
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
        <div class="card mt-3">
            <div class="card-header bg-white">
            <div className='alert bg-black text-white mb-4'>
                        <h2 class="text-center"><b>Member Washuis</b></h2>
	        </div>

                {/* tampilan tabel pegawai */}
                <div className="container">
                    <div className="row">
                        {this.state.member.map((item, index) => {
                            return (
                                <PilihMemberList key={index}
                                    nama={item.nama}
                                    alamat={item.alamat}
                                    jenis_kelamin={item.jenis_kelamin}
                                    tlp={item.tlp}
                                    onChoose = {() => this.choose(item)}
                                    
                                />
                            )
                        })}
                    </div>
                                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Member</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>

                            <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Nama Member</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama Member" value={this.state.nama} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="alamat">
                                    <Form.Label className="text-black" >Alamat</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="alamat" placeholder="Masukkan Alamat" value={this.state.alamat} onChange={this.handleChange} />
                                </Form.Group>
                                
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="jenis_kelamin">
                                    <Form.Label className="text-black" >Jenis Kelamin</Form.Label>
                                    <Form.Select id="mySelect"name="jenis_kelamin" value={this.state.jenis_kelamin} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Jenis Kelamin
                                    </option>
                                    <option value="L">L</option>
                                    <option value="P">P</option>
                                </Form.Select>
                                </Form.Group>
                    
                                <Form.Group className="mb-3" controlId="tlp">
                                    <Form.Label className="text-black">Nomor Telepon</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="tlp" placeholder="Masukkan Nomor Telepon" value={this.state.tlp} onChange={this.handleChange} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                                    

                </div>
                </div>
                </div>
                </div>
                </div>
);
}        
        }

export default PilihMember;