# Start with basic string
sdf = 'Asdfas'

# Init array
array = []

# Loop over and append string to array n times
50.times { array << sdf }

# Join array as one string, split all chars, shuffle and then rejoin
sdf = array.join.split('').shuffle.join

# Split between lower and uppercase and insert space
sdf = sdf.gsub(/(?<=[a-z])(?=[A-Z])/, ' ').downcase

p sdf