import { Button,  Modal, Form } from 'antd';

export default function ModalWithFormExample() {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  
  const showModal = () => {
    setVisible(true)
  }

  const handleSubmit = (values) => {
    console.log(values)
  }
  
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  };
  
  return (
    <>
      <Button onClick={showModal}>Open Modal</Button>
      <Modal visible={visible} onOk={form.submit} onCancel={handleCancel}>
        <Form form={form} onFinish={handleSubmit}>
          {/* Any input */}
        </Form>
      </Modal>
    </>
  )
}