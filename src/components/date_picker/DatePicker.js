import React, { Component } from 'react';
import './DatePicker.css';

class DatePicker extends Component {
  constructor() {
    super();
    this.state = {
      dateSelected: '',
    }
  }

  getDateIndex = (e) => {
    this.props.setEpochEnd(e.target.id);
    this.setState({
      dateSelected: this.props.dates[e.target.id],
    })
  };

  render() {
    let dateSelected = '';
    if (this.state.dateSelected === '') {
      dateSelected = this.props.dates[this.props.dates.length-1];
    }
    else {
      dateSelected = this.state.dateSelected
    }

    let dates = this.props.dates.map((date, index) => {
      if (index % 3 === 0) {
        return (
          <div className="row date-picker" key={index}>
            <div className="col-4">
              <button className="date" onClick={this.getDateIndex} key={index} id={index}>{date}</button>
            </div>
            <div className="col-4">
              <button className="date" onClick={this.getDateIndex} key={index+1} id={index+1}>{this.props.dates[index+1]}</button>
            </div>
            <div className="col-4">
              <button className="date" onClick={this.getDateIndex} key={index+1} id={index+1}>{this.props.dates[index+1]}</button>
            </div>
          </div>
        )
      }
      else {
        return ''
      }
    });
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-12">
            <h3 className="date-title">Date Selected: {dateSelected}</h3>
          </div>
        </div>
        {dates}
      </React.Fragment>
    );
  }
}

export default DatePicker;
