class Shops < ActiveRecord::Base
  attr_accessible :addition, :issue, :latitude, :longitude, :name, :price, :tomorrow, :yesterday
end
