import { PlusOutlined, TaobaoCircleOutlined, CheckCircleFilled, CloseCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import { Button, message, Input, Drawer, Card, Form, Row, Col, Typography, Timeline, Empty, List, Table, Tag, Descriptions, Image } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";


import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
import {
  OrderStatusColors, OrderStatusTitles, OrderStatusValues, COLORS, GOOGLE_API_KEY, ParcelStatusTitles, ParcelStatusValues,
  ParcelStateValues, ParcelStateTitles, LeaveTypeValues, LeaveTypeTitles
} from '@/values/constants';
import { Config } from '@/config';


const AsyncMap = withScriptjs(
  withGoogleMap(
    props => (
      <GoogleMap google={props.google}
        defaultZoom={17}
        defaultCenter={props.destLocation}
        ref={r => props.setRef(r)}
      >
        {props.destLocation &&
          <Marker google={props.google}
            icon={{
              url: require("../../assets/images/marker.png"),
              scaledSize: new window.google.maps.Size(32, 48)
            }}
            position={props.destLocation}
          />}
        {props.deliveredLocation &&
          <Marker google={props.google}
            icon={{
              url: require("../../assets/images/marker_blue.png"),
              scaledSize: new window.google.maps.Size(32, 48)
            }}
            position={props.deliveredLocation}
          />}
      </GoogleMap>
    )
  )
);

const OrderDetail = (props) => {
  const dispatch = useDispatch();
  const currentOrder = useSelector(state => state.tracking.currentOrder);
  const [visibleDeliveryDetail, setVisibleDeliveryDetail] = useState(false);
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    dispatch({
      type: 'tracking/fetchOrder',
      orderId: values.order_id,
    });
  }

  var mapView = null;

  return (
    <PageContainer>
      <Card style={{ marginBottom: 24 }}>
        <Form
          layout={"inline"}
          form={form}
          initialValues={{ layout: "inline" }}
          colon={false}
          onFinish={values => handleSubmit(values)}
        >
          <Form.Item
            label="Tracking No"
            name="order_id"
            rules={[
              {
                required: true,
                message: 'Please input tracking no.',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType={"submit"}>TRACK</Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        {currentOrder ?
          <>
            <List
              itemLayout="horizontal"
              style={{ marginBottom: 32 }}
              dataSource={[
                {
                  title: currentOrder.id,
                  description: OrderStatusTitles[currentOrder.status],
                  actions: [
                    currentOrder.status === OrderStatusValues.DELIVERED || currentOrder.status === OrderStatusValues.PARTIALLY_DELIVERED ?
                      <a key="Bind" onClick={() => setVisibleDeliveryDetail(true)}>Delivery Detail</a> : null,
                  ],
                  avatar: currentOrder.status === OrderStatusValues.DELIVERED ? <CheckCircleFilled style={{ fontSize: 48, color: COLORS.success }} /> :
                    currentOrder.status === OrderStatusValues.PARTIALLY_DELIVERED ? <CheckCircleFilled style={{ fontSize: 48, color: COLORS.warning }} /> :
                      currentOrder.status === OrderStatusValues.NOT_DELIVERED ? <CloseCircleFilled style={{ fontSize: 48, color: COLORS.danger }} /> :
                        <MinusCircleFilled style={{ fontSize: 48, color: "#bbbbbb" }} />
                }
              ]}
              renderItem={(item) => (
                <List.Item actions={item.actions}>
                  <List.Item.Meta
                    avatar={item.avatar}
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
            <Row gutter={[16, 16]}>
              <Col md={24} lg={12}>
                <Timeline style={{ height: 600, overflow: "auto", paddingTop: 10 }}>
                  {
                    currentOrder.logs.map((log, index) => {
                      const label = moment(log.created_at).format("DD/MM/YYYY HH:mm:ss");
                      return <Timeline.Item key={`${index}`} color={OrderStatusColors[log.status]}>
                        <div>{log.description}</div>
                        <div style={{ color: "gray" }}>{label}</div>
                      </Timeline.Item>;
                    })
                  }
                </Timeline>
              </Col>
              <Col md={24} lg={12}>
                <div className={"section-title"}>Parcels</div>
                <Table
                  rowKey={record => record.id}
                  columns={[{
                    title: "Parcel No",
                    dataIndex: "id",
                    key: "parcel_id",
                    render: id => <div>{id}</div>
                  }, {
                    title: "Weight",
                    dataIndex: "weight",
                    key: "parcel_weight",
                    render: weight => <div>{weight.toFixed(2)} kg</div>
                  }, {
                    title: "Status",
                    dataIndex: "status",
                    key: "status",
                    render: status => {
                      const color = status === ParcelStatusValues.DELIVERED ? COLORS.success :
                        status === ParcelStatusValues.NOT_DELIVERED ? COLORS.danger : COLORS.gray;
                      return <Tag color={color}>{ParcelStatusTitles[status]}</Tag>;
                    }
                  }, {
                    title: "State",
                    dataIndex: "state",
                    key: "state",
                    render: state => {
                      const color = state === ParcelStateValues.NORMAL ? COLORS.lightGray : COLORS.danger;
                      return <Tag color={color}>{ParcelStateTitles[state]}</Tag>;
                    }
                  }
                  ]}
                  dataSource={currentOrder.parcels}
                  pagination={false}
                />

              </Col>
            </Row>
          </> :
          <Empty />
        }
      </Card>

      {currentOrder &&
        <Drawer
          width={600}
          visible={visibleDeliveryDetail}
          onClose={() => {
            setVisibleDeliveryDetail(false);
          }}
          closable={false}
        >
          <div className={"section-title"}>Delivery Details</div>
          <AsyncMap
            google={window.google}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=places`}
            destLocation={currentOrder.recipient_location ? {
              lat: currentOrder.recipient_location.latitude,
              lng: currentOrder.recipient_location.longitude,
            } : null}
            deliveredLocation={currentOrder.delivered_location ? {
              lat: currentOrder.delivered_location.latitude,
              lng: currentOrder.delivered_location.longitude,
            } : null}
            setRef={r => {
              mapView = r;
              if (mapView && currentOrder.recipient_location && currentOrder.delivered_location) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(new window.google.maps.LatLng({
                  lat: currentOrder.recipient_location.latitude,
                  lng: currentOrder.recipient_location.longitude
                }));
                bounds.extend(new window.google.maps.LatLng({
                  lat: currentOrder.delivered_location.latitude,
                  lng: currentOrder.delivered_location.longitude
                }));
                console.log('Bounds', bounds);
                mapView.fitBounds(bounds);
              }
            }}
            loadingElement={
              <div style={{ height: `100%` }} />
            }
            containerElement={
              <div style={{ height: "400px" }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
          />
          <Descriptions
            bordered
            size={"small"}
            layout={"horizontal"}
            labelStyle={{ width: 250 }}
            style={{
              marginBottom: 24,
              marginTop: 24,
            }}
          >
            <Descriptions.Item label="Receiver" span={24}>
              {currentOrder.recipient_name ? `${currentOrder.recipient_name}(${LeaveTypeTitles[currentOrder.leave_place]})` : "---"}
            </Descriptions.Item>
            <Descriptions.Item label="Receiver's Signature" span={24}>
              {currentOrder.recipient_signature ? <Image src={currentOrder.recipient_signature} width={200} /> : "---"}
            </Descriptions.Item>
            <Descriptions.Item label="Drop Place" span={24}>
              {LeaveTypeTitles[currentOrder.leave_place]}
            </Descriptions.Item>
            <Descriptions.Item label="Picture of the Parcels" span={24}>
              {currentOrder.leave_picture ? <Image src={`${Config.COURIER_ENDPOINT}${currentOrder.leave_picture}`} width={200} /> : "---"}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>}
    </PageContainer>
  );
};

export default OrderDetail;
