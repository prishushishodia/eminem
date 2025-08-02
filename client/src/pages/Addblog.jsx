import { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

// Correct imports for the core Quill library's CSS and JS files
import "quill/dist/quill.snow.css";
import "quill/dist/quill.js";

import { db, collection, addDoc } from "../../firebase";
import { Timestamp } from "firebase/firestore";

// Use React.lazy to dynamically import ReactQuill
// This ensures it loads after the core Quill library is available
const ReactQuill = lazy(() => import("react-quill"));

const AddBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [secondTitle, setSecondTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      secondTitle,
      date: Timestamp.fromDate(new Date(date)),
      author,
      imageUrl,
      content,
    };

    try {
      const blogCollectionRef = collection(db, "blogs");
      const docRef = await addDoc(blogCollectionRef, newBlog);

      if (docRef.id) {
        alert("Blog added successfully!");
        setTitle("");
        setSecondTitle("");
        setDate(new Date().toISOString().split("T")[0]);
        setAuthor("");
        setImageUrl("");
        setContent("");
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      alert("Failed to add the blog. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black pt-28">
      <div className="w-full max-w-4xl p-8 space-y-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">Add a New Blog</h2>
        <form onSubmit={handleAddBlog} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium text-gray-300">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="secondTitle" className="block text-lg font-medium text-gray-300">
              Second Title
            </label>
            <input
              type="text"
              id="secondTitle"
              placeholder="Enter second title"
              value={secondTitle}
              onChange={(e) => setSecondTitle(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-300">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-lg font-medium text-gray-300">
              Author
            </label>
            <input
              type="text"
              id="author"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-lg font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-lg font-medium text-gray-300">
              Blog Content
            </label>
            {/* Using Suspense to handle the loading of the ReactQuill component */}
            <Suspense fallback={<div>Loading editor...</div>}>
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="bg-gray-800 mb-9 text-gray-300 rounded-lg"
                placeholder="Write your blog here..."
                style={{ height: "1000px" }}
              />
            </Suspense>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;