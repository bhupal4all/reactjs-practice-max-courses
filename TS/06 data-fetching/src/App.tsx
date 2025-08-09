import {get} from "./util/http.ts";
import {ReactNode, useEffect, useState} from "react";
import BlogPosts, {type BlogPost} from "./components/BlogPosts.tsx";
import fetchingImage from './assets/data-fetching.png';
import ErrorMessage from "./components/ErrorMessage.tsx";

type RawDataBlogPost = {
    id: number;
    userId: number;
    title: string;
    body: string;
}

function App() {
    const [fetchedPosts, setFectedPosts] = useState<BlogPost[] | undefined>();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    useEffect(() => {
        async function fetchPosts() {
            setIsFetching(true);
            setError(undefined);
            try {
                const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RawDataBlogPost[];
                const blogPosts: BlogPost[] = data.map(post => ({
                    id: post.id,
                    title: post.title,
                    text: post.body,
                }));

                setFectedPosts(blogPosts);
            } catch (error) {
                setFectedPosts([]);
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
            setIsFetching(false);
        }

        fetchPosts();
    }, []);

    let content: ReactNode;
    if (fetchedPosts) {
        content = <BlogPosts posts={fetchedPosts}/>;
    }

    if (isFetching) {
        content = <p>Fetching Posts...</p>;
    }

    if (error) {
        content = <ErrorMessage text={error}/>;
    }

    return <>
        <main>
            <img src={fetchingImage} alt="Loading..."/>
            {content}
        </main>
    </>;
}

export default App;
