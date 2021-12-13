import { format, parse } from "date-fns";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Post } from "../helpers/posts";

interface HomeProps {
    posts: Record<string, Post>;
}

const profileImageURL =
    "https://0.gravatar.com/avatar/1a55ce5c75a3f6759a6ecd47e99f7aac?s=200";

const Home: NextPage<HomeProps> = (props) => {
    return (
        <>
            <Head>
                <title>Wilson Gramer</title>
                <link rel="icon" href={profileImageURL} />
            </Head>

            <section className="p-4">
                <div className="w-full mx-auto text-center">
                    <img
                        src={profileImageURL}
                        alt="Wilson Gramer"
                        className="w-20 rounded-full mx-auto"
                    />

                    <h1 className="text-3xl font-medium my-4">
                        Hi, I’m Wilson Gramer
                    </h1>

                    <p className="text-xl text-secondary">
                        I’m a passionate student developer currently working at{" "}
                        <a href="https://mk-dir.com">Make Directory</a>.
                        <br className="hidden md:inline" /> Check out what I’ve
                        been building recently:
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <Project
                        image="/images/wipple.svg"
                        title="Wipple"
                        description="A programming language designed to be natural to read, write and learn."
                        linkTitle="Learn Wipple"
                        link="https://wipple.gramer.dev"
                    />

                    <Project
                        image="/images/superhomework.png"
                        title="SuperHomework"
                        description="Automatically organize your homework across all of your classes."
                        linkTitle="View on App Store"
                        link="https://superhomeworkapp.com"
                    />

                    <Project
                        image="/images/oratio.png"
                        title="Oratio"
                        description="Learn a new language with realtime transcription inspired by children’s books."
                        linkTitle="Watch the demo"
                        link="#"
                    />
                </div>
            </section>

            <section id="blog" className="mt-8 p-4">
                <div className="p-4 w-full mx-auto text-center">
                    <p className="text-xl text-secondary">
                        I also write about programming on my blog:
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    {Object.entries(props.posts)
                        .reverse()
                        .map(([slug, post]) => (
                            <PostPreview key={slug} slug={slug} post={post} />
                        ))}
                </div>
            </section>
        </>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
    props: { posts: (await import("../helpers/posts")).default },
});

export default Home;

const Project = (props: {
    image: string;
    title: string;
    description: string;
    linkTitle: string;
    link: string;
}) => (
    <div className="flex flex-col gap-3.5 bg-secondary p-3.5 rounded-xl">
        <img src={props.image} alt={props.title} className="w-10 h-10" />

        <div className="flex-grow">
            <p className="font-semibold mb-1">{props.title}</p>
            <p className="text-secondary">{props.description}</p>
        </div>

        <a href={props.link}>{props.linkTitle} ↗</a>
    </div>
);

const PostPreview = (props: { slug: string; post: Post }) => (
    <div className="flex flex-col h-full gap-3.5 bg-secondary p-3.5 rounded-xl">
        <p className="font-semibold">
            {props.post.title}
            <br />
            <span className="font-semibold text-xs text-secondary">
                {format(
                    parse(props.post.date, "yyyy-MM-dd", new Date()),
                    "MMMM d, yyyy"
                )}
            </span>
        </p>

        <p className="flex-grow text-gray-800 dark:text-gray-100">
            {props.post.description}
        </p>

        <a href={`/blog/${props.slug}`}>Read ↗</a>
    </div>
);
