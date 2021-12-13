import { format } from "date-fns";

const Footer = () => (
    <div className="my-8 text-xs text-secondary text-center">
        © {format(new Date(), "yyyy")} Wilson Gramer
    </div>
);

export default Footer;
