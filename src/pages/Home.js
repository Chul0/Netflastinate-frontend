import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom'

const Home = () => {
   

    return(
        <div className="homePage">
        <AwesomeSlider className="slider" style={{height:"320px", margin:"20px auto"}}
        media={[
          {
            source: 'https://i1.wp.com/www.heyuguys.com/images/2015/10/star-wars-the-force-awakens-poster-landscape.jpg?fit=1536%2C864&ssl=1',
          },
          {
            source: 'https://i.pinimg.com/originals/bc/8e/d1/bc8ed144511819dda5b7cdfdfe925a01.jpg',
          },
          {
            source: 'https://cdn.wallpapersafari.com/29/24/CTAz5x.jpg',
          },
        ]}
      />
      <div className="homeMessage">
          <h1>Ready to netflastinate?</h1>
          <Link to="/login">
            <p>JOIN NOW</p>
          </Link>
      </div>
      </div>
    )
}

export default Home
