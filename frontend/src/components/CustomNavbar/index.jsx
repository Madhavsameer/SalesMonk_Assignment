import React, { useState } from 'react'
import './index.scss'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import CustomModal from '../CustomModal'

const CustomNavbar = () => {
    const [modalType, setModalType] = useState()
    const openModal = (modalType) => {
        setModalType(modalType)
    }

    return (
        <Navbar bg="light" expand="lg">
            <CustomModal modalType={modalType} setModalType={setModalType} />
            <Container>
                <Navbar.Brand href="/">MOVIECRITIC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Button
                        className="button secondary-button"
                        onClick={() => openModal('movie')}
                    >
                        Add new movie
                    </Button>
                    <Button
                        className="button primary-button"
                        onClick={() => openModal('review')}
                    >
                        Add new review
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar
