import qs from 'qs';
import { CheckCircleFilled, CloseCircleFilled, MinusCircleFilled } from '@ant-design/icons';
import {
  Button,
  Input,
  Drawer,
  Card,
  Form,
  Row,
  Col,
  Timeline,
  Empty,
  List,
  Table,
  Tag,
  Descriptions,
  Image,
  Modal,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { withRouter, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PageContainer } from '@ant-design/pro-layout';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from 'react-google-maps';

import {
  OrderStatusColors,
  OrderStatusTitles,
  OrderStatusValues,
  COLORS,
  GOOGLE_API_KEY,
  ParcelStatusTitles,
  ParcelStatusValues,
  ParcelStateValues,
  ParcelStateTitles,
  LeaveTypeTitles,
  OrderStatusMessages,
} from '@/values/constants';
import { Config } from '@/config';
import DeliveryRequestModal from '../DeliveryRequestModal';

const normalizePostcode = (postcode) => {
  return postcode.replace(' ', '').toUpperCase();
};

const AsyncMap = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      google={props.google}
      defaultZoom={17}
      defaultCenter={props.destLocation}
      ref={(r) => props.setRef(r)}
    >
      {props.destLocation && (
        <Marker
          google={props.google}
          icon={{
            url: require('../../assets/images/marker.png'),
            scaledSize: new window.google.maps.Size(32, 48),
          }}
          position={props.destLocation}
        />
      )}
      {props.deliveredLocation && (
        <Marker
          google={props.google}
          icon={{
            url: require('../../assets/images/marker_blue.png'),
            scaledSize: new window.google.maps.Size(32, 48),
          }}
          position={props.deliveredLocation}
        />
      )}
    </GoogleMap>
  )),
);

const CheckPostcodeMode = {
  DETAIL: 'detail',
  RESCHEDULE: 'reschedule',
};

