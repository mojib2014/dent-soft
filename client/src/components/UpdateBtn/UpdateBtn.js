import React from 'react'
import { Button } from 'semantic-ui-react'

const UpdateBtn = () => (
  <Button.Group>
    <Button className="updateRecord">Add Record</Button>
    <Button.Or />
    <Button className="updateNote" positive>Add Note</Button>
  </Button.Group>
)

export default UpdateBtn;