class ShopController < ApplicationController
  respond_to :json

  def index
    render :json => Shops.all.to_json
  end

  def create
    shopName = Shops.find_or_create_by_name(params[:name])
    shopName.update_attributes!(params.slice(:yesterday, :issue, :tomorrow, :addition, :price))
    render :json => shopName
  end

end
