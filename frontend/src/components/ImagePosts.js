import ImagePost from "./ImagePost";

const ImagePosts = ({ data, title, hidden }) => {
    if (data?.length > 0) {
        return (
            data.map((post) => <ImagePost hidden={hidden} key={post._id} id={post._id} name={post.name} description={post.prompt} image={post.photo} {...post} />)
        );
    }
    return (
        <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
}

export default ImagePosts