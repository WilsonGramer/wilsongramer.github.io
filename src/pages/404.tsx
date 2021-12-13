import { NextPage } from "next";

const Custom404: NextPage = () => {
    return (
        <div className="p-4 w-full mx-auto text-center">
            <h1 className="text-3xl font-medium my-4">404</h1>

            <p className="text-xl text-secondary">
                Sorry, this page doesn’t exist.
            </p>
        </div>
    );
};

export default Custom404;
