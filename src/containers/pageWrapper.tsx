import React from 'react';
import Header from '../components/header';
// import DashboardFooter from '../components/dashboard/footer';
const Fragment = React.Fragment;
import pageMap from './pageMap';
import '../components/header/header.css'

const PageWrapper = ({ page }: { page: string }) => {
  console.log('In page Wrapper, displaying page:', page)
  const Display = pageMap[page];
  return (
    <Fragment>
      <Header/>
      <div>
        <Display />
      </div>
      {/* <DashboardFooter /> */}
    </Fragment>
  );
}

export default PageWrapper;
