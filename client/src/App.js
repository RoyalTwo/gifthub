import "./App.css";
import { useState } from "react";

function Header() {
    return <div className="Header"></div>;
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
        <div className="ListItem">
            <div className="itemname">{name}</div>
            <div className="itemlink">{link}</div>
            <input
                type="checkbox"
                className="ispurchased"
                checked={isPurchased}
            ></input>
        </div>
    );
}

function List() {
    const content = data.map((item) => (
        <ListItem
            name={item.name}
            link={item.link}
            isPurchased={item.checked}
        ></ListItem>
    ));
    return <div>{content}</div>;
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
            <Spoiler></Spoiler>
            <Header></Header>
            <List className="List"></List>
        </div>
    );
}

export default App;
