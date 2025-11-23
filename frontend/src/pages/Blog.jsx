import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPostById } from '../services/postsService';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');

    fetchPosts({ page, limit })
      .then(({ posts, total }) => {
        if (!mounted) return;
        setPosts(posts);
        setTotal(total || posts.length);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load posts');
        setPosts([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [page, limit]);

  const openPost = async (id) => {
    setSelectedPost({ loading: true });
    try {
      const post = await fetchPostById(id);
      setSelectedPost({ loading: false, post });
    } catch (err) {
      setSelectedPost({ loading: false, error: err.message });
    }
  };

  const closePost = () => setSelectedPost(null);

  const totalPages = Math.max(1, Math.ceil((total || posts.length) / limit));

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Latest Blog Posts</h1>
      <p className="text-gray-600 mb-10">
        Explore articles, tutorials, and updates from our instructors.
      </p>

      {/* Status */}
      {loading && <p className="text-gray-700">Loading posts…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && posts.length === 0 && <p>No posts found.</p>}

      {/* Posts Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow border"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>

            <time className="text-sm text-gray-500 block mb-3">
              {new Date(post.createdAt || post.date).toLocaleDateString()}
            </time>

            <p
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{
                __html: post.excerpt || 
                  (post.content && post.content.slice(0, 140) + "..."),
              }}
            />

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => openPost(post.id)}
                className="text-indigo-600 hover:underline font-medium"
              >
                Read More
              </button>
              <a
                href={`/posts/${post.id}`}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Permalink →
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <footer className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className={`px-4 py-2 rounded-md border ${
            page <= 1
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Prev
        </button>

        <span className="font-semibold text-gray-800">
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded-md border ${
            page >= totalPages
              ? "text-gray-400 border-gray-200 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </footer>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 relative">
            {selectedPost.loading && <p>Loading post…</p>}
            {selectedPost.error && <p className="text-red-600">{selectedPost.error}</p>}

            {selectedPost.post && (
              <>
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {selectedPost.post.title}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  By {selectedPost.post.author || "Unknown"} ·{" "}
                  {new Date(selectedPost.post.createdAt).toLocaleString()}
                </p>

                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: selectedPost.post.content }}
                />
              </>
            )}

            <button
              onClick={closePost}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
