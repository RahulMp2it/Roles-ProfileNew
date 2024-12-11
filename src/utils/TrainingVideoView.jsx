import React from 'react';
import { useSearchParams } from 'react-router-dom';

const TrainingVideoView = () => {

    const [searchParams] = useSearchParams();
    const path1 = searchParams.get('path1'); // Extract path1 from the query string

    console.log('path1', path1);



    return (
        <div
            className="w-screen h-screen bg-black flex items-center justify-center"
        >
            {path1 ? (
                <video
                    className="w-full h-full"
                    controls
                    autoPlay // Optional: Start playback automatically
                >
                    <source src={`http://localhost:8080/${path1}`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <p className="text-red-500 text-center">No video source provided</p>
            )}
        </div>


    );
};

export default TrainingVideoView;
