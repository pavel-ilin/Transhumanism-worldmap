require 'json'
ambasadors = [
{"country": "Belarus", 'ambasador': 'Vladislav Petrushenko'},
{"country": "Brazil", 'ambasador': 'Keoma Ferreira Antonio'},
{"country": "Bulgaria", 'ambasador': 'Aria Cheng'},
{"country": "Canada", 'ambasador': 'Vladislav Petrushenko'},
{"country": "Chile", 'ambasador': 'Aura Neon Iavanove'},
{"country": "China", 'ambasador': 'Peter Wang'},
{"country": "Egypt", 'ambasador': 'Abdul-Rahman Essam Saleh'}, 
{"country": "England", 'ambasador': 'Chris Monteiro'}, 
{"country": "Germany", 'ambasador': 'Tobias Teufel'}, 
{"country": "Hong Kong", 'ambasador': 'Pam Keefe'}, 
{"country": "India", 'ambasador': 'Palak Madan'}, 
{"country": "Japan", 'ambasador': 'Denisa Rensen'}, 
{"country": "Latvia", 'ambasador': 'Alex Kadet'}, 
{"country": "Nigeria", 'ambasador': 'Ojochogwu Abdul'},
{"country": "Scotland", 'ambasador': 'Bobby Pembleton'}, 
{"country": "Spain", 'ambasador': 'José Luis Cordeiro'}, 
{"country": "Ukraine", 'ambasador': 'Ihor Kendiukhov'}, 
]

us = File.open "USA.geo.json"
world = File.open "countries.geo.json"
us_data = JSON.load us
world_data = JSON.load world

world_data['features'].delete_if{|j| j['properties']['brk_name'] == 'United States'}

world_data['features'].each{|n| 
    ambasadors.each{|j| 
    if j[:country] == n['properties']['brk_name']
        n['properties']['ambasadorStatus'] = 1
        n['properties']['ambasador'] = j[:country]
    else
        n['properties']['ambasadorStatus'] = 0
    end
    }
}

us_data['features'].each{|n| n['properties']['gdp_md_est'] = 0}

combine_hash = {"type": "FeatureCollection",
                "features": world_data['features'] | us_data['features']
                }


File.write("CombinedGeoData.json",combine_hash.to_json)


# world_data['features'].each{|n| 
#     if n['properties']['brk_name'] == 'United States'
#         puts('Found')
#     end
# }