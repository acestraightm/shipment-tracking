import react from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Return value should be component
const CustomSpinner = () => <Spin indicator={antIcon} />

export default CustomSpinner;