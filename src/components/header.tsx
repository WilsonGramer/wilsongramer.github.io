import { useRouter } from "next/router";

const items = [
    {
        title: "Home",
        route: "/",
        link: "/",
    },
    {
        title: "Blog",
        route: "/blog/[slug]",
        link: "/#blog",
    },
    {
        title: "GitHub",
        route: undefined,
        link: "https://github.com/WilsonGramer",
    },
    {
        title: "Twitter",
        route: undefined,
        link: "https://twitter.com/WilsonGramer",
    },
];

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex align-center justify-between p-5">
            <div className="flex gap-5">
                {items.map((item) => {
                    const active = item.route === router.route;

                    return (
                        <a
                            key={item.title}
                            className={[
                                "no-underline",
                                active ? "font-semibold" : "",
                            ].join(" ")}
                            href={item.link}
                        >
                            {item.title}
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default Header;
