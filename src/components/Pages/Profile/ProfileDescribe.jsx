import Layout from '../../Layout'
import Skill from '../ProfileDescribe/Skill';
import Role from '../ProfileDescribe/Role';
import Interview from '../ProfileDescribe/Interview';
import Knowledge from '../ProfileDescribe/Knowledge';
import PBehaviour from '../ProfileDescribe/PBehaviour';
import Tasksheet from '../ProfileDescribe/Tasksheet';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TrainingVideoCard from '../../../utils/TrainingVideoCard';
import TrainingDocCard from '../../../utils/TrainingDocCard';
import TrainingPdfCard from '../../../utils/TrainingPdfCard';

function ProfileDescribe({ heading, isSubPage, }) {


  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Skills'); // State to track the active tab
  const uploadModal = useRef(null); // Reference for the modal
  const fileInputRef = useRef(null);  // Create a ref for the file input
  const [file, setFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState(null); // Track the selected file type
  const [error, setError] = useState(null); // Track validation errors
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile_id")
  const [trainingMaterials, setTrainingMaterials] = useState([]);
  const [profileDetails, setProfileDetails] = useState({
    profileName: '',
    department: '',
    designation: '',
  });

  // Fetch profile details based on profileId
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/profile/${profileId}`);
        console.log("Profile API Response:", response.data.data.designation);

        setProfileDetails({
          profileName: response.data.data.Profile || '',
          department: response.data.data.department || '',
          designation: response.data.data.designation || '',
        });
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (profileId) {
      fetchProfileDetails();
    } else {
      console.error("Profile ID is undefined");
    }
  }, [profileId]);

  // Fetch training materials
  useEffect(() => {
    const fetchTrainingMaterials = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/training/${profileId}`);
        setTrainingMaterials(response.data);
      } catch (error) {
        console.error("Error fetching training materials:", error);
      }
    };

    if (profileId) {
      fetchTrainingMaterials();
    }
  }, [profileId,trainingMaterials]);

  const handleFileIconClick = (fileType) => {
    setSelectedFileType(fileType); // Set the file type (PDF, MP4, Word) based on the clicked image
    fileInputRef.current.click(); // Trigger the file input
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      // Validate file type
      const validFileTypes = {
        pdf: ['application/pdf'],
        mp4: ['video/mp4'],
        word: [
          'application/msword', 
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ],
      };

      if (!validFileTypes[selectedFileType].includes(uploadedFile.type)) {
        setError(`Invalid file type. Please upload a ${selectedFileType.toUpperCase()} file.`);
        setFile(null);
        return;
      }

      // If valid, clear errors and set the file
      setError(null);
      setFile(uploadedFile);
      console.log(`Uploaded ${selectedFileType.toUpperCase()} file:`, uploadedFile);
    }

    ///setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file || !selectedFileType) {
      setError("Please select a file and type before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", selectedFileType);
    formData.append("profileId", profileId);

    try {
      const response = await axios.post("http://localhost:8080/api/training/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //alert("File uploaded successfully!");
      console.log("Uploaded file response:", response.data);

      // Add the newly uploaded file to the UI immediately
    const newFile = {
      _id: response.data._id, // API response ID
      fileType: response.data.fileType,
      originalName: response.data.originalName,
      filePath: response.data.filePath,
      link: response.data.link, // Adjust based on API response
    };

    setTrainingMaterials((prevMaterials) => [...prevMaterials, newFile]);

      // Clear the form and close the modal after successful upload
      setFile(null);
      setSelectedFileType(null);
      uploadModal.current.close();
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload the file. Please try again.");
    }
  };

  return (
    <>
      <style>
        {`
          [type='radio']:checked {
              background-image: none !important;
              background-size: initial !important;
          },
          .tab:checked {
                  border-radius: 16px;
        }
          // [type='radio']:hover {
          //     background-color: transparent !important;
          //     border-color: inherit !important;
          // }
          //  [type='radio']:checked:hover {
          //     background-color: transparent !important;
          //     border-color: inherit !important;
          // }
        `}
      </style>

      <Layout>
        <div className=" fixed top-14 me-3 ms-[215px] pt-5 pb-[100px] w-[85%] p-2 ">
          <div className=" overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
            <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">
              {isSubPage ? (
                <button onClick={() => navigate(-1)} className="text-blue-500 flex items-center">
                  <FaArrowLeftLong className="mr-2" /> {heading}
                </button>
              ) : (
                <p className="text-[#7D8592] text-[14px] tracking-wide mb-0">{heading}</p>
              )}
            </p>
            <div className="grid grid-cols-4 place-content-between gap-4">
              <div className="col-span-3 ">
                <h1 className="text-[34px] font-nunito font-semibold">Profile/ {profileDetails.profileName || 'Not Available'}</h1>
              </div>


              <div className="text-end">
                <button
                  className={`btn text-white font-nunito w-[200px] px-2 py-3 rounded-xl ${activeTab === 'Training Material' ? 'bg-[#3F8CFF]' : 'bg-gray-400'
                    }`}
                  onClick={() => uploadModal.current.showModal()} // Open the modal
                  disabled={activeTab !== 'Training Material'}
                >
                  + Upload Files
                </button>
              </div>
            </div>

            {/* Modal for uploading files */}
            <dialog ref={uploadModal} className="modal h-auto">
              <div className="modal-box overflow-y-auto no-scrollbar lg:h-[calc(100vh-90px)]">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  onClick={() => uploadModal.current.close()} // Close the modal
                >
                  ✕
                </button>
                <h2 className="text-[20px] font-bold mb-4">Upload Files</h2>
                <form>
                  <div className="mb-4 grid grid-col-2 ">
                    {/* Hidden file input using the ref */}
                      <input
                        type="file"
                        ref={fileInputRef}  // Attach the ref here
                        onChange={handleFileChange}
                        accept={
                          selectedFileType === 'pdf'
                            ? '.pdf'
                            : selectedFileType === 'mp4'
                              ? '.mp4'
                              : selectedFileType === 'word'
                                ? '.doc,.docx'
                                : '*'
                        }
                        style={{ display: 'none' }}  // Hide the default input element
                      />
                    <div className='grid lg:grid-cols-2 '>
                      {/* Custom button to trigger the file input */}
                      <button type="button" onClick={() => handleFileIconClick('pdf')} style={{ marginBottom: '10px', }}>
                        <img src='public\Skills.png' alt="File Preview" style={{ maxWidth: '250px' }} />
                      </button>

                      <button type="button" onClick={() => handleFileIconClick('mp4')} style={{ marginBottom: '10px', }}>
                        <img src='public\Role.png' alt="File Preview" style={{ maxWidth: '250px' }} />
                      </button>

                      <button type="button" onClick={() => handleFileIconClick('word')} style={{ marginBottom: '10px', }}>
                        <img src='public\Training Material.png' alt="File Preview" style={{ maxWidth: '250px' }} />
                      </button>

                      <div className="mt-[100px] ml-[70px]">
                        <button
                          onClick={handleUpload}
                          // disabled={!file}
                          type="button"
                          disabled={!file || !selectedFileType}
                          className="btn text-white font-nunito px-8 py-3 bg-[#3F8CFF] rounded-xl"
                        >
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </dialog>

            {/* main Container */}
            <div className="max-w-[1400px] h-[100%] mt-3 pl-3 pr-[20px] py-8 mx-auto rounded-[20px] bg-white">
              {/* first NavBar */}
              <div className="w-[1250px] h-20 bg-[#F4F9FD] flex items-center mb-5 rounded-[18px]">
                <div className="px-6">
                  <p className="text-[#91929E] text-[12px]">Profile Name</p>
                  <p className="text-[14px] font-semibold">{profileDetails.profileName || 'Not Available'}</p>
                </div>
                <div className="px-6">
                  <p className="text-[#91929E] text-[12px]">Department</p>
                  <p className="text-[14px] font-semibold">{profileDetails.department?.DepartmentName || 'Not Available'}</p>
                </div>
                <div className="px-11">
                  <p className="text-[#91929E] text-[12px]">Designation</p>
                  <p className="text-[14px] font-semibold">{profileDetails.designation?.DesignationName || 'Not Available'}</p>
                </div>

              </div>

              {/* Second NavBar */}
              <div role="tablist" className="tabs tabs-bordered w-[1250px] h-16 bg-[#F4F9FD] pt-[8px] pb-[10px]">
                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Skills" id="tab-skills" onClick={() => setActiveTab('Skills')} defaultChecked />
                <div role="tabpanel" className="tab-content p-10 ">
                  <Skill />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Role & Function" id="tab-role" onClick={() => setActiveTab('Role & Function')} />
                <div role="tabpanel" className="tab-content p-10">
                  <Role />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Interview" onClick={() => setActiveTab('Interview')} />
                <div role="tabpanel" className="tab-content p-10" id="tab-interview">
                  <Interview />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Training Material" id="tab-training" onClick={() => setActiveTab('Training Material')} />
                <div role="tabpanel" className="tab-content p-10">


                  <div className="grid lg:grid-cols-6 gap-12 py-8 mx-auto overflow-hidden">
                    {
                      trainingMaterials.map((item) => {
                        //console.log('item123', item);

                        return (
                          item.fileType === 'mp4' ?
                            <TrainingVideoCard key={item._id} link={item.link} name={item.originalName} path1={item.filePath} />
                            : item.fileType === 'word' ?
                              <TrainingDocCard key={item._id} link={item.link} name={item.originalName} docPath={item.filePath} />
                              : item.fileType === 'pdf' ?
                                <TrainingPdfCard key={item._id} link={item.link} name={item.originalName} pdfPath={item.filePath} />
                                : 'Type not supported'
                        )
                      })
                    }
                  </div>
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Knowledge" id="tab-knowledge" onClick={() => setActiveTab('Knowledge')} />
                <div role="tabpanel" className="tab-content p-10">
                  <Knowledge />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Evaluation Behaviour" id="tab-behaviour" onClick={() => setActiveTab('Evaluation Behaviour')} />
                <div role="tabpanel" className="tab-content p-10">
                  <PBehaviour />
                </div>

                <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="TaskSheet" id="tab-tasksheet" onClick={() => setActiveTab('TaskSheet')} />
                <div role="tabpanel" className="tab-content p-10">
                  <Tasksheet />
                </div>

              </div>

            </div>

          </div>
        </div >
      </Layout >

    </>
  )
}

export default ProfileDescribe
