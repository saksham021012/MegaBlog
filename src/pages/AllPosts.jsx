import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await appwriteService.getPosts([]);
                if (response) {
                    setPosts(response.documents);
                }
            } catch (err) {
                setError('Failed to load posts. Please try again.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="bg-gray-300 rounded-lg h-48 mb-4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="w-full py-8 min-h-screen bg-gray-50">
                <Container>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Posts</h1>
                        <p className="text-gray-600">Loading posts...</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                                <LoadingSkeleton />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full py-8 min-h-screen bg-gray-50">
                <Container>
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Something went wrong
                            </h2>
                            <p className="text-gray-600 mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 min-h-screen bg-gray-50">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">All Posts</h1>
                    <p className="text-gray-600">
                        {posts.length === 0 ? 'No posts found' : `${posts.length} Post(s) Available`}
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                No posts yet
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Be the first to share something amazing!
                            </p>
                            <button
                                onClick={() => window.location.href = '/add-post'}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
                            >
                                Create Post
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
