import React, { Fragment, useRef, useEffect, useState } from 'react';
import { event, select, geoPath, geoMercator, min, max, scaleLinear } from "d3";
import geoData from "./countries.geo.json";
import usTopoData from "./states-topo.json";
import countriesTopoData from "./countries-topo.json";

import './App.css';

const App = () => {

        // const countries = []
        // const dataArray = []
    
        // countries.map(country => {
        //     let findCountry = geoData.features.find(jsonCont => jsonCont.properties.name === country.country)
    
        //     if (findCountry) {
        //       findCountry.confirmed = country.confirmed
        //       dataArray.push(findCountry)
        //     }
        // })
        console.log(countriesTopoData)
        
        const svgRef = useRef()
        const [clickedCountry, setClickedCountry] = useState(null)
        
        let div = select("body")
          .append("div")   
          .attr("class", "tooltip")               
          .style("opacity", 0);
        
        const mouseOver = (data) => {
          div.transition()
          .duration(200)
          .style("opacity", .9)
          div.html(`${data.properties.brk_name}: <br/> ${data.properties.gdp_md_est}` )
            .style("left", (event.pageX) + "px")     
            .style("top", (event.pageY - 18) + "px"); 
        }

        const mouseOut = () => {
          div.transition()        
           .duration(500)      
           .style("opacity", 0);   
         }

        useEffect(() => {
          const svg = select(svgRef.current)
    
          const minProp = min(geoData.features, feature => feature.properties.gdp_md_est);
          const maxProp = max(geoData.features, feature => feature.properties.gdp_md_est);
    
          const colorScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(["#ccc", "red"]);
    
          const width = 900
          const height = 800

          const projection = geoMercator()
            .fitSize([width, height], clickedCountry || geoData)
            .precision(100);
    
          const pathGenerator = geoPath().projection(projection)
    
          svg.selectAll('.country')
            .data(geoData.features)
            .join('path')
            .attr('class', 'country')
            .attr("fill", feature => colorScale(feature.properties.gdp_md_est))
            .attr('d', feature => pathGenerator(feature))
            .on('mouseover', feature => { mouseOver(feature) })
            .on('mouseout', feature => { mouseOut(feature) })
            .on("click", feature => 
            {setClickedCountry(clickedCountry === feature ? null : feature)})
        }, [clickedCountry, mouseOver, mouseOut])

        
          return (
            <Fragment>
                  <svg style={{ width: '1000px', height: '800px' }} ref={svgRef}/>
            </Fragment>
      )
    }

export default App;
