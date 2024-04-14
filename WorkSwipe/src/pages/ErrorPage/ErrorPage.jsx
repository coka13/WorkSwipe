import React from 'react';
import "./ErrorPage.css"
import CustomLinkNavigate from '../../components/CustomLinkNavigate/CustomLinkNavigate';

const NotFoundPage = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">  
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Looks like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <CustomLinkNavigate label ={"Go to home"} to={"/home"}></CustomLinkNavigate>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
