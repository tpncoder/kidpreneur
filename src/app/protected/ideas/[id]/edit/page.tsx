import EditPostForm from "@/components/EditPostForm"

export default function EditPostPage({ params }: { params: { id: string } }) {
  const id = params.id

  return <EditPostForm id={id} />
}
