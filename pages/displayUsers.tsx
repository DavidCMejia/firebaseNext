/* eslint-disable import/no-extraneous-dependencies */
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  message,
  Modal,
  Table,
} from 'antd';
import {
  collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const DisplayUsersData: NextPage = () => {
  const [isOpenMOdal, setIsOpenModal] = useState<boolean>(false);
  const [modalForm] = Form.useForm();
  const [dataTabla, setDataTabla] = useState<any>([]);
  // console.log('🚀 ~ dataTabla', dataTabla);

  const getData = async () => {
    // console.log('values', values);
    try {
      const q = query(collection(db, 'users')); // query
      const dataQuery = await getDocs(q);
      const docs:any = [];

      dataQuery.forEach((document) => {
        // console.log('🚀 ~ doc', doc.data().values);
        // convierte datos a array
        docs.push({ ...document.data().values, id: document.id });
        // console.log(doc.id, ' => ', doc.data());
      });
      setDataTabla(docs);
    } catch (error) {
      message.error({
        content: `Error al guardar el consultar los registros: ${error}`,
        duration: 5,
      });
    }
  };

  const getDataSnapshot = () => {
    // console.log('values', values);
    try {
      const q = query(collection(db, 'users')); // query

      onSnapshot(q, (querySnapshot) => {
        const docs:any = [];

        querySnapshot.forEach((document) => {
          docs.push({ ...document.data().values, id: document.id });
          setDataTabla(docs);
        });
      });
    } catch (error) {
      message.error({
        content: `Error al guardar el consultar los registros: ${error}`,
        duration: 5,
      });
    }
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const onEditUser = async (values: any) => {
    try {
      await updateDoc(doc(db, 'users', values.id), { values });
      // getData();
      message.success('Usuario actualizado con exito');
    } catch (error) {
      message.error({
        content: `Error al editar el usuario: ${error}`,
        duration: 5,
      });
    }

    modalForm.resetFields();
    setIsOpenModal(false);
  };

  const onDeleteUser = (record: any) => {
    Modal.confirm({
      title: 'Esta seguro que desea eliminar el usuario?',
      okText: 'Si',
      cancelText: 'No',
      okType: 'danger',
      onOk: async () => {
        try {
          await deleteDoc(doc(db, 'users', record.id));
          // getData();
          message.success('Registro eliminado con exito');
        } catch (error) {
          message.error({
            content: `Error al eliminar el usuario: ${error}`,
            duration: 5,
          });
        }
      },
    });
  };

  const selectUser = (record: any) => {
    setIsOpenModal(true);
    // console.log("Editando usuario: ", record);
    modalForm.setFieldsValue({
      id: record.id,
      email: record.email,
      password: record.password,
      cedula: record.cedula,

    });
  };

  const columns = [

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Cedula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (_: any, record:any) => (
        <>
          <EditOutlined
            onClick={() => {
              selectUser(record);
            }}
          />

          <DeleteOutlined
            onClick={() => {
              onDeleteUser(record);
            }}
            style={{ color: 'red', marginLeft: 20 }}
          />
        </>
      ),
    },
  ];

  useEffect(() => {
    getDataSnapshot();
  }, []);

  return (
    <div className="wrap">
      <div className="main">
        <Table
          dataSource={dataTabla}
          columns={columns}
          size="large"
        />
        <Modal
          title="Editando Usuario"
          cancelText="Cancelar"
          okText="Guardar"
          open={isOpenMOdal}
          onOk={modalForm.submit}
          onCancel={handleCancel}
        >
          <Form
            form={modalForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            onFinish={onEditUser}
          >
            <Form.Item label="ID" name="id">
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ type: 'email' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input />
            </Form.Item>

            <Form.Item label="Cedula" name="cedula">
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default DisplayUsersData;
