import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await appwriteService.getPosts();
                console.log('Fetched Posts:', postsResponse);
                if (postsResponse) {
                    setPosts(postsResponse.documents || []);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Hero Section for unauthenticated users
    const UnauthenticatedHero = () => (
        <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 px-4">
            <Container>
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Hero Content */}
                    <div className="mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Share Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Story</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of writers and readers in a community where every story matters. 
                            Create, share, and discover amazing content from passionate writers around the world.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/signup"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Start Writing Today
                            </Link>
                            <Link
                                to="/login"
                                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Writing</h3>
                            <p className="text-gray-600">
                                Intuitive editor with rich formatting options. Focus on your content while we handle the rest.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Vibrant Community</h3>
                            <p className="text-gray-600">
                                Connect with fellow writers, share feedback, and grow together in our supportive community.
                            </p>
                        </div>
                        
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Publishing</h3>
                            <p className="text-gray-600">
                                Publish your stories instantly and reach readers worldwide. No waiting, no barriers.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                                <div className="text-gray-600">Active Writers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                                <div className="text-gray-600">Stories Published</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">1M+</div>
                                <div className="text-gray-600">Readers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                                <div className="text-gray-600">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );

    // Loading state
    if (loading) {
        return (
            <div className="w-full py-16">
                <Container>
                    <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading amazing stories...</p>
                    </div>
                </Container>
            </div>
        );
    }

    // Unauthenticated user experience
    if (!isAuthenticated) {
        return <UnauthenticatedHero />;
    }

    // Empty state for authenticated users
    if (posts.length === 0) {
        return (
            <div className="w-full py-16">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            No Stories Yet
                        </h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Be the first to share your story with the community! Every great platform starts with brave writers like you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/add-post"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Write Your First Story
                            </Link>
                            <button
                                onClick={() => window.location.reload()}
                                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Posts display for authenticated users
    return (
        <div className="w-full py-8">
            <Container>
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Discover Amazing Stories
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore the latest stories from our community of passionate writers
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="transform hover:scale-105 transition-transform duration-300">
                            <PostCard {...post} user={post.user} />
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Have a Story to Tell?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Join our community of writers and share your unique perspective with the world.
                    </p>
                    <Link
                        to="/add-post"
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Start Writing
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default Home;