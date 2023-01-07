import "./App.css";
import React, { useState } from "react";
import logo from "./gifthub_logo.jpeg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import test from './gifthub_logo.jpeg';

function Header({ listId, isOwner }) {
  const [modalOpened, setModalOpened] = useState(false);

  let modal;
  if (listId) {
    modal = (
      <Modal show={modalOpened} onHide={() => setModalOpened(false)}>
        <Modal.Header>
          <Modal.Title>Add an item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="productName">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productNameInput"
                placeholder="Enter Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="productLink">
                Link to Product
              </label>
              <input
                type="text"
                className="form-control"
                id="productLinkInput"
                placeholder="Enter Link"
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalOpened(false)}
          >
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    modal = (
      <Modal show={modalOpened} onHide={() => setModalOpened(false)}>
        <Modal.Header>
          <Modal.Title>Add a list</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="productName">
                List Name
              </label>
              <input
                type="text"
                className="form-control"
                id="listNameInput"
                placeholder="Enter Name"
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalOpened(false)}
          >
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <div className="Header">
      <img src={logo} alt="Really cool logo" className="logo" />
      <div className="submitBtn">
        {isOwner || !listId ? <p onClick={() => setModalOpened(true)}>+</p> : null}
        {modal}
      </div>
    </div>
  );
}
const users = [
  {
    _id: 1,
    name: "Tyler",
    password: "1234",
  },
  {
    _id: 2,
    name: "Angela",
    password: "2323",
  },
  {
    _id: 3,
    name: "Bob",
    password: "3232",
  },
];
const lists = [
  {
    _id: "1234",
    userId: "1",
    list: [
      {
        name: "First",
        link: "https://discord.com/channels/1045024966321651762/1045037247797399562",
        checked: false,
      },
      {
        name: "Second",
        link: "notfound.com",
        checked: false,
      },
      {
        name: "Third",
        link: "notfound.com",
        checked: true,
      },
      {
        name: "Fourth",
        link: "notfound.com",
        checked: true,
      },
      {
        name: "Fifth",
        link: "notfound.com",
        checked: false,
      },
    ],
  },
  {
    _id: "2345",
    userId: "1",
    list: [
      {
        name: "Sixth",
        link: "notfound.com",
        checked: false,
      },
      {
        name: "Seventh",
        link: "notfound.com",
        checked: false,
      },
      {
        name: "Eigth",
        link: "notfound.com",
        checked: true,
      },
      {
        name: "Ninth",
        link: "notfound.com",
        checked: true,
      },
      {
        name: "Tenth",
        link: "notfound.com",
        checked: false,
      },
    ],
  },
  {
    _id: "3456",
    userId: "1",
    list: [
      {
        name: "Eleventh",
        link: "notfound.com",
        checked: false,
      },
      {
        name: "Twelfth",
        link: "notfound.com",
        checked: false,
      },
      {
        name: "Thirteenth",
        link: "notfound.com",
        checked: true,
      },
      {
        name: "Fourteenth",
        link: "notfound.com",
        checked: true,
      },
      {
        name: "Fifteenth",
        link: "notfound.com",
        checked: false,
      },
    ],
  },
];

//Is a class so that we can use state to make invisible or not
// tyler did this, leave it as a class it's so funny
// i know it doesn't make sense but keep it
// PLEASE
class ListItem extends React.Component {
  //Removes a list item ONLY in front end (for right now)
  removeListItem() {
    this.setState({ visibility: "none" });
  }

  constructor(props) {
    super(props);
    this.state = {
      visibility: true,
    };
    this.removeListItem = this.removeListItem.bind(this);
  }

  render() {
    return (
      <div
        style={{ display: this.state.visibility }}
        className="card w-75 mb-3 ListItem"
      >
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <div className="card-text">
            <a href={this.props.link}>{this.props.link}</a>
          </div>
        </div>
        {this.props.isOwner ? (
          <button
            type="button"
            className="btn btn-outline-danger checkbox"
            onClick={this.removeListItem}
          >
            Delete
          </button>
        ) : (
          <button
            type="button"
            className={
              this.props.isPurchased
                ? "btn btn-outline-success checkbox active"
                : "btn btn-outline-success checkbox"
            }
            data-bs-toggle="button"
            checked={true}
          >
            Check
          </button>
        )}
      </div>
    );
  }
}

function List({ loginInfo, listId }) {
  let content;
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].userId === loginInfo.userId && lists[i]._id === listId) {
      content = lists[i].list.map((item, index) => (
        <ListItem
          name={item.name}
          link={item.link}
          isPurchased={item.checked}
          key={index}
          loginInfo={loginInfo}
          isOwner={true}
        ></ListItem>
      ));
    } else if (lists[i]._id === listId) {
      content = lists[i].list.map((item, index) => (
        <ListItem
          name={item.name}
          link={item.link}
          isPurchased={item.checked}
          key={index}
          loginInfo={loginInfo}
          isOwner={false}
        ></ListItem>
      ));
    }
  }

  return <div className="List">{content}</div>;
}

function Spoiler() {
  const [hideState, setHideState] = useState(false);

  if (hideState) {
    return <div></div>;
  } else {
    return (
      <div className="modal">
        <h1>Spoiler:</h1>
        <p>
          This is a warning - the following page displays which items
          have been purchased.
        </p>
        <p>
          If you do not wish to be spoiled, turn back! Otherwise,
          continue.
        </p>
        <button className="continue" onClick={() => setHideState(true)}>
          Continue
        </button>
      </div>
    );
  }
}

function findListsByUserId(userId) {
  let output = [];
  for (let i = 0; i < lists.length; i++) {
    if (userId === lists[i].userId) {
      output.push(lists[i])
    }
  }

  return output;
}

function ListList({ loginInfo, listToDisplay }) {
  return (
    <div className="col-sm-3">
      <Card
        style={{ width: "100%", height: "400px" }}
        className="listcard"
      >
        <Card.Body>
          <Card.Img varient="top" src={test}></Card.Img>
          <Card.Title as={"h3"}>{listToDisplay._id}</Card.Title>
          <Button variant="primary"><a href={'/?listId=' + listToDisplay._id} className="card-button-link">Select</a></Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function App({ login }) {
  const queryParameters = new URLSearchParams(window.location.search);
  const listId = queryParameters.get("listId");
  const listsToDisplay = findListsByUserId(login.userId);
  let isOwner = false;

  for (let i = 0; i < lists.length; i++) {
    if (lists[i]._id === listId && lists[i].userId === login.userId) {
      isOwner = true;
    }
  }

  const content = listId ? (
    <List loginInfo={login} listId={listId}></List>
  ) : (
    listsToDisplay.map((item, index) => (<ListList loginInfo={login} listToDisplay={item}></ListList>))
  );
  return (
    <div className="App">
      {login ? "" : <Spoiler></Spoiler>}
      <Header listId={listId} isOwner={isOwner}></Header>
      <div className="row">
        {content}
      </div>
    </div>
  );
  // <List loginInfo={login} listId={listId}></List>
}

export default App;
