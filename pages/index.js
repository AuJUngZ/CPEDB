import { Inter } from "@next/font/google";
import { useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [status, setStatus] = useState("Please wait...");
  const [option, setOption] = useState(1);
  const [studentId, setStudentId] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleSubmit = async () => {
    const data = {
      id: studentId,
      thumbnail: bannerImage,
      img: profileImage,
    };
    if (option == 1) {
      try {
        const res = await axios.post("/api/add", data);
        setStatus(res.data.message);
      } catch (e) {
        setStatus(e.response.data.message);
      }
    } else if (option == 2) {
      try {
        const res = await axios.put("/api/add", data);
        setStatus(res.data.message);
      } catch (e) {
        setStatus(e.response.data.message);
      }
    } else if (option == 3) {
      try {
        const res = await axios.delete("/api/add", { data });
        setStatus(res.data.message);
      } catch (e) {
        setStatus(e.response.data.message);
      }
    }
    //change status to "Please wait..."
    setTimeout(() => {
      setStatus("Please wait...");
    }, 2000);
  };

  const handleOption = (e) => {
    setOption(e.target.value);
  };

  const handleStudentId = (e) => {
    setStudentId(e.target.value);
  };

  const handleBannerImage = (e) => {
    setBannerImage(e.target.value);
  };

  const handleProfileImage = (e) => {
    setProfileImage(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 bg-light mt-2 rounded-2">
            <h3 className="text-center color-primary text-primary m-2">
              Add Edit Remove CPE64 DATABASE
            </h3>
            <select
              className="form-select"
              aria-label="Select options"
              onChange={(e) => {
                handleOption(e);
              }}
              defaultValue={1}
            >
              <option value="1">Add</option>
              <option value="2">Edit</option>
              <option value="3">Remove</option>
            </select>
            <div className="d-flex mt-5 gap-2 justify-content-center align-self-center">
              <div>
                <h5 className="text-primary text-center">StudentId</h5>
                <input
                  className="form-control"
                  type="text"
                  placeholder="64061xxxx"
                  onChange={(e) => {
                    handleStudentId(e);
                  }}
                ></input>
              </div>
              <div>
                <h5 className="text-primary text-center">Banner image</h5>
                <input
                  className="form-control"
                  type="text"
                  placeholder="https://www.google.com"
                  onChange={(e) => {
                    handleBannerImage(e);
                  }}
                  value={bannerImage}
                ></input>
              </div>
              <div>
                <h5 className="text-primary text-center">Profile image</h5>
                <input
                  className="form-control"
                  type="text"
                  placeholder="https://www.google.com"
                  onChange={(e) => {
                    handleProfileImage(e);
                  }}
                  value={profileImage}
                ></input>
              </div>
            </div>
            <div className="text-center m-5">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </button>
            </div>
            <p className="text-center text-dark fw-bold fs-4">
              Status : {status}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
