function randomFromInterval(min,max) {
  return (Math.random() * (max - min) + min);
}


function generateData(count, min_height, max_height){
  data = []
  for (i = 0; i <= count; i++) {
    data.push({
      y : randomFromInterval(max_height, min_height),
      x : randomFromInterval(0, width)
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

  molecule_count = 10000
  var sky_color = d3.scaleSequential(d3.interpolateMagma)
  .domain([0, (3/2)*height])
  molecules = sky.selectAll("rect");
  molecules
  .data(generateData(molecule_count, height, 0))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {return d.x} )
  .attr("height", function(d) {return randomFromInterval(20,40) })
  .attr("width", function(d){return randomFromInterval(40,80)})
  // .attr("r", function(d) {return randomFromInterval(20,40)})
  .attr("fill", function(d){
    return d3.rgb(sky_color(d.y)).darker((width-d.x)/500);});
}

function drawStars(){
  twinkle = canvas
  .append("g")
  .attr("class", "stars")
  .attr("width", width)
  .attr("height", height)

  star_count = 50
  var star_color = "white"
  stars = twinkle.selectAll("rect");
  stars
  .data(generateData(star_count, height, 0))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {return d.x} )
  .attr("width", function(d) {return randomFromInterval(2,2) })
  .attr("height", function(d){return randomFromInterval(2,2)})
  .attr("fill", function(){
    return d3.rgb(star_color);
  })
  .attr("opacity", function(d){
    return 10/d.y
  })
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
  .attr("x", function(d) {return d.x} )
  .attr("width", function(d) {return randomFromInterval(40,80) })
  .attr("height", function(d){return randomFromInterval(20,40)})
  .attr("fill", function(d){
    return d3.rgb(desert_color(d.y)).darker(3 + (width-d.x)/500);
    // return d3.rgb(desert_color(d.y)).darker(3)
  });

}

function drawPlants(){
  plants_height = (5/6)*height

  plants = canvas
  .append("g")
  .attr("class", "shrubs")
  .attr("width", width)
  .attr("height", plants_height)
  .attr("opacity", 1)

  shrub_count = 30
  var shrub_color = d3.scaleSequential(d3.interpolateYlGn)
  .domain([0, shrub_count])
  shrubs = plants.selectAll("rect");
  shrubs
  .data(generateData(shrub_count, height, plants_height))
  .enter()
  .append("rect")
  .attr("y", function(d) {return d.y} )
  .attr("x", function(d) {return d.x} )
  .attr("width", function(d) {return randomFromInterval(d.y/400,d.y/400) })
  .attr("height", function(d){return randomFromInterval(d.y/400,d.y/400)})
  .attr("fill", function(d, i){
    return d3.rgb(shrub_color(i)).darker(3 + d.y/250 + (width-d.x)/500);
  });
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
  .attr("fill", function(d){
    // console.log(this)
    return d3.rgb(mesa_color(d.y)).darker(1 + d.y/250 + (width-d3.select(this).attr("x"))/500)});

}



function main() {

  width =  window.innerWidth;
  height = window.innerHeight;

  canvas = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

  drawSky()
  drawStars()

  drawDesert()
  drawPlants()

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
