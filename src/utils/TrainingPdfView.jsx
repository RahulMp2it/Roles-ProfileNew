import React from 'react'
import { useSearchParams } from 'react-router-dom';

const TrainingPdfView = () => {

    const [searchParams] = useSearchParams();
    const pdfPath = searchParams.get('pdfPath'); // Extract pdfPath from the query string
    console.log("pdfPath", pdfPath);



    return (
        <div className="w-screen h-screen bg-black flex items-center justify-center" >
           {pdfPath ? (
            <iframe
              src={`http://localhost:8080/${pdfPath}`}
              title="pdf Viewer"
              className="w-full h-[90vh]"
            />
          ) : (
            <p className="text-red-500">No document selected.</p>
          )}

        </div>
    )
}

export default TrainingPdfView