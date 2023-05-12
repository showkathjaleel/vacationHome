import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { signUpSchema } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate= useNavigate()
  //  ---------------validation using formik----------------
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values,action) => {
        if (Object.keys(errors).length === 0  ) {
          registerUser(values)        
        }
        action.resetForm();
      }
    });

  async function registerUser(data){
    console.log('function akath keriiiiiii')
    const {name,email,password}=data;
    // ev.preventDefault();
    try {
      await axios.post("/register", {
          name,
          email,
          password
      });
      toast.success("Signup successful!");
      navigate("/login")
     // alert('Your registeration is complete.')
    }catch(e){
      //alert('Registration failed, Please try again later!')
      ((error) => {
        toast.error(error.response.data.msg, {
            position: "top-center",
        });
     })(e);



    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-center text-4xl  mt-6">Register</h1>
        <form className="max-w-md mx-auto mt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="yourname"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            // value={name}
            // onChange={(ev) => setName(ev.target.value)}
          />
          {errors.name && touched.name ? (
            <p className="text-red-500 text-sm">{errors.name}</p>
          ) : null}
          <input
            type="email"
            placeholder="youremail@gmail.com"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            // value={email}
            // onChange={(ev) => setEmail(ev.target.value)}
          />
          {errors.email && touched.email ? (
            <p className="text-red-500 text-sm">{errors.email}</p>
          ) : null}
          <input
            type="password"
            placeholder="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            // value={password}
            // onChange={(ev) => setPassword(ev.target.value)}
          />
          {errors.password && touched.password ? (
            <p className="text-red-500 text-sm">{errors.password}</p>
          ) : null}
          <motion.button className="primary mt-1" whileHover={{ scale: 1.1 }}>
            Register
          </motion.button>
        </form>
        <div className="text-center py-2 text-gray-500">
          Already a member?{" "}
          <Link to={"/login"} className="underline text-black">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
