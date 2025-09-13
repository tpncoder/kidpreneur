import { prisma } from "@/lib/prisma"
import Link from "next/link"
import DeletePostButton from "@/components/DeletePostButton"
import { Button } from "@/components/ui/button"

export default async function UserProfilePage({
    params,
}: {
    params: { id: string }
}) {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) },
        include: { posts: { orderBy: { createdAt: "desc" } } },
    })

    if (!user) {
        return (
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-xl font-bold">User not found</h1>
            </div>
        )
    }

    return (
        <main className="max-w-4xl py-8 space-y-8">
            {/* Profile Header */}
            <div className="flex items-center space-x-6 p-6 bg-white rounded-lg shadow">
                <div className="w-18 h-24 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user.email[0].toUpperCase()}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{user.email}</h1>
                    <p className="text-gray-500">{user.posts.length} Posts</p>
                </div>
            </div>

            {/* User Posts */}
            <div>
                <h2 className="text-xl font-semibold mb-4">Posts</h2>
                {user.posts.length === 0 ? (
                    <p className="text-gray-500">No posts yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {user.posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-semibold mb-2">
                                    <Link href={`/ideas/${post.id}`}>{post.title}</Link>
                                </h3>
                                <p className="text-gray-600 mb-2">{post.content}</p>
                                <div className="justify-between items-center text-sm text-gray-500">
                                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <div className="mt-2 flex gap-2">
                                        <Link href={`/protected/ideas/${post.id}/edit`}>
                                            <Button size="sm">Edit</Button>
                                        </Link>
                                        <DeletePostButton postId={post.id} />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </main>
    )
}
