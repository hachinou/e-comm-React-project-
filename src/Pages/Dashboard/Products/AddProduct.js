import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CAT, Cat, Pro } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../Components/Loading/Loading";

export default function AddProduct() {
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
    stock: 0,
  };
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState();
  const [id, setId] = useState();
  const nav = useNavigate();

  // Ref
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  console.log(ids);

  // Handle Focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  function handleOpenImage() {
    openImage.current.click();
  }

  // Get all Categories
  useEffect(() => {
    Axios.get(`/${CAT}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);
  // Handle Edit
  async function HandleEdit(e) {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await Axios.post(`${Pro}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  // Handle Submit Form
  async function HandleSubmitForm() {
    try {
      const res = await Axios.post(`${Pro}/add`, dummyForm);
      setId(res.data.id);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  const j = useRef(-1);
  // Handle Image Change
  async function HandleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);
    const imageAsFiles = e.target.files;
    const data = new FormData();

    for (let i = 0; i < imageAsFiles.length; i++) {
      j.current++;
      data.append("image", imageAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }

  // HandleChange
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(1);
    if (sent !== 1) {
      HandleSubmitForm();
    }
  }
  //Handle Image delete
  async function handleImageDelete(id, img) {
    const findId = ids.current[id];
    try {
      const res = await Axios.delete(`product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
    } catch (err) {
      console.log(err);
    }
  }
  // Mapping
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));
  const imagesShow = images.map((img, key) => (
    <div className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img src={URL.createObjectURL(img)} width="80px"></img>
          <div>
            <p className="mb-1 ">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / 1024).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleImageDelete(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-3" onSubmit={HandleEdit}>
        <Form.Group className="mb-3" contrilId="category ">
          <Form.Label>Category</Form.Label>
          <Form.Select
            ref={focus}
            value={form.category}
            onChange={handleChange}
            name="category"
            placeholder="title..."
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" contrilId="title ">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={form.title}
            onChange={handleChange}
            required
            type="text"
            name="title"
            placeholder="title..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="description ">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={form.description}
            onChange={handleChange}
            required
            type="text"
            name="description"
            placeholder="Description..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="price ">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={form.price}
            onChange={handleChange}
            required
            type="text"
            name="price"
            placeholder="Price..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="discount ">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            value={form.discount}
            onChange={handleChange}
            required
            type="text"
            name="discount"
            placeholder="Discount..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="About ">
          <Form.Label>About</Form.Label>
          <Form.Control
            value={form.About}
            onChange={handleChange}
            required
            type="text"
            name="About"
            placeholder="About..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="stock ">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            value={form.stock}
            onChange={handleChange}
            required
            type="number"
            name="stock"
            placeholder="stock..."
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" contrilId="images ">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            onChange={HandleImagesChange}
            type="file"
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex justify-content- center align-items-center gap-2 py-3 rounded mb-3  w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: sent && "pointer",
          }}
        >
          <img
            src={require("../../../Assets/images/Upload.png")}
            alt="Upload Here"
            width="100px"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#0086fe" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>

        <button className="btn btn-primary">Save</button>
      </Form>
    </>
  );
}
