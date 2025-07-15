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

    const UnauthenticatedHero = () => (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen flex items-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <Container>
                <div className="relative z-10 max-w-6xl mx-auto text-center py-20">
                    <div className="mb-8">
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full text-blue-700 font-medium text-sm mb-6 border border-blue-200/50">
                            ✨ Welcome to the Community
                        </span>
                    </div>
                    
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
                        Share Your{' '}
                        <span className="relative">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse">
                                Story
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-50"></div>
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                        Join thousands of writers and readers in a vibrant community where every story matters. 
                        <span className="block mt-2 text-gray-500">Express yourself, connect with others, and be heard.</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                        <Link to="/signup" className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                            <span className="relative z-10">Start Writing Today</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </Link>
                        <Link to="/login" className="group border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                            Sign In
                        </Link>
                    </div>
                    
                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Rich Stories</h3>
                            <p className="text-sm text-gray-600">Create and share beautifully formatted stories</p>
                        </div>
                        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                            <p className="text-sm text-gray-600">Connect with fellow writers and readers</p>
                        </div>
                        <div className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Instant Publish</h3>
                            <p className="text-sm text-gray-600">Share your thoughts with the world instantly</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <Container>
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <p className="text-gray-600 text-xl mt-6 font-medium">Loading amazing stories...</p>
                        <div className="flex space-x-1 mt-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <UnauthenticatedHero />;
    }

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <Container>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="relative mb-8">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                                        <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-75"></div>
                                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></div>
                                    </div>
                                </div>
                            </div>
                            
                            <h2 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                No Stories Yet
                            </h2>
                            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
                                Be the first to share your story with the community!<br />
                                <span className="text-gray-500">Your unique voice is what makes this place special.</span>
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link to="/add-post" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Write Your First Story
                                    </span>
                                </Link>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="group border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                                >
                                    <span className="flex items-center justify-center">
                                        <svg className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Refresh
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Container>
                <div className="py-16">
                    {/* Header Section */}
                    <div className="mb-16 text-center">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full text-blue-700 font-medium text-sm border border-blue-200/50">
                                📚 Latest Stories
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Discover Amazing{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Stories
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explore the latest stories from our community of passionate writers
                        </p>
                    </div>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
                        {posts.map((post, index) => (
                            <div 
                                key={post.$id} 
                                className="transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
                                    <PostCard {...post} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-white/50 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Have a Story to Tell?
                            </h3>
                            <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                                Join our community and share your unique perspective with the world. 
                                Every story has the power to inspire, educate, and connect.
                            </p>
                            <Link to="/add-post" className="group inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                <span className="flex items-center">
                                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Start Writing
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;