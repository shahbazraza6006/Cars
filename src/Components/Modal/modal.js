import { useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import AddCar from "../AddCar/addcar";

import "./modal.css";
function Example({ handleClose, show, data, type }) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Modal className="modals" show={show} onHide={handleClose}>
        <Modal.Body className="model-content">
          <AddCar data={data} type={type} />
        </Modal.Body>
      </Modal>
    </>
  );
}



export default Example;
