import { Banner } from "../../components/Banner";
import { useEffect } from "react";
import { Form } from "../../components/Form";
import { Menu } from "../../components/Menu";
import "./edit.css";

const Edit = () => {
  useEffect(() => {
    document.title = `igadgets - Edit Product`;
  }, []);
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
