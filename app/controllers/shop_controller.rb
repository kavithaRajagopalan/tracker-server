class ShopController < ApplicationController
  respond_to :json

  def index
    render :json => Shops.all.to_json
  end

end
