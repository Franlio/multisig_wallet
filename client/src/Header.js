import React from 'react';
import { ListGroup } from 'react-bootstrap'

function Header({ approvers, quorum }) {
  return (


    <ListGroup>
      <ListGroup.Item>Approvers: {approvers.join(', ')}</ListGroup.Item>
      <ListGroup.Item>Quorum: {quorum}</ListGroup.Item>
    </ListGroup>

  );
}

export default Header;
