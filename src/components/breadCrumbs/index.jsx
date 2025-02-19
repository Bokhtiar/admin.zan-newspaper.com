import { Link } from "react-router-dom"

export const BreadCrumbs = (props) => {
    return <section className="flex justify-between shadow-md p-4 px-6 rounded-md mb-5">
        <h2 className=" font-semibold text-xl">{props.title}</h2>
        <Link to={props.link}>
            <span class="border border-green-500 rounded-full material-symbols-outlined p-1">
                {props.icon}
            </span>
        </Link>
    </section>

}