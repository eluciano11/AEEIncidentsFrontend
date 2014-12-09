require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
	send_file File.expand_path('index.html', settings.public_folder)
end