import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            if (post) {
                // Updating existing post
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                // Creating new post
                if (!data.image || !data.image[0]) {
                    setSubmitError("Please select an image");
                    return;
                }

                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    
                    const { image, ...postData } = data;
                    
                    const dbPost = await appwriteService.createPost({ 
                        ...postData, 
                        userID: userData.$id 
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                } else {
                    setSubmitError("Failed to upload image");
                }
            }
        } catch (error) {
            setSubmitError(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {post ? "Edit Post" : "Create New Post"}
                    </h1>
                    <p className="text-gray-600">
                        {post ? "Update your post details below" : "Fill in the details to create your post"}
                    </p>
                </div>

                {/* Error Message */}
                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-700">{submitError}</span>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Post Content</h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            label="Title"
                                            placeholder="Enter post title"
                                            className="mb-1"
                                            {...register("title", { required: "Title is required" })}
                                        />
                                        {errors.title && (
                                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            label="Slug"
                                            placeholder="post-slug"
                                            className="mb-1"
                                            {...register("slug", { required: "Slug is required" })}
                                            onInput={(e) => {
                                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                            }}
                                        />
                                        {errors.slug && (
                                            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
                                        )}
                                        <p className="text-gray-500 text-sm mt-1">
                                            URL-friendly version of the title
                                        </p>
                                    </div>

                                    <div>
                                        <RTE 
                                            label="Content" 
                                            name="content" 
                                            control={control} 
                                            defaultValue={getValues("content")} 
                                        />
                                        {errors.content && (
                                            <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Input
                                            label="Upload Image"
                                            type="file"
                                            className="mb-1"
                                            accept="image/png, image/jpg, image/jpeg, image/gif"
                                            {...register("image", { required: !post ? "Featured image is required" : false })}
                                        />
                                        {errors.image && (
                                            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
                                        )}
                                        <p className="text-gray-500 text-sm mt-1">
                                            PNG, JPG, JPEG, GIF up to 10MB
                                        </p>
                                    </div>

                                    {post && (
                                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                                            <p className="text-sm text-gray-600 mb-2">Current image:</p>
                                            <img
                                                src={appwriteService.getFilePreview(post.featuredImage)}
                                                alt={post.title}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Post Settings */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Settings</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <Select
                                            options={["active", "inactive"]}
                                            label="Status"
                                            className="mb-1"
                                            {...register("status", { required: "Status is required" })}
                                        />
                                        {errors.status && (
                                            <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                                        )}
                                        <p className="text-gray-500 text-sm mt-1">
                                            Active posts are visible to all users
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <Button 
                                    type="submit" 
                                    bgColor={post ? "bg-green-500" : "bg-blue-500"} 
                                    className="w-full flex items-center justify-center"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {post ? "Updating..." : "Creating..."}
                                        </>
                                    ) : (
                                        <>
                                            {post ? (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                    Update Post
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                    </svg>
                                                    Create Post
                                                </>
                                            )}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}