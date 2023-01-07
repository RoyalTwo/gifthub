import "./App.css";
import React, { useState } from "react";
import logo from "./gifthub_logo.jpeg";

function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="Really cool logo" className="logo" />
            <SubmitButton></SubmitButton>
        </div>
    );
}

function SubmitButton() {
    const [modalOpened, setModalOpened] = useState(false);
    return (
        <div className="submitBtn">
            <p onClick={() => setModalOpened(true)}>+</p>
            {modalOpened ? <SubmitModal></SubmitModal> : null}
        </div>
    );
}

function SubmitModal() {
    return <div className="submitModal modal">This is the submit modal</div>;
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
