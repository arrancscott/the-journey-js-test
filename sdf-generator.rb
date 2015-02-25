require 'sinatra'
require 'sinatra/contrib'
require 'json'

class SdfGenerator < Sinatra::Base
	get '/' do
	  erb :index
	end

	post '/generate/:size', provides: :json do
		size = params[:size]
		case size
		when 'small'
			s = 75
		when 'medium'
			s = 125
		when 'large'
			s = 175
		else
			s = 50
		end
		array = []
		sdf = 'asdfas'.capitalize
		s.to_i.send(:times) { array << sdf }
		sdf = array.join.split('').shuffle.join
		sdf = sdf.gsub(/(?<=[a-z])(?=[A-Z])/, ' ').downcase.capitalize + '.'
		json sdf: sdf
	end

	# run! if __FILE__ == $0
end