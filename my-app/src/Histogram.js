import React from 'react';
import * as d3 from "d3";
import "./App.css";



class Histogram extends React.Component {
  //
  constructor(props) {
    super(props);
    this.generateNumbers = this.generateNumbers.bind(this);
    this.margin = 60;
    this.state = {
      width : 1000 - 2 * this.margin,
      height: 600 - 2 * this.margin,
      lineAdjustment: 40
    }
  }

    updateDimensions() {
      if (window.innerWidth <= 500) {
        console.log("height: " + window.innerHeight)
        console.log("width: " + window.innerWidth)
        this.setState({ width: 340, height: 270, lineAdjustment: 15 });
      } else {
        console.log("height: " + window.innerHeight)
        console.log("width: " + window.innerWidth)
        let margin = 60
        this.setState({ width: 1000 - 2 * margin, height: 600 - 2 * margin, lineAdjustment: 40 });
      }
    }

   //Add event listener
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  //  Remove event listener
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  drawChart() {
    //get numbers
    let dataPoints = this.generateNumbers();

    //pass X- axis values into an array
    const values = []
    for (let num in dataPoints) {
      values.push(Number(num))
    }

    values.sort();
    // set margins and widths/heights
    const margin = this.margin;
    const width = this.state.width;
    const height = this.state.height;
    const lineAdjustment = this.state.lineAdjustment;

    // scaling y axis for bar and lin graph
    const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, 100]);
    
    const svg = d3.select("svg");

    // empty old graph every time new one is generated
    let container = document.getElementById('svg');
    while (container.firstChild) container.removeChild(container.firstChild);
    
    // create chart itself
    const chart = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`)
    
    chart.append("g").call(d3.axisLeft(yScale));
    
    // scaling x axis for bar & line graph
    const xScale = d3
      .scaleBand()
      .range([0, width])
      .domain(values.map((s) => s))
      .padding(0.1);
   
    //create variable for the line of the line graph
    const valueline = d3
      .line()
      .x(function (d) { return xScale(d) + lineAdjustment })
      .y(function (d) { return yScale(dataPoints[d]) });


    // x axis
    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));
    
    // create histogram bars
    chart
      .selectAll()
      .data(values)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(values[i]))
      .attr("y", (s) => (yScale(dataPoints[s])))
      .attr("height", function (s) { return height - yScale(dataPoints[s]) })
      .attr("width", xScale.bandwidth())
      .attr("fill", "green");
    
    //create vertical grid
    chart
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height})`)
      .call(
        d3
          .axisBottom()
          .scale(xScale)
          .tickSize(-height, 0, 0)
          .tickFormat("")
      );

    // frequency label of y axis
    svg
      .append("text")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "white")
      .text("# Frequency");
    
    // add the line to the histogram
      chart
        .append("path")
        .datum(values)
        .attr("class", "line")
        .attr("d", valueline(values))
        .style("fill", "none")
        .style("stroke", "orange")
        .style("stoke-width", "3px");
  };


  
  // function to generate random numbers into numberFrequency Object
  generateNumbers() {
    // 0 - 1 Object and count per each instance of number
    const numberFrequency = [];
    // randomly generate  a number 100 times and push increment numberFrequency object
    for (let i = 0; i < 100; i++) {
      let num = Number((Math.floor(Math.random() * 10) * 0.1).toPrecision(1));
      if (numberFrequency[num]) {
        numberFrequency[num]++;
      } else {
        numberFrequency[num] = 1;
      }
    }
    return numberFrequency;
  }

  render() {
    return (
      <div>
        <div>
          <h4>Chart of Number Frequencies</h4>
          <h4>Number Range from 0 - 1</h4>
          <h4>(100 Numbers Generated)</h4>
          <button className="btn btn-info" onClick={this.drawChart.bind(this)}>Generate Chart</button>
        </div>
        <svg className="SVG" id="svg"/>
      </div>
    );
  }
}

export default Histogram;