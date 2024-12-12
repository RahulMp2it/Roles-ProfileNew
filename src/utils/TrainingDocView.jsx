import React from 'react'
import { useSearchParams } from 'react-router-dom';

function TrainingDocView() {

    const [searchParams] = useSearchParams();
    const docPath = searchParams.get('docPath'); // Extract docPath from the query string
    console.log('docPath', docPath);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          {docPath ? (
            <iframe
              src={`http://localhost:8080/${docPath}`}
              title="Document Viewer"
              className="w-full h-[90vh]"
            />
          ) : (
            <p className="text-red-500">No document selected.</p>
          )}
        </div>
      );
}

export default TrainingDocView
