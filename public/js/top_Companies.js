const chartSize = { width: 800, height: 600 };
const margin = { left: 100, right: 10, top: 20, bottom: 150 };
const width = chartSize.width - margin.left - margin.right;
const height = chartSize.height - margin.top - margin.bottom;
const colours = d3.scaleOrdinal(d3.schemeCategory10);

const init = () => {
  const svg = d3
    .select("#chart-area svg")
    .attr("width", chartSize.width)
    .attr("height", chartSize.height);

  const g = svg
    .append("g")
    .attr("class", "companies")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 140)
    .text("Companies");

  g.append("text")
    .attr("transform", "rotate(-90)")
    .attr("class", "y axis-label")
    .attr("y", -60)
    .attr("x", -height / 2);

  g.append("g").attr("class", "y-axis");

  g.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0,${height})`);

  g.selectAll(".x-axis text")
    .attr("x", -5)
    .attr("y", 10)
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");
};

const fieldNames = {
  per: "Percentage Change",
  ptsC: "Percentage change in price",
  ltP: "Share Price"
};

const percentageFormat = d => `${d}%`;
const rupeeFormat = d => `₹ ${d}`;

const formats = {
  per: percentageFormat,
  ptsC: rupeeFormat,
  ltP: rupeeFormat
};

const updateCompanies = function(companies, fieldName) {
  const maxValue = _.get(_.maxBy(companies, fieldName), fieldName, 0);
  // const minValue = _.get(_.minBy(companies, fieldName), fieldName, 0);
  const minValue =
    fieldName == "ptsC" || "per"
      ? _.get(_.minBy(companies, fieldName), fieldName)
      : 0;

  const svg = d3.select("#chart-area svg");
  svg.select(".y.axis-label").text(fieldNames[fieldName]);

  const y = d3
    .scaleLinear()
    .rangeRound([0, height])
    .domain([maxValue, minValue]);

  const y_axis = d3
    .axisLeft(y)
    .tickFormat(formats[fieldName])
    .ticks(10);

  svg.select(".y-axis").call(y_axis);

  const t = d3
    .transition()
    .duration(1000)
    .ease(d3.easeLinear);

  const x = d3
    .scaleBand()
    .rangeRound([0, width])
    .domain(_.map(companies, "symbol"))
    .padding(0.3);

  const x_axis = d3.axisBottom(x);
  svg.select(".x-axis").call(x_axis);

  const rectangleG = svg.select("g");
  const rectangles = rectangleG
    .selectAll("rect")
    .data(companies, c => c.symbol);
  rectangles.exit().remove();

  svg
    .selectAll(".x-axis text")
    .attr("x", -5)
    .attr("y", 10)
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");

  rectangles
    .enter()
    .append("rect")
    .attr("y", c => y(minValue))
    .attr("x", c => x(c.symbol))
    .merge(rectangles)
    .transition(t)
    .attr("y", c => {
      if (y(c[fieldName]) < 0) {
        return height;
      } else {
        return y(c[fieldName]);
      }
    })
    .attr("x", c => x(c.symbol))
    .attr("fill", c => colours(c.symbol))
    .attr("width", x.bandwidth)
    .attr("height", c => height - y(c[fieldName]));
};

const parseCompany = ({ symbol, ...numerics }) => {
  _.forEach(numerics, (v, k) => {
    numerics[k] = +v.split(",").join("");
  });
  return { symbol, ...numerics };
};

const companiesToShow = companies => {
  const parsedCompanies = companies.data.map(parseCompany);
  const top5Companies = parsedCompanies
    .sort((c1, c2) => c2.per - c1.per)
    .slice(0, 5);

  const last5Companies = parsedCompanies
    .sort((c1, c2) => c1.per - c2.per)
    .slice(0, 5);
  return top5Companies.concat(last5Companies);
  // return top5Companies;
};

const main = () => {
  d3.json("data/nifty.json").then(companies => {
    const mixedCompanies = companiesToShow(companies);
    init(mixedCompanies);
    const fields = "per,ptsC,ltP".split(",");
    let step = 1;
    setInterval(
      () => updateCompanies(mixedCompanies, fields[step++ % fields.length]),
      3000
    );
  });
};

window.onload = main;
