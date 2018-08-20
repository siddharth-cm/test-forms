import React, { Component } from "react";
import { Input, H3, Button } from "cmw-uikit";
import styled from "styled-components";
import lzstring from "lz-string";

class Form extends Component {
  state = {
    first_name: null,
    middle_name: null,
    last_name: null,
    father_name: null,
    pan_number: null,
    proof: "aadhar_card",
    address_line_1: null,
    address_line_2: null,
    pincode: null,
    city: null,
    state: null,
    country: null,
    gender: null
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    const encoded = lzstring.compressToEncodedURIComponent(
      JSON.stringify(this.state)
    );
    fetch(`http://127.0.0.1:3000/form/${encoded}`, {
      method: "GET",
      cors: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        data: encoded
      },
      redirect: "follow",
      referrer: "no-referrer"
    })
      .then(response => response.json())
      .then(body => console.log(body))
      .catch(error => console.log(error));
  };

  handleChange = e => {
    console.log(e.target.value);
    let newData = {};
    newData[e.target.name] = e.target.value;
    this.setState(newData);
  };

  render() {
    const { className } = this.props;
    return (
      <section className={className}>
        <H3>Details On PanCard</H3>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="First Name"
            label="First Name"
            onChange={this.handleChange}
            name="first_name"
          />
          <Input
            placeholder="Middle Name"
            label="Middle Name"
            onChange={this.handleChange}
            name="middle_name"
          />
          <Input
            placeholder="Last Name"
            label="Last Name"
            onChange={this.handleChange}
            name="last_name"
          />
          <Input
            placeholder="Father's Name"
            label="father's Name"
            onChange={this.handleChange}
            name="father_name"
          />
          <Input
            placeholder="PAN Number"
            label="PAN NUMBER"
            onChange={this.handleChange}
            name="pan_number"
          />
          <H3>Details on aadhar card</H3>
          <label htmlFor="id-select">Select the proof you Wish to submit</label>
          <select id="id-select" name="proof" onChange={this.handleChange}>
            <option value="aadhar_card">Aadhar Card</option>
            <option value="voter_id">Voter Card</option>
          </select>
          <Input
            placeholder="Address Line 1"
            label="Address Line 1"
            onChange={this.handleChange}
            name="address_line_1"
          />
          <Input
            placeholder="Address Line 2"
            label="Address Line 2"
            onChange={this.handleChange}
            name="address_line_2"
          />
          <Input
            placeholder="Pincode"
            label="PinCode"
            onChange={this.handleChange}
            name="pincode"
          />
          <Input
            placeholder="City"
            label="City"
            onChange={this.handleChange}
            name="city"
          />
          <Input
            placeholder="State"
            label="state"
            onChange={this.handleChange}
            name="state"
          />
          <Input
            placeholder="country"
            label="country"
            onChange={this.handleChange}
            name="country"
          />
          <H3>Other Details</H3>
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            onChange={this.handleChange}
            name="gender"
            value="male"
          />
          <label htmlFor="Female">Female</label>
          <input
            type="radio"
            onChange={this.handleChange}
            name="gender"
            value="female"
          />
          <label htmlFor="transgender">Transgender</label>
          <input
            type="radio"
            onChange={this.handleChange}
            name="gender"
            value="transgender"
          />

          <Button large>Submit</Button>
        </form>
      </section>
    );
  }
}

export default styled(Form)`
  max-width: 100%;
  margin: 0 auto;
  width: 50%;
  padding: 7em 1em;

  & h3 {
    margin: 2em auto;
  }
  & form {
    padding: 7em 1em;

    & input,
    label {
      max-width: 100%;
      width: 50%;
      display: block;
    }
    & select {
      margin: 2em auto;
    }
  }
`;
