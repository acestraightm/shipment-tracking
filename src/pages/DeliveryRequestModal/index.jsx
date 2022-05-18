import moment from 'moment';
import { Input, Form, Modal, Select, Row, Col, Checkbox, message } from 'antd';
import React, { useState } from 'react';
import { connect } from 'umi';
import { LeaveTypeTitles, LeaveTypeValues } from '@/values/constants';
import { submitDeliveryRequest } from '@/services/tracking';
import { useEffect } from 'react';

const leaveOptions = [
  LeaveTypeValues.CUSTOMER,

  LeaveTypeValues.MAIL_ROOM,
  LeaveTypeValues.RECEPTION,
  LeaveTypeValues.SHOP_ASSISTANT,

  LeaveTypeValues.NEIGHBOR,
  LeaveTypeValues.FRONT_PORCH,
  LeaveTypeValues.REAR_PORCH,
  LeaveTypeValues.GARDEN,
  LeaveTypeValues.BEHIND_WHEELIE_BIN,
  LeaveTypeValues.SHED_GARDEN_HOUSE,
  LeaveTypeValues.LETTERBOX,
];

const DeliveryRequestModal = (props) => {
  const { visible, onClose, order } = props;
  const [submitting, setSubmitting] = useState(false);
  const [dateOptions, setDateOptions] = useState(() => {
    const options = [];
    for (let i = 1; i <= 3; i++) {
      let d = new Date();
      d.setDate(d.getDate() + i);
      options.push({
        value: moment(d).format('YYYY-MM-DD'),
        text: moment(d).format('DD/MM/YYYY'),
      });
    }
    return options;
  });

  const handleSubmit = (values) => {
    setSubmitting(true);
    submitDeliveryRequest(
      {
        delivery_date: values.selectDeliveryDate && values.deliveryDate ? values.deliveryDate : null,
        leave_place: values.selectLeavePlace && values.leavePlace ? values.leavePlace : null,
        recipient_name: values.selectLeavePlace && values.recipientName ? values.recipientName : "",
        neighbor_house_number: values.selectLeavePlace && values.houseNumber ? values.houseNumber : "",
        neighbor_street: values.selectLeavePlace && values.street ? values.street : "",
        note_for_driver: values.noteForDriver,
      },
      order.id,
    )
      .then((data, response) => {
        console.log(data, response)
        if (data) {
          message.success('Your delivery request has been submitted successfully.')
          onClose()
        } else {
          message.error('Submitting delivery request has been failed.');  
        }
      })
      .catch(() => {
        message.error('Submitting delivery request has been failed.');
      })
      .finally(() => setSubmitting(false));
  };

  const [deliveryRequestForm] = Form.useForm();
  const leavePlace = Form.useWatch('leavePlace', deliveryRequestForm);
  const selectDeliveryDate = Form.useWatch('selectDeliveryDate', deliveryRequestForm);
  const selectLeavePlace = Form.useWatch('selectLeavePlace', deliveryRequestForm);

  useEffect(() => {
    deliveryRequestForm.resetFields()
  }, [visible])

  return (
    <Modal
      visible={visible}
      title="Delivery Request"
      okText="OK"
      cancelText="Cancel"
      onCancel={() => onClose()}
      confirmLoading={submitting}
      onOk={() => {
        deliveryRequestForm.validateFields().then((values) => {
          if (!values.selectDeliveryDate && !values.selectLeavePlace) {
            alert('You have to choose either delivery day or safe place');
            return;
          }
          handleSubmit(values);
        });
      }}
    >
      <Form
        form={deliveryRequestForm}
        layout="vertical"
        name="deliveryRequestForm"
        autoComplete="off"
        initialValues={{
          selectDeliveryDate: false,
          deliveryDate: null,
          selectLeavePlace: false,
          leavePlace: null,
          recipientName: '',
          houseNumber: '',
          street: '',
          noteForDriver: '',
        }}
      >
        <Form.Item
          name="selectDeliveryDate"
          valuePropName="checked"
          rules={[{ required: false, message: 'This field is required' }]}
        >
          <Checkbox>Choose another delivery day</Checkbox>
        </Form.Item>
        {selectDeliveryDate && (
          <Form.Item
            name="deliveryDate"
            label="Delivery Date"
            rules={[{ required: selectDeliveryDate, message: 'This field is required' }]}
          >
            <Select>
              {dateOptions.map((option, index) => (
                <Select.Option value={option.value} key={index}>
                  {option.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="selectLeavePlace"
          valuePropName="checked"
          rules={[{ required: false, message: 'This field is required' }]}
        >
          <Checkbox>Choose safe place</Checkbox>
        </Form.Item>
        {selectLeavePlace && (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                name="leavePlace"
                label="Recipient or Safe Place to Leave"
                rules={[{ required: selectLeavePlace, message: 'This field is required' }]}
              >
                <Select>
                  {leaveOptions.map((option, index) => (
                    <Select.Option value={option} key={index}>
                      {LeaveTypeTitles[option]}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              {(leavePlace === LeaveTypeValues.CUSTOMER ||
                leavePlace === LeaveTypeValues.NEIGHBOR ||
                leavePlace === LeaveTypeValues.MAIL_ROOM ||
                leavePlace === LeaveTypeValues.SHOP_ASSISTANT ||
                leavePlace === LeaveTypeValues.RECEPTION) && (
                <Form.Item
                  name="recipientName"
                  label="Receiver's Name"
                  rules={[
                    {
                      required:
                        selectLeavePlace &&
                        (leavePlace === LeaveTypeValues.CUSTOMER ||
                          leavePlace === LeaveTypeValues.NEIGHBOR ||
                          leavePlace === LeaveTypeValues.MAIL_ROOM ||
                          leavePlace === LeaveTypeValues.SHOP_ASSISTANT ||
                          leavePlace === LeaveTypeValues.RECEPTION),
                      message: 'This field is required',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {leavePlace === LeaveTypeValues.NEIGHBOR && (
                <Form.Item
                  name="houseNumber"
                  label="House Name/Number"
                  rules={[
                    {
                      required: selectLeavePlace && leavePlace === LeaveTypeValues.NEIGHBOR,
                      message: 'This field is required',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {leavePlace === LeaveTypeValues.NEIGHBOR && (
                <Form.Item
                  name="street"
                  label="Street(if different)"
                  rules={[{ required: false, message: 'This field is required' }]}
                >
                  <Input />
                </Form.Item>
              )}
            </Col>
          </Row>
        )}

        <Form.Item
          name="noteForDriver"
          label="Note for Driver"
          rules={[
            { required: false, message: 'This field is required' },
            { max: 255, message: 'Must be less than 255 characters' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(({}) => ({}))(DeliveryRequestModal);
