import ImageForm from "../components/ImageForm"


const CreateImage = () => {
    return (
        <>
            <section className="max-w-7xl mx-auto">
                <div>
                    <h1 className="font-extrabold text-[#222328] text-[48px]">Generate Image</h1>
                    <p className="mt-2 text-[#666e75] text-[22px] max-w-[500px]"> Generate an image through DALL-E AI and share it with the community</p>
                </div>
            </section>
            <ImageForm />
        </>
    )
}
export default CreateImage