const OrderDetail = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const currentOrder = useSelector((state) => state.tracking.currentOrder);
  const [visibleDeliveryDetail, setVisibleDeliveryDetail] = useState(false);
  const [visiblePostcodeModal, setVisiblePostcodeModal] = useState(false);
  const [checkPostcodeMode, setCheckPostcodeMode] = useState(CheckPostcodeMode.DETAIL);
  const [visibleDeliveryRequest, setVisibleDeliveryRequest] = useState(false);

  const [form] = Form.useForm();
  const [postcodeForm] = Form.useForm();

  let { orderId } = useParams();
  useEffect(() => {
    if (orderId)
      dispatch({
        type: 'tracking/fetchOrder',
        orderId,
      });
  }, [orderId]);

  var mapView = null;

  return (
    <PageContainer
      title={
        <div style={{ fontSize: 14 }}>
          Find out more about us at <a href={'https://fastdespatch.com'}>www.fastdespatch.com</a>
        </div>
      }
    >
      {!!currentOrder && <DeliveryRequestModal 
        visible={visibleDeliveryRequest}
        order={currentOrder}
        onClose={() => setVisibleDeliveryRequest(false)}
      />}

      <Modal
        visible={visiblePostcodeModal}
        title="Recipient's Postcode"
        okText="OK"
        cancelText="Cancel"
        onCancel={() => {
          setVisiblePostcodeModal(false);
        }}
        onOk={() => {
          postcodeForm
            .validateFields()
            .then((values) => {
              if (
                currentOrder &&
                normalizePostcode(currentOrder.recipient_postcode) ===
                  normalizePostcode(values.postcode)
              ) {
                setVisiblePostcodeModal(false);
                if (checkPostcodeMode === CheckPostcodeMode.DETAIL) {
                  setVisibleDeliveryDetail(true);
                } else {
                  // message.warning(
                  //   'We are working hard to make your experience even better. Unfortunately, at the moment this options are not available. Sorry for any inconvenience. If you wish to reschedule please email customerservice@fastdespatch.co.uk, quoting your tracking number.', 10
                  // );
                  setVisibleDeliveryRequest(true);
                }
              } else {
                postcodeForm.setFields([
                  {
                    name: 'postcode',
                    errors: ['Postcode is wrong'],
                  },
                ]);
              }
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={postcodeForm}
          layout="vertical"
          name="postcodeForm"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="postcode"
            label="Postcode"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {!orderId ? (
        <Card style={{ marginBottom: 24 }}>
          <Form
            layout={'inline'}
            form={form}
            initialValues={{ layout: 'inline' }}
            colon={false}
            onFinish={(values) => {
              history.push(`/${values.orderId}`);
            }}
            style={{ justifyContent: 'center' }}
          >
            <Form.Item
              label="Tracking No"
              name="orderId"
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
              <Button type="primary" htmlType={'submit'}>
                TRACK
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : null}
      <Card>
        {currentOrder ? (
          <>
            <List
              itemLayout="horizontal"
              style={{ marginBottom: 32 }}
              dataSource={[
                {
                  title: currentOrder.id,
                  description: OrderStatusTitles[currentOrder.status],
                  actions: [
                    currentOrder.status === OrderStatusValues.DELIVERED ? null : <Button
                      key="reschedule"
                      danger
                      type="text"
                      onClick={() => {
                        setCheckPostcodeMode(CheckPostcodeMode.RESCHEDULE);
                        setVisiblePostcodeModal(true);
                      }}
                    >
                      Reschedule delivery
                    </Button>,
                    currentOrder.status === OrderStatusValues.DELIVERED ||
                    currentOrder.status === OrderStatusValues.PARTIALLY_DELIVERED ? (
                      <Button
                        key="detail"
                        type="text"
                        onClick={() => {
                          setCheckPostcodeMode(CheckPostcodeMode.DETAIL);
                          setVisiblePostcodeModal(true);
                        }}
                      >
                        Delivery Detail
                      </Button>
                    ) : null,
                  ],
                  avatar:
                    currentOrder.status === OrderStatusValues.DELIVERED ? (
                      <CheckCircleFilled style={{ fontSize: 48, color: COLORS.success }} />
                    ) : currentOrder.status === OrderStatusValues.PARTIALLY_DELIVERED ? (
                      <CheckCircleFilled style={{ fontSize: 48, color: COLORS.warning }} />
                    ) : currentOrder.status === OrderStatusValues.NOT_DELIVERED ? (
                      <CloseCircleFilled style={{ fontSize: 48, color: COLORS.danger }} />
                    ) : (
                      <MinusCircleFilled style={{ fontSize: 48, color: '#bbbbbb' }} />
                    ),
                },
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
                <Timeline style={{ height: 600, overflow: 'auto', paddingTop: 10 }}>
                  {currentOrder.logs.map((log, index) => {
                    const label = moment(log.created_at).format('DD/MM/YYYY HH:mm:ss');
                    return (
                      <Timeline.Item key={`${index}`} color={OrderStatusColors[log.status]}>
                        <div>{OrderStatusMessages[log.status]}</div>
                        <div style={{ color: 'gray' }}>{label}</div>
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              </Col>
              <Col md={24} lg={12}>
                <div className={'section-title'}>Parcels</div>
                <Table
                  rowKey={(record) => record.id}
                  columns={[
                    {
                      title: 'Parcel No',
                      dataIndex: 'id',
                      key: 'parcel_id',
                      render: (id) => <div>{id}</div>,
                    },
                    {
                      title: 'Weight',
                      dataIndex: 'weight',
                      key: 'parcel_weight',
                      render: (weight) => <div>{weight.toFixed(2)} kg</div>,
                    },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status) => {
                        const color =
                          status === ParcelStatusValues.DELIVERED
                            ? COLORS.success
                            : status === ParcelStatusValues.NOT_DELIVERED
                            ? COLORS.danger
                            : COLORS.gray;
                        return <Tag color={color}>{ParcelStatusTitles[status]}</Tag>;
                      },
                    },
                    {
                      title: 'State',
                      dataIndex: 'state',
                      key: 'state',
                      render: (state) => {
                        const color =
                          state === ParcelStateValues.NORMAL ? COLORS.lightGray : COLORS.danger;
                        return <Tag color={color}>{ParcelStateTitles[state]}</Tag>;
                      },
                    },
                  ]}
                  dataSource={currentOrder.parcels}
                  pagination={false}
                />
              </Col>
            </Row>
          </>
        ) : (
          <Empty
            description={
              <div>
                Please enter a valid Tracking No and press “Track” to find out more about your
                delivery.
              </div>
            }
          />
        )}
      </Card>

      {currentOrder && (
        <Drawer
          width={600}
          visible={visibleDeliveryDetail}
          onClose={() => {
            setVisibleDeliveryDetail(false);
          }}
          closable={false}
        >
          <div className={'section-title'}>Delivery Details</div>
          <AsyncMap
            google={window.google}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&v=3.exp&libraries=places`}
            destLocation={
              currentOrder.recipient_location
                ? {
                    lat: currentOrder.recipient_location.latitude,
                    lng: currentOrder.recipient_location.longitude,
                  }
                : null
            }
            deliveredLocation={
              currentOrder.delivered_location
                ? {
                    lat: currentOrder.delivered_location.latitude,
                    lng: currentOrder.delivered_location.longitude,
                  }
                : null
            }
            setRef={(r) => {
              mapView = r;
              if (mapView && currentOrder.recipient_location && currentOrder.delivered_location) {
                const bounds = new window.google.maps.LatLngBounds();
                bounds.extend(
                  new window.google.maps.LatLng({
                    lat: currentOrder.recipient_location.latitude,
                    lng: currentOrder.recipient_location.longitude,
                  }),
                );
                bounds.extend(
                  new window.google.maps.LatLng({
                    lat: currentOrder.delivered_location.latitude,
                    lng: currentOrder.delivered_location.longitude,
                  }),
                );
                console.log('Bounds', bounds);
                mapView.fitBounds(bounds);
              }
            }}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: '400px' }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
          <Descriptions
            bordered
            size={'small'}
            layout={'horizontal'}
            labelStyle={{ width: 250 }}
            style={{
              marginBottom: 24,
              marginTop: 24,
            }}
          >
            <Descriptions.Item label="Receiver" span={24}>
              {currentOrder.recipient_name
                ? `${currentOrder.recipient_name}(${LeaveTypeTitles[currentOrder.leave_place]})`
                : '---'}
            </Descriptions.Item>
            <Descriptions.Item label="Receiver's Signature" span={24}>
              {currentOrder.recipient_signature ? (
                <Image src={currentOrder.recipient_signature} width={200} />
              ) : (
                '---'
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Drop Place" span={24}>
              {LeaveTypeTitles[currentOrder.leave_place]}
            </Descriptions.Item>
            <Descriptions.Item label="Picture of the Parcels" span={24}>
              {currentOrder.leave_picture ? (
                <Image
                  src={`${Config.COURIER_ENDPOINT}${currentOrder.leave_picture}`}
                  width={200}
                />
              ) : (
                '---'
              )}
            </Descriptions.Item>
          </Descriptions>
        </Drawer>
      )}
    </PageContainer>
  );
};

export default withRouter(OrderDetail);
