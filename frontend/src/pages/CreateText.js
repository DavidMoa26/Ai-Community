import ChatForm from "../components/ChatForm"

const CreateText = () => {

    return (
        <>
            <div className='max-w-7xl mx-auto'>
                <h1 className="font-extrabold text-[#222328] text-[48px]">Generete Text</h1>
                <p className="mt-2 text-[#666e75] text-[22px] max-w-[500px]"> Generate any Text through Open-AI and share it with the community</p>
            </div>
            <ChatForm />
        </>
    )
}
export default CreateText