import "./App.css";
import { useState } from "react";
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
            <List></List>
        </div>
    );
}

export default App;
