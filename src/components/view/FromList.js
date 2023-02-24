import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, message, Modal, Popconfirm, Row, Table,} from "antd";

import {deleteUserById, getData, postDataUser} from "../api/api";
import {v4 as uuidv4} from "uuid";

function FromList() {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);

    useEffect(() => {
        getData().then((res) => {
            setData(res);
        });
    }, []);

    const onFinish = (value) => {
        value.id = uuidv4()

        postDataUser(value).then((response) => {
            message.success("Thêm dữ liệu thông tin người dùng thành công!");
        }).catch((eror) => {
            message.error("Thêm dữ liệu người dùng thất bại vui lòng xem lại thông tin người dùng !");
        }).finally(() => {
            setIsModalVisibleAdd(false);
            getData().then((res) => {
                setData(res);
            });
        })
    };

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };

    const handleOnDelete = (value) => {
        deleteUserById(value?.id).then((res) => {
            message.success(res?.message)
            getData().then((res) => {
                setData(res);
            });
        }).catch(() => {

        }).finally(() => {

        })
    };

    const showModalAdd = () => {
        setIsModalVisibleAdd(true);
    };

    const handleOk = () => {
        onFinish();
        setIsModalVisibleAdd(false);
    };

    const handleCancel = () => {
        setIsModalVisibleAdd(false);
    };

    const columns = [
        {
            title: "Tên ngân hàng",
            dataIndex: "bank_name",
            key: "bank_name",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
        },
        {
            title: "Chứng minh thư / CCCD",
            dataIndex: "citizen_id",
            key: "citizen_id",
        },
        {
            title: "Tên tài khoản",
            dataIndex: "user_name",
            key: "user_name",
        },
        {
            title: "Mật khẩu",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "Ngày tạo",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "",
            dataIndex: "",
            key: "x",
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc muốn xóa thông tin người dùng này không ?"
                    onConfirm={() => handleOnDelete(record)}
                    okText="Có"
                    cancelText="Không"
                >
                    <a href="#">Xóa </a>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" onClick={showModalAdd}>
                Thêm mới thông tin
            </Button>
            <Modal
                title="Thêm mới thông tin người dùng"
                visible={isModalVisibleAdd}
                onCancel={() => setIsModalVisibleAdd(false)}
                footer={true}
                destroyOnClose={true}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="bank_name"
                                label="Tên ngân hàng"
                                rules={[{
                                    required: true,
                                    message: "Tên ngân hàng là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input placeholder="Nhập tên ngân hàng"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Số điện thoại"
                                rules={[{
                                    required: true,
                                    message: "Số điện thoại là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input type="number" placeholder="Nhập số điện thoại"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="full_name"
                                label="Họ và tên"
                                rules={[{
                                    required: true,
                                    message: "Họ tên là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input placeholder="Nhập họ và tên"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="citizen_id"
                                label="Số CMND/CCCD"
                                rules={[{
                                    required: true,
                                    message: "Số CMND/CCCD là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input type="number" placeholder="Nhập số chứng minh nhân dân hoặc số căn cước"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="user_name"
                                label="Tên đăng nhập"
                                rules={[{
                                    required: true,
                                    message: "Tên đăng nhập là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input placeholder="Nhập tên đăng nhập của bạn "/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="password"
                                label="Mật khẩu "
                                rules={[{
                                    required: true,
                                    message: "Mật khẩu là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input placeholder="Nhập mật khẩu của bạn"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <Form.Item
                                name="smart_otp"
                                label="Smart Otp"
                                rules={[{
                                    required: true,
                                    message: "Smart Otp là trường yêu cầu bắt buộc"
                                }]}
                            >
                                <Input placeholder="Nhập smart otp của bạn"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={data}/>
        </>
    );
}

export default FromList;
