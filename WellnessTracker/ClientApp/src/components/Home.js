import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>WellnessTracker</h1>
            <p>Welcome, my name is Adolf Stary and I created this wellness tracker for personal use as a capstone project for TechCareers - Full Stack developer program.</p>
            <p>This app was designed solely as an aid for personal wellness tracking. It is not intended or recommended to be used for making any diet or medical decisions. Always consult your medical practitioner or dietitian when making any decisions related to your health or diet, always use tools provided by your diabetes team or medical equipment supplier to keep track of your diabetes related data.</p>
            <p>App was built using following technologies:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling along with custom CSS.</li>
        </ul>
        </div>
    );
  }
}
