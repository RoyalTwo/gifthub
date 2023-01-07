import "./App.css";
import React, { useState } from "react";
import logo from "./gifthub_logo.jpeg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Header() {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <div className="Header">
            <img src={logo} alt="Really cool logo" className="logo" />
            <div className="submitBtn">
                <p onClick={() => setModalOpened(true)}>+</p>

                <Modal show={modalOpened} onHide={() => setModalOpened(false)}>
                    <Modal.Header>
                        <Modal.Title>Add an item</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label for="productName">Product Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="productNameInput"
                                    placeHolder="Enter Name"
                                />
                            </div>
                            <div className="form-group">
                                <label for="productLink">Link to Product</label>
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
            </div>
        </div>
    );
}

const data = [
    {
        name: "First",
        link: "notfound.com",
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
                    <div className="card-text">{this.props.link}</div>
                </div>
                {this.props.loginInfo.listOwner ? (
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
                    >
                        Check
                    </button>
                )}
            </div>
        );
    }
}

function List({ loginInfo }) {
    const content = data.map((item, index) => (
        <ListItem
            name={item.name}
            link={item.link}
            isPurchased={item.checked}
            key={index}
            loginInfo={loginInfo}
            counter={0}
        ></ListItem>
    ));
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

function App({ login }) {
    return (
        <div className="App">
            {login ? "" : <Spoiler></Spoiler>}
            <Header></Header>
            <List loginInfo={login}></List>
        </div>
    );
}

export default App;
