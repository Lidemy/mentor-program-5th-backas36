import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button, Row, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { addTodo } from '../redux/actions'

const AddTodo = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const handleInputChange = (e) => {
    setValue(e.target.value)
  }

  const errorAlert = () => {
    Modal.error({
      title: '請輸入 todo 名稱',
      okText: '知道了！'
    });
  }
  const handleAddClick = (e) => {
    const trimmedValue = value.trim()
    if (!trimmedValue) {
      return errorAlert()
    }

    if (e.key === 'Enter') {
      dispatch(addTodo(trimmedValue))
      return setValue('')
    }

    dispatch(addTodo(trimmedValue))
    setValue('')
  }
  return (
    <Row style={{ flexFlow: "nowrap" }}>
      <Input
        placeholder="請輸入 TODO 名稱"
        allowClear
        size="large"
        bordered
        value={value}
        onChange={handleInputChange}
        style={{ maxWidth: "600px" }}
        onPressEnter={e => handleAddClick(e)}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        onClick={handleAddClick}
      >
        Add
      </Button>
    </Row>
  )
}

export default AddTodo