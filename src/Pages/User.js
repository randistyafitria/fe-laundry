import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import UserList from "../Component/UserList";
import HeaderAdmin from '../Component/Header/HeaderAdmin';

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            user: [],
            outlet: [],
            id_user: "",
            nama: "",
            username: "",
            password: "",
            id_outlet: "",
            role: "",
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('role') === "admin") {
              this.state.role = localStorage.getItem('role')
              this.state.token = localStorage.getItem('token')
              this.state.userName = localStorage.getItem('name')
            } else {
              window.alert("You are not an admin")
              window.location = '/login'
            }
          } else {
            window.location = "/login"
          }
        }
        
    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
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

    getUser = () => {
        let url = 'http://localhost:8080/user/'
        axios.get(url, this.headerConfig())
          .then(res => {
            this.setState({
              user: res.data.user
            })
            console.log(this.state.user)
          })
          .catch(error => {
            console.log(error)
          })
      }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet"

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    outlet: res.data.outlet,
                    // custCount: res.data.count
                })

            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    addUser = () => {
        this.setState({
            isModalOpen: true,
            nama: "",
            username: "",
            id_outlet: "",
            role: "",
            password: "",
            action: "insert"
          })
        }

    handleEdit = (item) => {
        let url = "http://localhost:8080/outlet/" + item.id_outlet
        axios.get(url)
          .then(res => {
            this.setState({
              outletname: res.data.outlet.nama,
              isModalOpen: true,
              nama: item.nama,
              username: item.username,
              id_outlet: item.id_outlet,
              role: item.role,
              id_user: item.id_user,
              action: "update"
            })
            console.log(this.state.outletname)
          })
          .catch(error => {
            console.log(error)
          })
    
      }

    handleSave = (e) => {
        e.preventDefault()
        // console.log("berhasil ")
        let form =  {
            id_admin: this.state.id_admin,
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      id_outlet: this.state.id_outlet,
      role: this.state.role
        }
       
        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/user"
            axios.post(url, form, this.headerConfig())
            .then(res => {
                window.alert(res.data.message)
                this.getUser()
                this.handleClose()
            })
            .catch(error => console.log(error))

        } else if (this.state.action === "update") {
            url = "http://localhost:8080/user/" + this.state.id_user
            axios.put(url, form, this.headerConfig())
              .then(response => {
                // window.alert(response.data.message)
                this.getUser()
                this.handleColse()
              })
              .catch(error => console.log(error))
          }
          this.setState({
            isModalOpen: false
          })
        }

    handleDel = (id_user) => {
        let url = "http://localhost:8080/user/" + id_user
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getUser()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempUser = this.state.user
            let result = tempUser.filter(item => {
                return item.nama.toLowerCase().includes(keyword) 

            })
            this.setState({user: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getUser()
        this.getOutlet()
    }


    render() {
        return (
            <div>
                {this.state.role == "admin" &&
                            <HeaderAdmin />
                        }
                <div className="container">  
        <div class="card mt-3">
            <div class="card-header bg-white">
            <div className='alert bg-black text-white mb-4'>
                        <h2 class="text-center"><b>User Washuis</b></h2>
	        </div>

            <div class="d-grid gap-2">
            <button className="btn btn-dark" onClick={() => this.addUser()}>
                        Add User
                    </button>
                    </div>
                    <hr></hr>

            <input type="text" className="form-control my-2" placeholder="Pencarian"
                            value={this.state.keyword}
                            onChange={ev => this.setState({keyword: ev.target.value})}
                            onKeyUp={ev => this.searching(ev)}
                            /> 
                <div className="container">
                    <div className="row">
                        {this.state.user.map((item, index) => {
                            return (
                                <UserList key={index}
                                    nama={item.nama}
                                    username={item.username}
                                    password={item.password}
                                    id_outlet={item.id_outlet}
                                    role={item.role}
                                    onEdit={() => this.handleEdit(item)}
                                    onDel={() => this.handleDel(item.id_user)}
                                />
                            )
                        })}
                    </div>
                  
                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form User</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Nama User</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama User" value={this.state.nama} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label className="text-black">Username</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="username" placeholder="Masukkan Username" value={this.state.username} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label className="text-black">Password</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="password" placeholder="Masukkan Password" value={this.state.password} onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="id_outlet">
                                    <Form.Label className="text-black">Outlet</Form.Label>
                                    <Form.Select id="mySelect" value={this.state.id_outlet} onChange={(ev) => this.setState({ id_outlet: ev.target.value })} required>
                                    <option className="opsitransacd ksi" value="" readOnly={true} hidden={true}>
                                        Pilih outlet
                                    </option>
                                    {this.state.outlet.map((outlet) => (
                                        <option value={outlet.id_outlet}>{outlet.nama}</option>
                                    ))}
                                    </Form.Select>
                                </Form.Group>
                                
                                <Form.Group  className="mb-3">
                                <Form.Label className="text-black" >Role</Form.Label>
                                <Form.Select id="mySelect"name="role" value={this.state.role} onChange={this.handleChange} required>
                                    <option className="firstOption" value="" hidden={true}>
                                        Pilih Role
                                    </option>
                                    <option value="admin">Admin</option>
                                    <option value="kasir">Kasir</option>
                                    <option value="owner">Owner</option>
                                </Form.Select>
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
        )
    }

}