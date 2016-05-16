require 'sinatra/base'
require 'json'
require 'pry'
require 'csv'

class JsTest < Sinatra::Base
  get '/' do
    csv_text = File.read('public/data.tsv')
    csv = CSV.parse(csv_text, headers: true, col_sep: "\t")
    @points = csv.map { |row| [row['lat'].to_f, row['lon'].to_f] }
    speed_array = csv.collect { |x| x['speed'] }.map(&:to_f)
    altitude_array = csv.collect { |x| x['altitude'] }.map(&:to_f)
    @info_hash = {
      distance_travelled: '0.4',
      fastest_speed: speed_array.sort.reverse.first,
      average_speed: speed_array.reduce(0, :+) / speed_array.count,
      highest_point: altitude_array.sort.reverse.first,
      average_altitude: altitude_array.reduce(0, :+) / altitude_array.count,
      central_lat_lon: @points[@points.count / 2].map { |x| x.round(2) }.join('/')
    }
    erb :index
  end

  run! if __FILE__ == $0
end