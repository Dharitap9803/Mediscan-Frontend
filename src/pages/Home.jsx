// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

// // Import images
// import Home1 from '../../src/assets/images/Home1.png';
// import Home2 from '../../src/assets/images/Home2.png';

// const Home = () => {
//     const responsive = {
//         superLargeDesktop: {
//             breakpoint: { max: 4000, min: 1920 },
//             items: 1,
//         },
//         desktop: {
//             breakpoint: { max: 1920, min: 1024 },
//             items: 1,
//         },
//         tablet: {
//             breakpoint: { max: 1024, min: 464 },
//             items: 1,
//         },
//         mobile: {
//             breakpoint: { max: 464, min: 0 },
//             items: 1,
//         },
//     };

//     return (
//         <div style={{ width: '100vw', height: '100vh', overflowY: 'hidden' }}>
//             <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000}>
//                 <div>
//                     <img
//                         src={Home1}
//                         alt="Home1"
//                         style={{
                          
//                             width: '100%',
//                             height: '100vh',
//                             objectFit: 'contain',
//                         }}
//                     />
//                 </div>
//                 <div>
//                     <img
//                         src={Home2}
//                         alt="Home2"
//                         style={{
//                             width: '100%',
//                             height: '100vh',
//                             objectFit: 'contain',
//                         }}
//                     />
//                 </div>
//             </Carousel>
//         </div>
//     );
// };

// export default Home;