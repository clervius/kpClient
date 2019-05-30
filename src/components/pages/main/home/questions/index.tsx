import React, { useState } from 'react';
import './questions.css';
import { Text, Divider, Tag, Button, ButtonGroup, Popover, Menu, MenuItem, Collapse } from '@blueprintjs/core';
import Slider from 'react-slick';

const Questions = () => {
  const [commentOpen, setCommentState] = useState(false);
  return (
    <section className='section_padding section_gray'>
      <div className='container'>
        <div className='row'>
          <div className='col-6'>
            <h5>Questions</h5>
          </div>
          <div className='col-6'>
            Where the menu items will go
          </div>
        </div>
        <div className='row'>
          <div className='col-4'>
            <div className='questionCardWrapper'>
              <div className='questionCard_content'>
                <div className='questionCard_meta'>
                  <span className='questionCard_meta_author'>Posted by: </span> @clervius
                  <span className='questionCard_meta_time'>20 hrs. ago</span>
                </div>
                <div className='questionCard_details'>
                  <span className='questionCard_details_title'>What book teaches you how to swim?</span>
                  <span className='questionCard_details_description'><Text ellipsize={true}>I just want to learn it because the shit is tough you know so let me know which book.</Text></span>
                </div>
                <div className='questionCard_topics'>
                  <Slider
                    dots={false}
                    infinite={false}
                    speed={500}
                    slidesToShow={3}
                    slidesToScroll={1}
                    arrows={false}
                    variableWidth={true}
                  >
                    <Tag icon='lightbulb' minimal={false}>Entrepreneur</Tag>
                    <Divider />
                    <Tag icon='lightbulb' minimal={false}>Leadership</Tag>
                    <Divider />
                    <Tag icon='lightbulb' minimal={false}>Headphones</Tag>
                    <Divider />
                    <Tag icon='lightbulb' minimal={false}>Programming</Tag>
                  </Slider>
                </div>
                <Divider />
                <div className='row'>
                  <div className='col-4'>
                      <Button icon='book' minimal={true}>5</Button>
                  </div>
                  <div className='col-8 text-right'>
                    <ButtonGroup>
                    <Button icon='social-media' minimal={true} />
                    <Popover>
                      <Button icon='more' minimal={true} />
                      <Menu>
                        <MenuItem icon='flag' text='Report' />
                      </Menu>
                    </Popover>
                    <Button icon='book' minimal={true} onClick={() => setCommentState(!commentOpen)}>Suggest Book</Button>
                    </ButtonGroup>
                  </div>
                </div>
                <Collapse
                  isOpen={commentOpen}

                >
                  {/* <ControlGroup fill={true} vertical={false}>
                    <Suggest /> 
                  </ControlGroup> */}
                  In here I will put the form where they select book and add comment.
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Questions;
