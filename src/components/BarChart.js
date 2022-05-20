import React, { useState, useEffect, forwardRef } from "react";
import * as d3 from "d3";
import { useD3 } from "hooks/useD3";

import styles from "./BarChart.module.scss";

const generateRandom = () => {
  const dataSet = [
    {
      year: 1980,
      efficiency: 24.3,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1985,
      efficiency: 27.6,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1990,
      efficiency: 28,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1991,
      efficiency: 28.4,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1992,
      efficiency: 27.9,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1993,
      efficiency: 28,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1994,
      efficiency: 28.4,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
    {
      year: 1995,
      efficiency: 27.9,
      sales: Math.floor(Math.random() * (8000000 - 2000000 + 1) + 2000000),
    },
  ];
  return dataSet;
};

const BarChart = forwardRef((props, barRef) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleRandom();
  }, []);

  const ref = useD3((svg) => {
    const height = 500;
    const width = 500;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.year))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

    const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.sales)])
      .rangeRound([height - margin.bottom, margin.top]);

    const xAxis = (g) =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .tickValues(
            d3
              .ticks(...d3.extent(x.domain()), width / data.length)
              .filter((v) => x(v) !== undefined)
          )
          .tickSizeOuter(0)
      );

    const y1Axis = (g) =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .style("color", "steelblue")
        .call(d3.axisLeft(y1).ticks(null, "s"))
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data.y1)
        );

    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(y1Axis);

    svg.attr("width", width).attr("height", height);

    svg
      .select(".plot-area")
      .attr("fill", "steelblue")
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("height", 0)
      .attr("y", (d) => y1(0))
      .attr("class", "bar")
      .attr("x", (d) => x(d.year))
      .attr("width", x.bandwidth())
      .transition()
      .duration(300)
      .delay(function (d, i) {
        return (i / data.length) * 700;
      })
      .ease(d3.easeLinear)
      .attr("y", (d) => y1(d.sales))
      .attr("height", (d) => y1(0) - y1(d.sales));
  }, data);

  const handleRandom = () => {
    const dataSet = generateRandom();
    setData(dataSet);
  };

  return (
    <div className={styles["bar-chart"]} ref={barRef}>
      <svg ref={ref}>
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
      <button
        className={styles["bar-chart__random"]}
        onClick={() => handleRandom()}
      >
        Generate Random
      </button>
    </div>
  );
});

export default BarChart;
