import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import posts, { Post } from "../../helpers/posts";
import { ParsedUrlQuery } from "querystring";
import { format, parse } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { nord as syntaxHighlightingStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface PostProps {
    slug: string;
    post: Post;
}

const Post: NextPage<PostProps> = (props) => {
    return (
        <article className="p-4">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-medium">{props.post.title}</h1>
                <p className="text-xl font-medium">
                    {format(
                        parse(props.post.date, "yyyy-MM-dd", new Date()),
                        "MMMM d, yyyy"
                    )}
                </p>
            </div>

            <ReactMarkdown
                className="max-w-3xl mx-auto post"
                components={{
                    code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            // @ts-ignore
                            <Prism
                                style={syntaxHighlightingStyle}
                                language={match[1]}
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </Prism>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {props.post.content}
            </ReactMarkdown>
        </article>
    );
};

interface Params extends ParsedUrlQuery {
    slug: string;
}

export const getStaticProps: GetStaticProps<PostProps, Params> = ({
    params,
}) => ({
    props: {
        slug: params!.slug,
        post: posts[params!.slug],
    },
});

export const getStaticPaths: GetStaticPaths<Params> = () => ({
    paths: Object.keys(posts).map((slug) => ({
        params: {
            slug,
        },
    })),
    fallback: false,
});

export default Post;
