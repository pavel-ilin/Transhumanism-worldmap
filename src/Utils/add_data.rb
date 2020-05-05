require 'json'

ambasadors = [
{"country": "Argentina", 'ambasador': 'Christian Meniw'},
{"country": "Belarus", 'ambasador': 'Vladislav Petrushenko'},
{"country": "Brazil", 'ambasador': 'Keoma Ferreira Antonio'},
{"country": "Bulgaria", 'ambasador': 'Angel Marchev, Sr.'},
{"country": "Canada", 'ambasador': 'Aria Cheng'},
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

state_parties = [
    {"state": "Arizona" , "party": "Arizona Transhumanist Party", "url": "https://www.facebook.com/groups/2208146505889799/"},
    {"state": "California" , "party": "California Transhumanist Party", "url": "http://www.californiatranshumanistparty.org/"},
    {"state": "Colorado" , "party": "Transhumanist Party of Colorado", "url": "https://www.facebook.com/Transhumanist-Party-of-Colorado-312651219122175/"},
    {"state": "Illinois" , "party": "Transhumanist Party of Illinois", "url": "https://www.facebook.com/THPIL/"},
    {"state": "Kentucky" , "party": "Kentucky Transhumanist Party", "url": "https://www.facebook.com/groups/KYTranshumanistParty/"},
    {"state": "Maryland" , "party": "Maryland Transhumanist Party", "url": "https://www.facebook.com/groups/322068575079818/"},
    {"state": "Michigan" , "party": "Michigan Transhumanist Party", "url": "https://www.facebook.com/groups/1151876021627066/"},
    {"state": "Nevada" , "party": "Nevada Transhumanist Party", "url": "https://www.facebook.com/groups/NevadaTranshumanistParty/"},
    {"state": "New York" , "party": "New York Transhumanist Party", "url": "https://www.facebook.com/groups/239575473381213/"},
    {"state": "Texas" , "party": "Transhumanist Party of Texas", "url": "https://www.facebook.com/TXTPSC/"},
    {"state": "Virginia" , "party": "Transhumanist Party of Virginia", "url": "https://www.facebook.com/thpva/"},
    {"state": "District of Columbia" , "party": "Washington, D.C. Transhumanist Party", "url": "https://www.meetup.com/DC-Transhumanist-Party-Meetup/"},
    {"state": "Washington" , "party": "Washington State Transhumanist Party", "url": "https://www.facebook.com/groups/2078467672258734/"},
]

json_file = File.open "CombinedGeoData.json"
data = JSON.load json_file

def add_present(data)
    data['features'].each{|n| 
     n['properties']['present'] = 0
    }
end

def add_ambassadors(data, ambasadors)
    data['features'].each{|n| 
        ambasadors.each{|j| 
        if j[:country] == n['properties']['name']
            n['properties']['present'] = 1
            n['properties']['ambasador'] = j[:ambasador]
        end
        }
    }
end

def add_state_data(data, state_parties)
    data['features'].each{ |n|
        state_parties.each{|j|
        if n['properties']['NAME'] == j[:state]
            n['properties']['present'] = 1
            n['properties']['party'] = j[:party]
            n['properties']['url'] = j[:url]
        end
        }
    }
end

add_present(data)
add_ambassadors(data, ambasadors)
add_state_data(data, state_parties)

File.write("CombinedGeoData.json", data.to_json)
