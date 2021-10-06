import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'

function NewTransfer({ createTransfer }) {
  const [transfer, setTransfer] = useState(undefined);

  const submit = e => {
    e.preventDefault();
    createTransfer(transfer);
  }

  const updateTransfer = (e, field) => {
    const value = e.target.value;
    setTransfer({ ...transfer, [field]: value });
  }

  return (
    <div>
      <h2>Create transfer</h2>
      <Form onSubmit={(e) => submit(e)}>
        <Form.Group className="w-25 mb-3">
          <Form.Control placeholder="Amount"
            onChange={e => updateTransfer(e, 'amount')}
          />
        </Form.Group>
        <Form.Group className="w-100 mb-3">
          <Form.Control placeholder="Address"
            onChange={e => updateTransfer(e, 'to')}
          />
        </Form.Group >
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div >
  );
}

export default NewTransfer;
