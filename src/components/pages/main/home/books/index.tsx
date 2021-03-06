import React, { useState } from 'react';
import './book.css';
import { connect } from 'react-redux';
import { IStore } from 'src/state-management/models';
import Book from '../../../../book';
import { Button, ButtonGroup, Divider } from '@blueprintjs/core';
import Slider from 'react-slick';
import { redirect } from 'redux-first-router';
import Icon from '../../../../icons';

const BooksSection = ({ books, toPage }) => {
  const [activeSlide, updateActiveSlide] = useState(0);

  let componentSlider;
  return (
    <section className='section_padding'>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <h5>Recent Books</h5>
          </div>
          <div className='col-6'>
            <div className='headerMenu'>
              <ButtonGroup>
                <Button icon={<Icon icon='fa fa-angle-right' />} onClick={() => toPage({ type: 'ALLBOOKS' })}>All <span className='hidden-sm'>Books</span></Button>
              </ButtonGroup>
              <Divider className='hidden-xs'/>
              <ButtonGroup className='hidden-xs'>
                <Button onClick={() => componentSlider.slickGoTo(activeSlide - 1)}><Icon icon='fa fa-angle-left' /></Button>
                <Button icon={<Icon icon='fa fa-angle-right' />} onClick={() => componentSlider.slickGoTo(activeSlide + 1)}/>
              </ButtonGroup>
            </div>
          </div>

        </div>
        <div className='row'>
          <div className='col-12'>
            <Slider
              ref={slider => componentSlider = slider}
              dots={false}
              infinite={true}
              speed={1000}
              slidesToShow={3}
              slidesToScroll={1}
              arrows={false}
              variableWidth={true}
              swipeToSlide={false}
              afterChange={index => updateActiveSlide(index)}
              responsive={[{
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesPerRow: 1,
                  slidesToScroll: 1,
                }
              }, {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesPerRow: 1,
                  slidesToScroll: 1,
                }
              }, {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesPerRow: 1,
                  slidesToScroll: 1,
                }
              }]}
            >
              {books.map((book, i) => <Book liv={book} key={book.gId}/>)}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state: IStore) => ({
  books: state.book.books
})

const mapDispatch = dispatch => ({
  toPage: action => dispatch(redirect(action))
})
export default connect(mapStateToProps, mapDispatch)(BooksSection)
