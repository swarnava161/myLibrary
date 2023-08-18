import React from 'react';
import { Container } from 'react-bootstrap';


const About = () => {
  return (
    <Container className='text-white my-5'>
         <div className="border p-4 rounded-2">
      <h1 className="mt-5  text-decoration-underline text-center fw-bold" >About<span className='text-warning '> My Library</span></h1>
      <hr />
      <h2 className="mt-5 text-warning text-decoration-underline">Our Mission</h2>
      <p>
        At My Library, our mission is to provide a welcoming environment that fosters intellectual curiosity,
        supports lifelong learning, and enriches the lives of our community members. We strive to connect people with
        information, resources, and experiences that inspire, educate, and empower.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">History</h2>
      <p>
        Established in 2023, our library has a rich history of serving the community. Over the years, we have evolved
        and adapted to meet the changing needs of our patrons, embracing new technologies and expanding our offerings to
        ensure access to a wide range of resources.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">Services and Resources</h2>
      <p>
        Our library offers a diverse range of services and resources to cater to the needs and interests of our users.
        From traditional book borrowing to digital resources, we have something for everyone. Explore our extensive
        collection of books, magazines, e-books, audiobooks, and multimedia materials. We also provide research
        assistance, interlibrary loan, study spaces, and a variety of engaging events and workshops.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">Technology and Facilities</h2>
      <p>
        We are proud to provide modern technology and comfortable facilities for our patrons. Access our computer
        workstations, take advantage of our Wi-Fi network, and make use of our printing and scanning services. We offer
        well-designed study areas, meeting rooms for group collaboration, quiet zones for focused work, and facilities
        that are accessible to all.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">Dedicated Staff</h2>
      <p>
        Our knowledgeable and friendly staff is here to assist you in making the most of your library experience. With a
        passion for books and a commitment to serving our community, our staff members are experts in their fields and
        ready to help you find the information you seek.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">Engaging the Community</h2>
      <p>
        We believe in actively engaging with our community. We collaborate with local organizations, schools, and
        businesses to provide outreach programs, literacy initiatives, and cultural events. We are committed to fostering
        a love for reading, supporting education, and empowering individuals of all ages.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">Policies</h2>
      <p>
        To ensure a pleasant and productive environment for all, we have established library policies. These include
        membership requirements, borrowing rules, code of conduct, privacy policy, and guidelines for using our resources
        and facilities. We strive to create an inclusive and respectful space for everyone to enjoy.
      </p>

      <h2 className="mt-5 text-warning text-decoration-underline">Contact Us</h2>
      <p>
        We encourage you to reach out to us with any questions, suggestions, or feedback. Visit us at <span className='text-primary'> 56/1 P.C.Bnerjee road, Dakshineswar,Kolkata-700076,</span>
        call us at <span className='text-primary'>9163527619</span>, or email us at <span className='text-primary'>swarnava7122000@gmail.com.</span> Connect with us on social media to stay
        updated on library news, events, and exciting new releases.
      </p>

      <p className="mb-5">We look forward to serving you and helping you on your journey of exploration and discovery!</p>
      
      </div>
   
    </Container>
  );
};

export default About;

