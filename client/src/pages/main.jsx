import React, { useState } from "react";
import { GetAnalysisCall } from "../api/get.analysis";


const SentimentAnalysis = () => {
    const [link, setLink] = useState(""); 
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (link) {
          setLoading(true);
          setError(null); 
      
          try {
            const analysisResult = await GetAnalysisCall(link);
      
            if (analysisResult.success === false) {
              setError(analysisResult.message);
            } else {
              setResult(analysisResult);
            }
          } catch (err) {
            setError("Something went wrong! Please try again.");
            console.log(err);
          } finally {
            setLoading(false);
          }
        } else {
          setError("Please enter a valid URL.");
        }
    };

    return (
        // <div className="min-h-screen pt-16 bg-gray-100 dark:bg-gray-900 text-black dark:text-white flex flex-col items-center px-4">
        // <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8">
        //     Sentiment Analysis
        // </h1>

        // <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        //     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        //     <input
        //         type="url"
        //         placeholder="Enter a YouTube video URL"
        //         value={link}
        //         onChange={(e) => setLink(e.target.value)}
        //         className="p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        //     />
        //     <button
        //         type="submit"
        //         className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        //     >
        //         Analyze
        //     </button>
        //     </form>
        // </div>

        // {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
        // {loading && <p className="mt-4 text-blue-600 font-medium">Analyzing...</p>}

        // {result && !loading && (
        //     <div className="mt-10 w-full max-w-6xl grid md:grid-cols-2 gap-6">
        //     <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-6">
        //         <h2 className="text-xl font-bold mb-4">Overall Sentiment</h2>
        //         <p
        //         className={`text-2xl font-semibold mb-6 ${
        //             result.result.overall_result === "Positive"
        //             ? "text-green-500"
        //             : result.result.overall_result === "Negative"
        //             ? "text-red-500"
        //             : "text-yellow-500"
        //         }`}
        //         >
        //         {result.result.overall_result || "N/A"}
        //         </p>

        //         {["Positive", "Negative", "Neutral"].map((type) => (
        //         <div className="mb-4" key={type}>
        //             <h3 className="font-semibold mb-1">{type} Sentiment</h3>
        //             <div className="flex items-center gap-3">
        //             <span className="font-medium">
        //                 {result.result[`total_${type.toLowerCase()}`] ?? "N/A"}
        //             </span>
        //             <input
        //                 type="range"
        //                 value={result.result[`total_${type.toLowerCase()}`] ?? 0}
        //                 max="100"
        //                 min="0"
        //                 disabled
        //                 className="w-3/4"
        //             />
        //             </div>
        //         </div>
        //         ))}
        //     </div>

        //     <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-md p-6">
        //         <h2 className="text-xl font-bold mb-4">Video Details</h2>

        //         <div className="mb-4">
        //         <p className="text-sm text-gray-600 dark:text-gray-300">
        //             Comments Analyzed:{" "}
        //             {result.result.comments_used_in_analysis ?? "N/A"} /{" "}
        //             {result.video_details.comment_count ?? "N/A"}
        //         </p>
        //         </div>

        //         <div className="mb-4">
        //         <h3 className="font-semibold">Channel Name</h3>
        //         <p className="text-gray-800 dark:text-gray-200">
        //             {result.video_details.channel_title ?? "N/A"}
        //         </p>
        //         </div>

        //         <div className="mb-4">
        //         <h3 className="font-semibold">Video Title</h3>
        //         <p className="text-gray-800 dark:text-gray-200">
        //             {result.video_details.video_title ?? "N/A"}
        //         </p>
        //         </div>

        //         <div className="mb-4">
        //         <h3 className="font-semibold">Engagement</h3>
        //         <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        //             <li>Likes: {result.video_details.like_count ?? "N/A"}</li>
        //             <li>Views: {result.video_details.view_count ?? "N/A"}</li>
        //         </ul>
        //         </div>
        //     </div>
        //     </div>
        // )}
        // </div>

        <div className="min-h-screen pt-16 bg-gray-100 text-black flex flex-col items-center px-4">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
            Sentiment Analysis
        </h1>

        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="url"
                placeholder="Enter a YouTube video URL"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="p-3 border border-gray-300 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Analyze
            </button>
            </form>
        </div>

        {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
        {loading && <p className="mt-4 text-blue-600 font-medium">Analyzing...</p>}

        {result && !loading && (
            <div className="mt-10 w-full max-w-6xl grid md:grid-cols-2 gap-6">
            <div className="bg-white text-black rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Overall Sentiment</h2>
                <p
                className={`text-2xl font-semibold mb-6 ${
                    result.result.overall_result === "Positive"
                    ? "text-green-500"
                    : result.result.overall_result === "Negative"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
                >
                {result.result.overall_result || "N/A"}
                </p>

                {["Positive", "Negative", "Neutral"].map((type) => (
                <div className="mb-4" key={type}>
                    <h3 className="font-semibold mb-1">{type} Sentiment</h3>
                    <div className="flex items-center gap-3">
                    <span className="font-medium">
                        {result.result[`total_${type.toLowerCase()}`] ?? "N/A"}
                    </span>
                    <input
                        type="range"
                        value={result.result[`total_${type.toLowerCase()}`] ?? 0}
                        max="100"
                        min="0"
                        disabled
                        className="w-3/4"
                    />
                    </div>
                </div>
                ))}
            </div>

            <div className="bg-white text-black rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Video Details</h2>

                <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Comments Analyzed:{" "}
                    {result.result.comments_used_in_analysis ?? "N/A"} /{" "}
                    {result.video_details.comment_count ?? "N/A"}
                </p>
                </div>

                <div className="mb-4">
                <h3 className="font-semibold">Channel Name</h3>
                <p className="text-gray-800">
                    {result.video_details.channel_title ?? "N/A"}
                </p>
                </div>

                <div className="mb-4">
                <h3 className="font-semibold">Video Title</h3>
                <p className="text-gray-800">
                    {result.video_details.video_title ?? "N/A"}
                </p>
                </div>

                <div className="mb-4">
                <h3 className="font-semibold">Engagement</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>Likes: {result.video_details.like_count ?? "N/A"}</li>
                    <li>Views: {result.video_details.view_count ?? "N/A"}</li>
                </ul>
                </div>
            </div>
            </div>
        )}
</div>

    );
};

export default SentimentAnalysis;
