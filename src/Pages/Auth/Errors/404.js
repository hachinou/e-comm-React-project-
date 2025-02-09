import { Link } from "react-router-dom";
import "./404.css";
export default function Err404({ role }){
    return(
        <section>
            <div className="container">
                <div className="row">
                    <div class="col-sm-12">
                        <div class="col-sm-12 text-center">
                            <div class="four_zero_four_bg">
                                <h1 class="text-center">
                                        404
                                </h1>
                            </div>
                            <div class="content_box_404">
                                <h3>Look like you're lost</h3>
                                <p>the page you are looking for not avaible</p>
                                <Link to={"/"} class="link_404">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}