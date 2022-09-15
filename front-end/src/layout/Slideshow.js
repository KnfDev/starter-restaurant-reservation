import Steak from "../Images/Steak.png"
import Pasta from "../Images/Pasta.png"
import Pork from "../Images/Pork.png"

export default function Slideshow(){
  return (
    <>
    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={Steak} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        {/* <h5>First slide label</h5> */}
        <p>To eat is to live.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={Pasta} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        {/* <h5>Second slide label</h5> */}
        <p>To live is to eat.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={Pork} className="d-block w-100" alt="..."/>
      <div className="carousel-caption d-none d-md-block">
        {/* <h5>Third slide label</h5> */}
        <p>But to enjoy is to.</p>
      </div>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
    </>
  )
}