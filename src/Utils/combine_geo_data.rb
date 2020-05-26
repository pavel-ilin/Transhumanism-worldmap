require 'json'

us = File.open "USA.geo.json"
uk = File.open "UK.geo.json"
world = File.open "countries.geo.json"

us_data = JSON.load us
uk_data = JSON.load uk
world_data = JSON.load world

world_data['features'].delete_if{|j| 
    j['properties']['brk_name'] == 'United Kingdom'
}

world_data['features'].delete_if{|j| 
    j['properties']['brk_name'] == 'United States'
}

uk_data['features'].each{|n| 
    if n["properties"]['name'] != 'Scotland' && n["properties"]['name'] != 'Wales' && n["properties"]['name'] != 'Northern Ireland'
        n["properties"]['name'] = 'England'
    end
}

combine_hash = {"type": "FeatureCollection",
                "features": world_data['features'] | us_data['features'] | uk_data['features']
                }

File.write("CombinedGeoData.json", combine_hash.to_json)