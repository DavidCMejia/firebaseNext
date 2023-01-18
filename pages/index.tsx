import type { NextPage } from 'next';
import {
  Form, Input, Button, message,
} from 'antd';

const Home: NextPage = () => {
  const [form] = Form.useForm();
  const hola:any = 22;

  // const [createUser, { data, error }] = useMutation(CREATE_USER_MUTATION, REFRESH_QUERY);

  const handleSubmit = (values: any) => {
    console.log('values', values);
    // try {
    //   createUser((
    //     {
    //       variables: {
    //         email: values.email,
    //         password: values.password,
    //         cedula: values.cedula
    //       }
    //     }
    //   ));
    //   message.success('Registro creado con exito');
    // } catch (error) {
    //   message.error({
    //     content: `Error al guardar el registro: ${error}`,
    //     duration: 5,
    //   });

    // }

    form.resetFields();
  };

  return (

    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit}
      size="large"
    >

      <br />
      <div className="wrap">
        <h1>CRUD FIREBASE</h1>
        <br />
        <br />

        <Form.Item label="Email" name="email" rules={[{ type: 'email' }]} required>
          <Input required />
        </Form.Item>

        <Form.Item label="Password" name="password" required>
          <Input.Password required />
        </Form.Item>

        <Form.Item label="Cedula" name="cedula" required>
          <Input required />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>

          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Form.Item>
      </div>
    </Form>

  );
};

export default Home;
