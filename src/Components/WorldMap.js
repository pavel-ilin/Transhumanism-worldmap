import React, { useRef, useEffect, useState, Fragment } from 'react';
import { event, select, geoPath, geoMercator, min, max, scaleLinear, zoom } from "d3";
import Modal from 'react-modal';
import '../App.css';
import CombinedGeoData from "../utils/CombinedGeoData.json";
import PopUp from './PopUp'

const modalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const WorldMap = () => {
        const svgRef = useRef()
        const [clickData, setClickData] = useState(null)
        const [isOpen, setIsOpen] = useState(false);

        let div = select("body")
          .append("div")   
          .attr("class", "tooltip")               
          .style("opacity", 0);
        
        const mouseOver = (data) => {
          if (data.properties.ambasadorStatus === 1){
            div.transition()
            .duration(200)
            .style("opacity", .9)
            div.html(`${data.properties.name}: <br/>${data.properties.ambasador}` )
              .style("left", (event.pageX) + "px")     
              .style("top", (event.pageY - 18) + "px");
          }
          else if (data.properties.present === 1 && !data.properties.ambasadorStatus){
              div.transition()
              .duration(200)
              .style("opacity", .9)
              div.html(`${data.properties.party}` )
                .style("left", (event.pageX) + "px")     
                .style("top", (event.pageY - 18) + "px");
          }
        }

        const mouseOut = () => {
          div.transition()        
           .duration(400)      
           .style("opacity", 0);   
         }

         const mapClick = (data) => {
           if(data.properties.present === 1){
            div.transition()        
            .duration(400)      
            .style("opacity", 0);  

          setClickData(data)
          setIsOpen(true)
           }
         }

         const closeModal = () => {
          setIsOpen(false);
        }
        
        useEffect(() => {
          const svg = select(svgRef.current)
    
          const minProp = min(CombinedGeoData.features, feature => feature.properties.present);
          const maxProp = max(CombinedGeoData.features, feature => feature.properties.present);
    
          const colorScale = scaleLinear()
            .domain([minProp, maxProp])
            .range(["#ccc", "orange"]);
    
          const width = window.innerWidth
          const height = window.innerHeight

          const projection = geoMercator()
            .fitSize([width, height], CombinedGeoData)
            .precision(100);
    
          const pathGenerator = geoPath().projection(projection)
    
          svg.selectAll('.country')
            .data(CombinedGeoData.features)
            .join('path')
            .attr('class', 'country')
            .attr("fill", feature => colorScale(feature.properties.present))
            .attr('d', feature => pathGenerator(feature))
            .on('mouseover', feature => { mouseOver(feature) })
            .on('mouseout', feature => { mouseOut(feature) })
            .on("click", feature => { mapClick(feature) })
            .call(zoom()
                  .on('zoom', () => {
                    svg.attr("transform", event.transform)
                 }))
        }, [])

          return (
                <Fragment>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    style={modalStyle}
                    ariaHideApp={false}
                  >
                    <PopUp data={clickData}/>
                  </Modal>
                  <div className={'App'}>Transhumanism</div>
                  <div className={'App'}> 
                    <svg className={'map'} ref={svgRef}/>
                  </div>
                </Fragment>
      )
    }

export default WorldMap;
