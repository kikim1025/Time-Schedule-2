import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import selector from '../../../redux/selector';
import { sendAppointment, updateAppointment } from '../../../redux/actions';
import './Hour.css';

class ConnectHour extends React.Component {
    
    state = {
        modal: false,
        day: this.props.day, // included for ownProps access in color selector with store
        hour: this.props.hour,
        tempname: '',
        tempphone: ''
    };

    toggleModal = () => {
        this.setState({ modal: !this.state.modal, tempname: '', tempphone: '' });
    };

    getInput = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    sendAppointment = () => {
        this.props.sendAppointment(this.state.tempname, this.state.tempphone, this.props.day, this.props.hour);
        this.toggleModal();
    };

    updateAppointment = () => {
        this.props.updateAppointment(this.state.tempname, this.state.tempphone, this.props.day, this.props.hour);
        this.toggleModal();
    };

    // conditioinally render appointment submission profiles
    canSubmit = (color) => {
        switch(color) { 
            case 'red':
                return (
                    <div>
                        <ModalBody>
                            <div>Would you like to update this time slot?</div>
                            <div>Current Name: {this.props.name} Current Phone: {this.props.phone}</div>
                            <input id='tempname' type='text' maxLength='15' placeholder='Name' onChange={this.getInput} ></input>
                            <input id='tempphone' type='text' maxLength='10' placeholder='Phone' onChange={this.getInput} ></input>
                        </ModalBody>
                        <ModalFooter>
                                <Button color='primary' onClick={this.updateAppointment}>Update Appointment</Button>
                                <Button color='danger' onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </div>
                )
            default: 
                return (
                    <div>
                        <ModalBody>
                            <div>Please enter your name and 10-digit phone number</div>
                            <input id='tempname' type='text' maxLength='15' placeholder='Name' onChange={this.getInput} ></input>
                            <input id='tempphone' type='text' maxLength='10' placeholder='Phone' onChange={this.getInput} ></input>
                        </ModalBody>
                        <ModalFooter>
                                <Button color='primary' onClick={this.sendAppointment}>Submit Appointment</Button>
                                <Button color='danger' onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </div>
                )
        };
    };

    render() {
        return (
            <div className={`hour ${this.props.color}`}>
                <div id='hour-modal' onClick={this.toggleModal}>{this.props.hour}</div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>{this.props.day} at {this.props.hour}</ModalHeader>
                    {this.canSubmit(this.props.color)}
                </Modal>
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps) => {
    return selector(state, ownProps)
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendAppointment: (name, phone, day, hour) => dispatch(sendAppointment(name, phone, day, hour)),
        updateAppointment: (name, phone, day, hour) => dispatch(updateAppointment(name, phone, day, hour))
    };
};

const Hour = connect(mapStateToProps, mapDispatchToProps) (ConnectHour);

export default Hour;