import React from 'react';
import { Table } from 'react-bootstrap'

function TransferList({transfers, approveTransfer}) {
  return (
    <div>
      <h2>Transfers</h2>
      <Table striped bordered hover wauto="true" variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Amount</th>
            <th>To</th>
            <th>approvals</th>
            <th>sent</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map(transfer => (
            <tr key={transfer.id}>
              <td>{transfer.id}</td>
              <td>{transfer.amount}</td>
              <td>{transfer.to}</td>
              <td>
                {transfer.approvals}
                <button onClick={() => approveTransfer(transfer.id)}>Approve</button>
              </td>
              <td>{transfer.sent ? 'yes' : 'no'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TransferList;
