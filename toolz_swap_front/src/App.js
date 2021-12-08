import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import uuid from 'react-uuid';

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
var csrftoken = getCookie('csrftoken');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolList: [],
      modal: false,
      activeItem: {
        tool_id: null,
        toolName: "",
        toolBrand: "",  
        toolModel: "", 
        toolCondition: "",
        description: "", 
      },
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/api/tool/")
      .then((res) => this.setState({ toolList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    console.log(item, axios)
    axios
      .post("http://localhost:8000/api/tool/", item)
      .then((res) => this.refreshList());

  };

  handleDelete = (item) => {
    console.log("${item.tool_id}")
    let temp_id = item.tool_id
    axios
      .delete("http://localhost:8000/api/tool/"+temp_id+"/")
      .then((res) => this.refreshList());
  };


  createItem = () => {
    const item = { toolName: "", toolBrand: "", toolModel: "", toolCondition: "" , description: ""};

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };



  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={"nav-link active"}
        >
          Tools Listed: 
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { toolList } = this.state;
    const newItems = this.state.toolList

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          title={item.description}
        >
          {item.toolName}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Toolz Swap</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  List Tool
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
