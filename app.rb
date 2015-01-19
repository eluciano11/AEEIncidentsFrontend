#!/usr/bin/env ruby
require 'rubygems'
require 'twitter'
require 'sinatra'

set :server, 'webrick'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "secert"
  config.consumer_secret     = "secert"
  config.access_token        = "secert"
  config.access_token_secret = "secert"
end

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
	send_file File.expand_path('index.html', settings.public_folder)
end

post '/queja' do
	client.update("Tienes averia en: " + params[:town] + ", " +	params[:area])
	redirect('/')
end
