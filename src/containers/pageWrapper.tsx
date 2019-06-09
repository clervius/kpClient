import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
// import DashboardFooter from '../components/dashboard/footer';
const Fragment = React.Fragment;
import pageMap from './pageMap';
import '../components/header/header.css'

const PageWrapper = ({ page }: { page: string }) => {
  const Display = pageMap[page];
  const homePage: boolean = page.endsWith('home');
  return (
    <Fragment>
      <Header/>
      {homePage
        ? <div> <Display /> </div>
        : <section className='section_gray section_padding'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8'><Display /></div>
              <div className='col-md-4 sideSticky'> Sidebar will go in here </div>
            </div>
          </div>
        </section>
      }
      
      <Footer />
    </Fragment>
  );
}

export default PageWrapper;
