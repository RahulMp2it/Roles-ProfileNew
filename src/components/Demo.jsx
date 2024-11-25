import React, { useRef, useState } from 'react'

function Demo() {
    const fileInputRef = useRef(null);  // Create a ref for the file input
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
    };

    const handleUpload = () => {
        console.log('file data', file);
    };

    const triggerFileInput = () => {
        // Trigger the file input dialog using the ref
        fileInputRef.current.click();
    };

    return (
        <>

            <div>
                {/* Hidden file input using the ref */}
                <input
                    type="file"
                    ref={fileInputRef}  // Attach the ref here
                    onChange={handleFileChange}
                    style={{ display: 'none' }}  // Hide the default input element
                />
                {/* Custom button to trigger the file input */}
                <button onClick={triggerFileInput} style={{ marginBottom: '10px', }}>
                    <img src='public\Skills.png' alt="File Preview" style={{ maxWidth: '200px' }} />
                </button>
            

            </div>

            <button
                onClick={handleUpload}
                disabled={!file}
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Upload
            </button>
        </>
    );
}

export default Demo
