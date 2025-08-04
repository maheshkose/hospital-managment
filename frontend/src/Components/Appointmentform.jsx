import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Appointmentform = () => {
  const navigate = useNavigate();
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
    {
      name: "Other",
    },
  ];
  const fields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "nic",
    "dob",
    "gender",
    "appointment_date",
    "department",
    "doctor",
    "address",
    "hasVisited",
  ];

  const [doctors, setdoctors] = useState([]);



  const [formData, setformData] = useState({
    firstName: "mahesh",
    lastName: "kose",
    email: "kj@gmail",
    phone: "1234567890",
    nic: "1234567890",
    dob: "",
    gender: "Male",
    appointment_date: "",
    department: "",
    doctor: "",
    address: "bisnoor ",
    hasVisited:false,
  });
    useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "response?.data?https://hospital-managment-backend-knzo.onrender.com/api/v1/user/doctors",
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
     console.log("doctors",data);

      setdoctors(data.doctors);
    };
    fetchDoctors();
  }, [formData.department]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "doctor") {
      setformData({...formData, doctor:value})
    } else if (name === "hasVisited") {
      setformData({ ...formData, hasVisited: e.target.checked });
    } else if (name === "department") {
      setformData({
        ...formData,
        department:value,
        
      });
    } else {
      setformData({ ...formData, [name]: value });
    }
  };

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(formData.hasVisited);
      setformData({ ...formData, hasVisited: hasVisitedBool });

       const {data} = await axios.post("response?.data?https://hospital-managment-backend-knzo.onrender.com/api/v1/appointment/post",formData,{withCredentials:true,headers:{"Content-Type":"application/json"}});

       console.log(data);
       toast.success(data.message);
       navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>

        <form  onSubmit={handleAppointment}>
          
          {fields.map((field) => (
            <div key={field}>
              {field === "gender" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder="Enter your gender"
                  required
                >
                  <option value="" disabled>
                    select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">female</option>
                  <option value="Other">Other</option>
                </select>
              ) : field === "department" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder="Enter your Department"
                  required
                >
                  <option value="" disabled>
                    select Department
                  </option>
                  {departmentsArray.map((depart) => (
                    <option key={depart.name} value={depart.name}>
                      {depart.name}
                    </option>
                  ))}
                </select>
              ) : field === "doctor" ? (
                <select
                  name={field}
                  value={formData.doctor}
                  onChange={handleChange}
                  disabled={!formData.department}
                >
                  <option value="" disabled>
                    select doctor
                  </option>
                  {doctors && doctors.length > 0
                    ? doctors
                        .filter(
                          (doc) => doc.doctorDeparment === formData.department
                        )
                        .map((doctor, index) => (
                          <option
                            key={index}
                            value={doctor._id}
                          >
                            Dr. {doctor.firstName}
                            {doctor.lastName}
                          </option>
                        ))
                    : doctors.length === 0 && <option>no doctor avvilable</option>}
                </select>
              ) : field === "hasVisited" ? (
                <div
                  className="hasvisited"
                  style={{
                    gap: "10px",
                    justifyContent: "flex-end",
                    flexDirection: "row",
                  }}
                >
                  <label htmlFor={field}>Have you visited Before</label>
                  <input
                    type="checkbox"
                    name={field}
                    id={field}
                    checked={formData.hasVisited}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <>
                  {/* <label htmlFor={field}>{field.charAt(0).toUpperCase()+field.slice(1)}</label> */}
                  <input
                    type={
                      field === "dob" || field === "appointment_date"
                        ? "date"
                        : field === "password"
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    required
                  />
                </>
              )}
            </div>
          ))}
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <button type="submit">Get Appointment</button>
          </div>
         
        </form>
      </div>
    </>
  );
};

export default Appointmentform;
