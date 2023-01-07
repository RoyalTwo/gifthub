import "./App.css";
import { useState } from "react";
import logo from "./gifthub_logo.jpeg";

function Header({ modal }) {
    return (
        <div className="Header">
            <img src={logo} alt="Really cool logo" className="logo" />
            <SubmitButton modal={modal}></SubmitButton>
        </div>
    );
}

function SubmitButton({ modal }) {
    return (
        <div className="submitBtn">
            <p onClick={() => modal()}>+</p>
        </div>
    );
}

function SubmitModal() {
    return (
        <div className="modal" tabIndex="1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </div>
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

function ListItem({ name, link, isPurchased }) {
    return (
        <div className="card w-75 mb-3 ListItem">
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <div className="card-text">{link}</div>
            </div>
            <button
                type="button"
                className="btn btn-outline-success checkbox"
                data-bs-toggle="button"
            >
                Check
            </button>
        </div>
    );
}

function List() {
    const content = data.map((item, index) => (
        <ListItem
            name={item.name}
            link={item.link}
            isPurchased={item.checked}
            key={index}
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
            <div className="spoilermodal">
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
    const [submitModalState, setSubmitModalState] = useState(false);
    function showSubmitModal() {
        console.log("here");
        setSubmitModalState(true);
    }
    return (
        <div className="App">
            {login ? "" : <Spoiler></Spoiler>}
            {submitModalState ? <SubmitModal></SubmitModal> : ""}
            <Header modal={showSubmitModal}></Header>
            <List></List>
        </div>
    );
}

export default App;
