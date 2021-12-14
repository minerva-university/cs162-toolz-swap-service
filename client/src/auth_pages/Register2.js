/*
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.password1 = React.createRef();
        this.password2 = React.createRef();
        this.username = React.createRef();
        this.email = React.createRef();
    }
    
    handleSubmit(event) {
        const data = {
            "first_name": this.firstName.current.value,
            "last_name": this.lastName.current.value,
            "username": this.username.current.value,
            "email": this.email.current.value,
            "password1": this.password1.current.value,
            "password2": this.password2.current.value
        }
        SignUpRequest(data)
        event.preventDefault()
        
    }
    handleClick() {
      TestNav()  
    }
    render() {
        return (
            <div>
                <form>
            <h3>Sign Up</h3>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" placeholder="First name" ref={this.firstName} />
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" placeholder="Last name" ref={this.lastName} />
            </div>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Username" ref={this.username} />
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" ref={this.email}  />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" ref={this.password1} />
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" placeholder="Re-enter password" ref={this.password2}/>
            </div>
            
            <button
                className="btn btn-primary btn-block"
                onClick={this.handleSubmit} 
            >
                Sign Up
            </button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
        </form>
        <button
                className="btn btn-primary btn-block"
                onClick={this.handleClick} 
            >
                go to login
            </button>
        </div>
    );
    }

}
*/ 
const try = {"first_name": "me", "lastname" = "you"}