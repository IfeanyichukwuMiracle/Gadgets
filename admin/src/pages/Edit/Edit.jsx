import { Banner } from "../../components/Banner";
import { Form } from "../../components/Form";
import { Menu } from "../../components/Menu";
import "./edit.css";

const Edit = () => {
  return (
    <>
      {/* Menu icon */}
      <Menu />

      <section className="edit-product">
        {/* Banner */}
        <Banner />

        {/* Form */}
        <Form formType={`edit`} />
      </section>
    </>
  );
};

export default Edit;
