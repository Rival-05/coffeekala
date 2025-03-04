import React, { useEffect, useRef, useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/pic-1.svg';
import img2 from '../assets/pic-2.svg';
import img3 from '../assets/pic-3.svg';
import img4 from '../assets/pic-4.svg';
import cappu from '../assets/cappu.png';
import frap from '../assets/frappe.png';
import mint from '../assets/mint.png';
import straw from '../assets/strawberry.png';
import p1 from '../assets/person-1.png';
import p2 from '../assets/person-2.png';
import p3 from '../assets/person-3.png';
import p4 from '../assets/person-4.png';
import p5 from '../assets/person-5.png';
import TiltedCard from '../ui/TitleCard.jsx';
import Testimonial from '../ui/Testimonial.jsx';
import ContactUs from './ContactUs.jsx';
// Memoize TiltedCard for better performance
const MemoizedTiltedCard = memo(TiltedCard);

// Constants
const IMAGES = [img1, img2, img3, img4];
const PRODUCTS = [
  { name: "Cappuccino", imageSrc: cappu },
  { name: "Cold Frappe", imageSrc: frap },
  { name: "Mint Blue Crush Mojito", imageSrc: mint },
  { name: "Strawberry Margaritta", imageSrc: straw },
];
const TESTIMONIALS = [
  {
    quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Lakshya Pradhan",
    
    src: p1,
  },
  {
    quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Sachin Sharma",
    
    src: p2,
  },
  {
    quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Abhijeet Gulati",
    
    src: p3,
  },

];
const AUTO_PLAY_INTERVAL = 3000;

const Home = () => {
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Handle scroll
  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(
        containerRef.current.scrollLeft / containerRef.current.clientWidth
      );
      setCurrentImageIndex(index);
    }
  };

  // Scroll left/right
  const scroll = (direction) => {
    if (containerRef.current) {
      const newIndex = direction === 'left' 
        ? Math.max(0, currentImageIndex - 1)
        : Math.min(IMAGES.length - 1, currentImageIndex + 1);
      
      scrollToIndex(newIndex);
    }
  };

  // Scroll to specific index
  const scrollToIndex = (index) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * containerRef.current.clientWidth,
        behavior: 'smooth'
      });
      setCurrentImageIndex(index);
    }
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlayEnabled) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        const isLastImage = currentImageIndex === IMAGES.length - 1;
        const newIndex = isLastImage ? 0 : currentImageIndex + 1;
        
        scrollToIndex(newIndex);
      }
    }, AUTO_PLAY_INTERVAL);
    
    return () => clearInterval(interval);
  }, [currentImageIndex, isAutoPlayEnabled]);

  return (
    <div id="home" className="min-h-screen w-full py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Hero Section with Slider and Text */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          {/* Image Slider */}
          <div className="w-full lg:w-3/5 relative">
            <div 
              className="relative w-full overflow-hidden rounded-xl shadow-xl group"
              onMouseEnter={() => setIsAutoPlayEnabled(false)}
              onMouseLeave={() => setIsAutoPlayEnabled(true)}
            >
              {/* Images container */}
              <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-hidden snap-x snap-mandatory touch-pan-x"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {IMAGES.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Coffee Kala ${index + 1}`}
                    className="flex-none w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] object-cover snap-start"
                    style={{ minWidth: '100%' }}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                ))}
              </div>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {IMAGES.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50'
                    }`}
                    onClick={() => scrollToIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <button
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/75 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/75 p-3 rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full lg:w-2/5 text-left bg-white p-6 sm:p-8 lg:p-10 rounded-lg shadow-lg relative z-10 lg:-ml-16 -mt-10 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Our Story
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
              Coffee Kala is more than just a cafe; it's an aesthetic experience. We are dedicated to showcasing authenticity in every aspect, 
              from our menu to the ambiance. Join us to savor the perfect blend of flavors and creativity.
            </p>
          </div>
        </div>

        {/* Products Section */}
        <div id="menu" className="mt-12 sm:mt-16 lg:mt-20 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">Discover</h2>
              <button 
                onClick={() => navigate('/menu')}
                className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore More
              </button>
            </div>
            <h2 className="text-xl sm:text-xl lg:text-2xl font-light">Best Sellers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-20 lg:mt-4">
              {PRODUCTS.map((product, index) => (
                <MemoizedTiltedCard
                  key={index}
                  className="mx-auto sm:mx-0"
                  imageSrc={product.imageSrc}
                  altText={product.name}
                  captionText={product.name}
                  containerHeight="475px"
                  containerWidth="100%"
                  imageHeight="460px"
                  imageWidth="100%"
                  rotateAmplitude={8}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <p className="tilted-card-demo-text">
                      {product.name}
                    </p>
                  }
                />
              ))}
            </div>

            {/* Customer Stories Section */}
           {/* Customer Stories Section */}
            <div className="mt-20 sm:mt-28 lg:mt-36 text-center lg:mb-20"> {/* Increased margin-top */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 mb-6 sm:mb-8">
                Customer Stories
              </h2>
              <div className="flex flex-wrap justify-center mt-8">
                {TESTIMONIALS.map((testimonial, index) => (
                  <Testimonial
                    key={index}
                    quote={testimonial.quote}
                    name={testimonial.name}
                    src={testimonial.src}
                  />
                ))}
              </div>
            </div>
            <div className='mt-28'>
              <ContactUs/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;