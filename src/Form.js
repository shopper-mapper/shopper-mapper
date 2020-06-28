import React, { Component } from 'react';



class Form extends Component {

    constructor() {
        super();

        this.state = {
            userInputlocation: '',
            userInputQuery: '',
        }
    }

    handleChangeLocation = (e) => {
        console.log(e.target.value);
        this.setState({
            userInputlocation: e.target.value,
        })
    }

    handleChangeQuery = (e) => {
        this.setState({
            userInputQuery: e.target.value,
        })
    }


    render() {
        return (
            <form action="">
          <div className="row">
            <div>
              <label htmlFor="searchLocation">Enter location:</label>
              <input onChange={this.handleChangeLocation} type="text" name="" id="searchLocation" />
            </div>
            <div>
              <label htmlFor="searchQuery">Enter query:</label>
              <input onChange={this.handleChangeQuery} type="text" name="" id="searchQuery" />
            </div>
          </div>

          <button className="button" onClick={(event) => this.props.handleClick( event, this.state.userInputlocation, this.state.userInputQuery,)} type='submit'>Find!</button>
        </form>
        )
    }
}

export default Form;