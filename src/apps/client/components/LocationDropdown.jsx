import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'

function LocationDropdown({ items }) {
  const [selectedItem, setSelectedItem] = useState('')

  const handleSelect = (eventKey) => {
    setSelectedItem(eventKey)
    console.log(`Selected item: ${eventKey}`)
  }
  return (
    <Dropdown onSelect={handleSelect} color='white' drop='down'>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {selectedItem || 'Choose location'}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {items.map((item) => (
          <Dropdown.Item key={item.id} eventKey={item.id}>
            {item.name}
          </Dropdown.Item>
        ))}
        <Dropdown.Item>Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LocationDropdown
