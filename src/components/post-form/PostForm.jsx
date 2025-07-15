import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors },
    } = useForm({
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
                // Update post
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) navigate(`/post/${dbPost.$id}`);
            } else {
                // Create post
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
                        userID: userData.$id,
                    });

                    if (dbPost) navigate(`/post/${dbPost.$id}`);
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
        return value
            ?.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g, "-") || "";
    }, []);

    useEffect(() => {
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {post ? "Edit Post" : "Create New Post"}
                    </h1>
                    <p className="text-gray-600">
                        {post ? "Update your post details below" : "Fill in the details to create your post"}
                    </p>
                </div>

                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                        {submitError}
                    </div>
                )}

                <form onSubmit={handleSubmit(submit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-6 rounded-lg shadow border">
                                <h2 className="text-lg font-semibold mb-4">Post Content</h2>

                                <Input
                                    label="Title"
                                    placeholder="Enter post title"
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                                <Input
                                    label="Slug"
                                    placeholder="post-slug"
                                    {...register("slug", { required: "Slug is required" })}
                                    onInput={(e) =>
                                        setValue("slug", slugTransform(e.currentTarget.value), {
                                            shouldValidate: true,
                                        })
                                    }
                                />
                                {errors.slug && <p className="text-sm text-red-500">{errors.slug.message}</p>}

                                <RTE
                                    label="Content"
                                    name="content"
                                    control={control}
                                    defaultValue={getValues("content")}
                                />
                                {errors.content && (
                                    <p className="text-sm text-red-500">{errors.content.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Right: Sidebar */}
                        <div className="space-y-6">
                            {/* Featured Image */}
                            <div className="bg-white p-6 rounded-lg shadow border">
                                <h3 className="text-lg font-semibold mb-4">Featured Image</h3>

                                <Input
                                    label="Upload Image"
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg, image/gif"
                                    {...register("image", {
                                        required: !post ? "Featured image is required" : false,
                                    })}
                                />
                                {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}

                                {post && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 mb-2">Current image:</p>
                                        <img
                                            src={appwriteService.getFilePreview(post.featuredImage)}
                                            alt={post.title}
                                            className="w-full h-48 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Status + Submit */}
                            <div className="bg-white p-6 rounded-lg shadow border">
                                <Select
                                    label="Status"
                                    options={["active", "inactive"]}
                                    {...register("status", { required: "Status is required" })}
                                />
                                {errors.status && (
                                    <p className="text-sm text-red-500 mt-1">{errors.status.message}</p>
                                )}
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow border">
                                <Button
                                    type="submit"
                                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (post ? "Updating..." : "Creating...") : post ? "Update Post" : "Create Post"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
