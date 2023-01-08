import "./App.css";
import React, { useState } from "react";
import logo from "./art/gifthub_logo.jpeg";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";


export function Header({ listId, isOwner, userId }) {
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
                    <form action="http://localhost:2555/lists" method="post">
                        <div className="form-group">
                            <label htmlFor="productName">
                                List Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter Name"
                            />
                        </div>
                        <input type='text' style={{display: 'none'}} id='userId' name="userId" value={userId} />
                        <Button
                            variant="secondary"
                            onClick={() => setModalOpened(false)}
                        >
                            Close
                        </Button>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </form>
                </Modal.Body>

                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div className="Header">
            <a href="http://localhost:3000/"><img src={logo} alt="Really cool logo" className="logo" /></a>
            <div className="submitBtn">
                {isOwner || !listId ? <p onClick={() => setModalOpened(true)}>+</p> : null}
                {modal}
            </div>
        </div>
    );
}