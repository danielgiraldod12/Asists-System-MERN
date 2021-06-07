import React, {Component} from "react";

class App extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            users: [],
            asists: [],
            _id: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.addUsers = this.addUsers.bind(this);
    }

    addUsers(e) {
        e.preventDefault()

        if (this.state._id) {
            fetch(`/api/users/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    Swal.fire({
                        title: 'User Updated!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    this.setState({
                        name: '',
                        email: '',
                        _id: ''
                    })
                    this.getUsers();
                })
        } else {
            fetch('/api/users/', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    Swal.fire({
                        title: 'User Created!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    this.setState({
                        name: '',
                        email: '',
                        _id: ''
                    })
                    this.getUsers();
                })
        }
    }

    addAsists(id) {
        fetch(`/api/asists/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: 'Asist Created!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                })
                this.getAsists();
            })
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/users/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                            console.log(data)
                            Swal.fire({
                                title: 'Deleted!',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                            })
                            this.getUsers();
                        }
                    )
            }
        })
    }

    deleteAsist(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/api/asists/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        Swal.fire({
                            title: 'Deleted!',
                            icon: 'success',
                            confirmButtonText: 'Cool'
                        })
                        this.getAsists();
                    })
            }
        })
    }

    getUsers() {
        fetch('/api/users/')
            .then(res => res.json())
            .then(data => {
                this.setState({users: data})
            })
    }

    getAsists() {
        fetch('/api/asists/')
            .then(res => res.json())
            .then(data => {
                this.setState({asists: data})
            })
    }

    editUser(id) {
        fetch(`/api/users/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    name: data.name,
                    email: data.email,
                    _id: data._id,
                })
            })
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        this.getUsers()
        this.getAsists()
    }

    formatDate(date) {
        return moment(date).format('DD/MM/yyyy, h:mm a');
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <a className="navbar-brand" href="#">Asists System</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </nav>

                <div className="container mt-3">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.addUsers}>
                                        <div className="">
                                            <div className="col-10">
                                                <input value={this.state.name} className="form-control mt-1" type="text"
                                                       name="name" onChange={this.handleChange} placeholder="Name"/>
                                            </div>
                                            <div className="col-10">
                                                <input value={this.state.email} className="form-control mt-4"
                                                       type="email"
                                                       name="email" onChange={this.handleChange} placeholder="Email"/>
                                            </div>
                                            <div className="">
                                                <button type="submit" className="btn btn-success mt-4">SEND</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-8">
                            {/*Table Users*/}
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                            data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                            aria-selected="true">Users
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                            data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                            aria-selected="false">Asists
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                     aria-labelledby="home-tab">
                                    <div className="card">
                                        <div className="card-header"><h2>Table Users</h2></div>
                                        <div className="card-body">
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                    <th>Asist</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.users.map(user => {
                                                        return (
                                                            <tr key={user._id}>
                                                                <td>{user.name}</td>
                                                                <td>{user.email}</td>
                                                                <td>
                                                                    <a className="btn btn-outline-dark btn-sm"
                                                                       onClick={() => this.editUser(user._id)}><i
                                                                        className="fas fa-pen"/></a>
                                                                </td>
                                                                <td>
                                                                    <a className="btn btn-outline-dark btn-sm"
                                                                       onClick={() => this.deleteUser(user._id)}><i
                                                                        className="fas fa-trash"/></a>
                                                                </td>
                                                                <td>
                                                                    <a className="btn btn-outline-dark btn-sm"
                                                                       onClick={() => this.addAsists(user._id)}><i
                                                                        className="fas fa-book"/></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel"
                                     aria-labelledby="profile-tab">
                                    {/*Table asists*/}
                                    <div className="card">
                                        <div className="card-header"><h2>Table Asists</h2></div>
                                        <div className="card-body">
                                            <table className="table table-striped table-bordered">
                                                <thead>
                                                <tr>
                                                    <th>Email</th>
                                                    <th>Created At</th>
                                                    <th>Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.asists.map(asist => {
                                                        return (
                                                            <tr key={asist._id}>
                                                                <td>{asist.email}</td>
                                                                <td>{this.formatDate(asist.created_at)}</td>
                                                                <td>
                                                                    <a className="btn btn-outline-dark"><i
                                                                        className="fas fa-trash"
                                                                        onClick={() => this.deleteAsist(asist._id)}/></a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;