import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from '../globals/Input/index.jsx';
import Gender from './Gender.jsx';
import actions from '../../../Redux/actions/account_page_actions';
import style from './AccountPage.css';
import Button from '../globals/Button/index.jsx';

class BioInfo extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      bio: '',
      month: '',
      day: '',
      year: '',
      gender: 0,
      preference: 0,
    };
  }

  handleClick = () => {
    this.props.updateBioData({location: this.state.location})
  }

  handleGenderChange = (state, genderNum) => {
    this.setState({ [state]: genderNum });
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  componentDidUpdate = () => {
    let { state } = this
    let allValuesEntered = true;
    for (let key in state) {
      if (!state[key]) {
        allValuesEntered = false;
      }
    }
    this.props.renderButton(allValuesEntered);
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className={style.basicMargin}>
          Birthdate: (Format: XX/XX/XXXX)
          <Input 
            placeholder="Month" 
            onChange={this.handleInputChange} 
            name={'month'}
            maxLength='2'
            />
          <Input 
            placeholder="Day" 
            onChange={this.handleInputChange} 
            name={'day'}
            maxLength='2'
            />
          <Input 
            placeholder="Year" 
            onChange={this.handleInputChange} 
            name={'year'}
            maxLength='4'
            />
        </div>
        <div className={style.basicMargin}>
          ZIP Code 
          <Input 
            type="text"
            placeholder="ZIP Code goes here"
            onChange={this.handleInputChange} 
            name='location'
            maxLength='5'
            value={this.props.location}
            />
        </div>
        <div className={style.basicMargin}>
          gender: 
          <Gender
            type='gender'
            handleGenderChange={this.handleGenderChange}
            />
        </div>
        <div>
          gender preferences: 
          <Gender
            type='pref'
            handleGenderChange={this.handleGenderChange}
            />
        </div>
        <div className={style.basicMargin}>
          bio: 
          <textarea 
            placeholder="Bio goes HERE"
            onChange={this.handleInputChange} 
            name={'bio'}
            >
          </textarea>
        </div>
        <Button
          onClick={this.handleClick}
          text="Save"
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateBioData: actions.updateBioData,
  }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    location: state.bioData.location
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BioInfo);
