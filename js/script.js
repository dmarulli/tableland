function randomFromInterval(min,max) {
  return (Math.random() * (max - min) + min);
}


function generateData(count, min_height, max_height){
  data = []
  for (i = 0; i <= count; i++) {
    data.push({
      y : randomFromInterval(max_height, min_height)
    });
  }
  return data
}


function drawSky() {
  sky = canvas
  .append("g")
  .attr("class", "sky")
  .attr("width", width)
  .attr("height", height)
  .attr("opacity", .6)

  molecule_count = 100000
  var sky_color = d3.scaleSequential(d3.interpolateMagma)
  .domain([0, (3/2)*height])
  molecules = sky.selectAll("rect");
  molecules
  .data(generateData(molecule_count, height, 0))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {
    x = randomFromInterval(0, width)
    return x
  })
  .attr("height", function(d) {return randomFromInterval(20,40) })
  .attr("width", function(d){return randomFromInterval(40,80)})
  // .attr("r", function(d) {return randomFromInterval(20,40)})
  .attr("fill", function(d,i){return sky_color(d.y);});

}

function drawDesert() {
  desert_height = (5/6)*height

  desert = canvas
  .append("g")
  .attr("class", "desert")
  .attr("width", width)
  .attr("height", desert_height)
  .attr("opacity", 1)

  grain_count = 10000
  var desert_color = d3.scaleSequential(d3.interpolateOranges)
  .domain([(1/3)*desert_height, height])
  grains = desert.selectAll("rect");
  grains
  .data(generateData(grain_count, height, desert_height))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {
    x = randomFromInterval(0, width)
    return x
  })
  .attr("width", function(d) {return randomFromInterval(40,80) })
  .attr("height", function(d){return randomFromInterval(20,40)})
  .attr("fill", function(d,i){return d3.rgb(desert_color(d.y)).darker(3)});

}


function drawMensa(mesa_x, mesa_y, mesa_height, tightness, shadow, stump_start, rock_height) {

  mesa = canvas
  .append("g")
  .attr("class", "mesa")
  .attr("width", width)
  .attr("height", height)
  .attr("opacity", 1)

  rock_count = 10000
  var mesa_color = d3.scaleSequential(d3.interpolateOranges)
  .domain([(4/3)*mesa_y, mesa_height])
  rocks = mesa.selectAll("rect");
  rocks
  .data(generateData(rock_count, mesa_y, mesa_height))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {
    if (d.y < stump_start) {
      x = (mesa_x + tightness*randomFromInterval(-1,1))
    } else {
      x = (mesa_x + (tightness/31250)*randomFromInterval(-1,1)*(height/2 - d.y)**2)
    }

    return x
  })
  .attr("height", function(d) {
    if (d.y < (10/9)*mesa_height) {
      sampler = randomFromInterval(0,100)
      if (sampler > 4){
        w = 0
      } else {
        w = randomFromInterval(rock_height*2, rock_height*2)
      }
    } else {
      w = randomFromInterval(rock_height, rock_height*2)
    }

    return w })
  .attr("width", function(d){
    return randomFromInterval(10,20)})
  .attr("fill", function(d){return d3.rgb(mesa_color(d.y)).darker(shadow)});

}



function main() {

  width =  window.innerWidth;
  height = window.innerHeight;

  canvas = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  drawSky()
  drawDesert()

  mesa_x = (8/30)*width
  mesa_y = (16/18)*height
  mesa_height = (75/100)*mesa_y
  tightness = 100
  shadow = 5
  stump_start = 10/9 * mesa_height
  rock_height = 20
  drawMensa(mesa_x, mesa_y, mesa_height, tightness, shadow, stump_start, rock_height)

  mesa_x = (22/30)*width
  mesa_y = (5/6)*height
  mesa_height = (44/60)*height
  tightness = 60
  shadow = 3.75
  stump_start = (92/100)*mesa_y
  rock_height = 10
  drawMensa(mesa_x, mesa_y, mesa_height, tightness, shadow, stump_start, rock_height)

}
