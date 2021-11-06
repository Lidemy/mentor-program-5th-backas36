import { useSelector, useDispatch } from 'react-redux';
import { Row, Button } from 'antd';
import { SmileOutlined, UnorderedListOutlined, FrownOutlined } from '@ant-design/icons';

import { setFilter } from '../redux/actions'
const TodoFilters = () => {
  const currentFilter = useSelector(state => state.showFilter)
  const dispatch = useDispatch()
  return (
    <Row style={{ margin: "30px" }} justify="space-around">
      <Button
        icon={<UnorderedListOutlined />}
        type="primary"
        size="large"
        ghost={currentFilter !== 'all'}
        onClick={() => dispatch(setFilter('all'))}
      >All</Button>
      <Button
        icon={<SmileOutlined />}
        type="primary"
        size="large"
        ghost={currentFilter !== '已完成'}
        onClick={() => dispatch(setFilter('已完成'))}

      >已完成</Button>
      <Button
        icon={<FrownOutlined />}
        type="danger"
        size="large"
        ghost={currentFilter !== '未完成'}
        onClick={() => dispatch(setFilter('未完成'))}
      >未完成</Button>
    </Row>
  )
}

export default TodoFilters

//<ReloadOutlined />