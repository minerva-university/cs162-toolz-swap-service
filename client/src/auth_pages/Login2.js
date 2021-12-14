export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.password = React.createRef();
        this.username = React.createRef();
    }
    handleSubmit(event) {
        const data = {
            "username": this.username.current.value,
            "password": this.password.current.value,
        }
        loginRequest(data).then(serverResponse=> {
            // store credentials in sessionStorage
                const jwtToken = serverResponse["token"]
                const memberId = serverResponse["member_id"]
                const userId = serverResponse["user_id"]
                window.sessionStorage.setItem("jwtToken",  jwtToken)
                window.sessionStorage.setItem("memberId",  memberId)
                window.sessionStorage.setItem("userId",  userId)
        })
        event.preventDefault()
    }
    render() {
       return (
        <form>
            <h3>Login</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Username" ref={this.username} />
            </div>
            
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" ref={this.password} />
            </div>
            
            <button
                className="btn btn-primary btn-block"
                onClick={this.handleSubmit}
            >
                Login
            </button>
            <p className="forgot-password text-right">
                Already registered <a href="#">sign in?</a>
            </p>
        </form>
    );
    }

}
