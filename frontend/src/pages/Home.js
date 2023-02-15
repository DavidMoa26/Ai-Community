import React, { useState, useEffect } from 'react'
import SearchBar from "../components/SearchBar"
import Description from "../components/Description"
import Loader from '../components/Loader'
import ImagePosts from '../components/ImagePosts'
import TextPosts from '../components/TextPosts'
import HideCheckBox from '../components/HideCheckBox'


const Home = () => {

    const [allImagePosts, setAllImagePosts] = useState([])
    const [allTextPosts, setAllTextPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const [searchImageText, setSearchImageText] = useState('')
    const [searchText, setTextSearch] = useState('')


    const [searchTimeout, setSearchTimeout] = useState(null);

    const [searchedImageResults, setSearchedResults] = useState(null);
    const [searchedTextResults, setSearchedTextResults] = useState(null);

    const [hideText, setHideText] = useState(false)
    const [hideImage, setHideImage] = useState(false)


    const hideTextHandler = () => {
        !hideText ? setHideText(true) : setHideText(false)
    }
    const hideImageHandler = () => {
        !hideImage ? setHideImage(true) : setHideImage(false)
    }

    const fetchImagePosts = async () => {

        setLoading(true)

        try {
            const imageResponse = await fetch(`${process.env.REACT_APP_API}api/posts/image-posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (imageResponse.ok) {
                const result = await imageResponse.json();
                setAllImagePosts(result.data.reverse());
                setLoading(false)
            }
        } catch (err) {
            alert(err);
        }
    };
    const fetchTextPosts = async () => {

        setLoading(true)

        try {
            const imageResponse = await fetch(`${process.env.REACT_APP_API}api/posts/text-posts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (imageResponse.ok) {
                const result = await imageResponse.json();
                setAllTextPosts(result.data.reverse());
                setLoading(false)
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        fetchImagePosts();
        fetchTextPosts();
    }, []);



    const handleImagesSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchImageText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allImagePosts.filter((item) => item.name.toLowerCase().includes(searchImageText.toLowerCase()) || item.prompt.toLowerCase().includes(searchImageText.toLowerCase()));
                setSearchedResults(searchResult);
            }, 500),
        );
    };
    const handleTextSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setTextSearch(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allTextPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.input.toLowerCase().includes(searchText.toLowerCase()));
                setSearchedTextResults(searchResult);
                console.log(searchResult);
            }, 500),

        );
    };

    return (
        <>
            <Description />
            <div className='flex'>
                <SearchBar searchFor="Text" value={searchText} onChange={handleTextSearchChange} />
                <SearchBar searchFor="Images" onChange={handleImagesSearchChange} value={searchImageText} />
            </div>
            <div className="flex justify-around" >
                <HideCheckBox hideHandler={hideTextHandler} value={hideText} name="Text" />
                <HideCheckBox hideHandler={hideImageHandler} value={hideImage} name="Image" />
            </div>



            <div className='lg:flex lg:justify-around sm:inline-block'>
                <div>
                    {searchText && !loading && (
                        <h2 className="font-medium text-[#666e75] text-xl mb-3">
                            Showing Results for <span className="text-[#222328]">{searchText}</span>:
                        </h2>
                    )}
                </div>
                <div>
                    {searchImageText && !loading && (
                        <h2 className="font-medium text-[#666e75] text-xl mb-3">
                            Showing Results for <span className="text-[#222328]">{searchImageText}</span>:
                        </h2>
                    )}
                </div>
            </div>


            <div className='flex flex-wrap justify-center'>
                {
                    (!loading && searchText.length > 0) && <TextPosts data={searchedTextResults} hidden={hideText} />
                }
                {
                    (!loading && searchImageText.length > 0) && <ImagePosts data={searchedImageResults} hidden={hideImage} />
                }
                {
                    ((!loading && !searchedTextResults) || searchText.length === 0) && <TextPosts data={allTextPosts} hidden={hideText} />
                }
                {
                    ((!loading && !searchedImageResults) || searchImageText.length === 0) && <ImagePosts data={allImagePosts} hidden={hideImage} />
                }




            </div>
            <div className='flex flex-wrap justify-center m-2'>
                {loading && <Loader />}
            </div>
        </>
    )
}
export default Home