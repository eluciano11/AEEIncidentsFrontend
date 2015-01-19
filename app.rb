#!/usr/bin/env ruby
require 'rubygems'
require 'twitter'
require 'sinatra'

set :server, 'webrick'

client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "09wWFRX6DUyUryLvy12aVtk6V"
  config.consumer_secret     = "mzz3saU3jsDtoDHSXrT1bfPvxYJUXE1ohnIxexP06kwQHVdChZ"
  config.access_token        = "2985098704-n9clVJIrEzmDkbAOkmOHc1ikqP4ZxJEWmfzxg5p"
  config.access_token_secret = "LLG5a4TsihY9kTY5gK3s5XWQMzH9bdnnDVlwzgjLgWQpz"
end

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
	send_file File.expand_path('index.html', settings.public_folder)
end

post '/queja' do
	client.update("Tienes averia en: " + params[:town] + ", " +	params[:area])
	redirect('/')
end