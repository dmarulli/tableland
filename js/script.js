function randomFromInterval(min,max) {
  return (Math.random() * (max - min) + min);
}

function generateData(count, max_height){
  data = []
  for (i = 0; i <= count; i++) {
    data.push({
      y : randomFromInterval(max_height,height)
    });
  }
  return data
}

function main() {

  width =  window.innerWidth;
  height = window.innerHeight;

  canvas = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)


  // sky
  sky = canvas
  .append("g")
  .attr("class", "sky")
  .attr("width", width)
  .attr("height", height)
  .attr("opacity", .5)

  molecule_count = 100000
  var sky_color = d3.scaleSequential(d3.interpolateMagma)
                .domain([0, (3/2)*height])
  molecules = sky.selectAll("rect");
  molecules
  .data(generateData(molecule_count, 0))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {
    x = randomFromInterval(0, width)
      return x
    })
  .attr("width", function(d) {return randomFromInterval(20,40) })
  .attr("height", function(d){return randomFromInterval(40,80)})
  .attr("fill", function(d,i){return sky_color(d.y);});




  // mesa
  mesa_center = (1/3)*width
  mesa_height = (2/3)*height
  mesa = canvas
  .append("g")
  .attr("class", "mesa")
  .attr("width", width)
  .attr("height", height)
  .attr("opacity", 1)

  rock_count = 10000
  var mesa_color = d3.scaleSequential(d3.interpolateOranges)
                .domain([(6/5)*height, mesa_height])
  rocks = mesa.selectAll("rect");
  rocks
  .data(generateData(rock_count, mesa_height))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {
    if (d.y < (6/8)*height) {
        x = (mesa_center + 125*randomFromInterval(-1,1))
    } else {
      x = (mesa_center+ .003*randomFromInterval(-1,1)*(height/2 - d.y)**2)
    }

      return x
    })
  .attr("width", function(d) {return randomFromInterval(20,40) })
  .attr("height", function(d){return randomFromInterval(40,80)})
  .attr("fill", function(d,i){return d3.rgb(mesa_color(d.y)).darker(5);});

}
