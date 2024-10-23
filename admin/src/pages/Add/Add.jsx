import "./add.css";
import { useEffect } from "react";
import { Banner } from "../../components/Banner";
import { Form } from "../../components/Form";
import { Menu } from "../../components/Menu";

const Add = () => {
  useEffect(() => {
    document.title = `igadgets - Add Product`;
  }, []);
  return (
    <>
      {/* menu */}
      <Menu />

      <section className="add-products">
        {/* banner */}
        <Banner />

        {/* form */}
        <Form formType={`add`} />
      </section>
    </>
  );
};

export default Add;
