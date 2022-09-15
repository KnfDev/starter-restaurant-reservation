import Steak from "../Images/Steak.png"
import Pasta from "../Images/Pasta.png"
import Pork from "../Images/Pork.png"

export default function Slideshow(){
  return (
    <>
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Steak} className="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        {/* <h5>First slide label</h5> */}
        <p>To eat is to live.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={Pasta} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        {/* <h5>Second slide label</h5> */}
        <p>To live is to eat.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={Pork} class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        {/* <h5>Third slide label</h5> */}
        <p>But to enjoy is to.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </>
  )
}