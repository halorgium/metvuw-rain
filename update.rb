#!/usr/bin/env ruby
#
require 'rubygems'
require 'hpricot'
require 'open-uri'
require 'json'

hash = {}
regions = %w( nz nzni nzsi )
regions.each do |r|
  h = Hpricot(open('http://metvuw.com/forecast/forecast1.php?type=rain&region=nzni&tim=06'))
  image = (h / 'table//img').last
  timestamp = image.attributes["src"].split('/')[1]
  hash[r] = timestamp
end

File.open(File.dirname(__FILE__) + '/public/timestamps.json', 'w') do |f|
  f.write hash.to_json
end
