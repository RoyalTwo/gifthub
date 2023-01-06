import "./App.css";

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

function App() {
    return (
        <div className="App">
            <Header></Header>
            <List className="List"></List>
        </div>
    );
}

export default App;
