import React, {useState} from 'react';
import {
  // CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import { auth, database } from 'helpers/Firebase';

// import Select from 'react-select';
// import CustomSelectInput from 'components/common/CustomSelectInput';
import IntlMessages from 'helpers/IntlMessages';

const AddNewModal = ({ modalOpen, toggleModal }) => {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
    const createUser = () => {
      console.log(email,password,name)
      auth.createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response.user)
        const userData = {
          uid: response.user.uid,
          displayName: name,
          email,
          status: true ,
          isAndcoAdmin:true
        };
        database.ref(`/users/${response.user.uid}/info`).set({ ...userData })
         
      })
      .catch((error) => {
        console.log(error.message)
        
      });
  }
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        <IntlMessages id="pages.add-new-modal-title" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="pages.product-name" />
        </Label>
        <Input onChange={(e) => setName(e.target.value)} />

        <Label className="mt-4">
          <IntlMessages id="pages.product-email" />
        </Label>
        <Input onChange={(e) => setEmail(e.target.value)} />

        <Label className="mt-4">
          <IntlMessages id="pages.product-password" />
        </Label>
        <Input onChange={(e) => setPassword(e.target.value)} />
        {/* <Label className="mt-4">
          <IntlMessages id="pages.category" />
        </Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={categories}
        />
        <Label className="mt-4">
          <IntlMessages id="pages.description" />
        </Label>
        <Input type="textarea" name="text" id="exampleText" />
        <Label className="mt-4">
          <IntlMessages id="pages.status" />
        </Label>
        <CustomInput
          type="radio"
          id="exCustomRadio"
          name="customRadio"
          label="ON HOLD"
        />
        <CustomInput
          type="radio"
          id="exCustomRadio2"
          name="customRadio"
          label="PROCESSED"
        /> */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" onClick={createUser}>
          <IntlMessages id="pages.submit" />
        </Button>{' '}
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
