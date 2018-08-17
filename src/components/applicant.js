import React, { Component } from "react";
import { Input, H3, Button } from "cmw-uikit";
import styled from "styled-components";
import lzstring from "lz-string";

class Applicant extends Component {
  state = {
    first_name: null
  };
  handleSubmit = e => {
    e.preventDefault();
    const encoded = lzstring.compressToEncodedURIComponent(
      JSON.stringify(this.state)
    );
    console.log(encoded);
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
            label="first_name"
            onChange={this.handleChange}
            name="first_name"
          />
          <Input placeholder="Middle Name" label="Middle Name" />
          <Input placeholder="Last Name" label="Last Name" />
          <Input placeholder="Father's Name" label="father's Name" />
          <Input placeholder="PAN Number" label="PAN NUMBER" />
          <H3>Details on aadhar card</H3>
          <label htmlFor="id-select">Select the proof you Wish to submit</label>
          <select id="id-select">
            <option value="aadhar_card">Aadhar Card</option>
            <option value="voter_id">Voter Card</option>
          </select>
          <Input placeholder="Address Line 1" label="Address Line 1" />
          <Input placeholder="Address Line 2" label="Address Line 2" />
          <Input placeholder="Pincode" label="PinCode" />
          <Input placeholder="City" label="City" />
          <Input placeholder="State" label="state" name="state" />
          <Input placeholder="country" label="country" name="country" />
          <H3>Other Details</H3>
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" value="male" />
          <label htmlFor="female">FeMale</label>
          <input type="radio" name="gender" value="female" />
          <label htmlFor="transgender">Transgender</label>
          <input type="radio" name="gender" value="transgender" />
          <Button large>Submit</Button>
        </form>
      </section>
    );
  }
}

export default styled(Applicant)`
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
